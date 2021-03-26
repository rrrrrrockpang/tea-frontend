const CONDITION_ID = "condition";
const CONDITION_PLUGIN_ID = CONDITION_ID + "_preregistea";
const CONDITION_BTN_ID = CONDITION_ID + "_initial_btn";
const CONDITION_TEXTAREA_NODE = $("[name='text3']");
const CONDITION_PARENT_SECTION = CONDITION_TEXTAREA_NODE.parent().parent().parent();
const CONDITION_DESCRIPTION =
    "Define Independent Variable(s). Specify the type of the independent variables you plan to measure. If the type is nominal, the variable will have different conditions (factors). Be sure to specify how you are measure the each condition of the independent variable. (within-in subject or between-subject)\n"

ivListener = {
    ivInternal: conditions,
    ivListener: function (val) {},
    set iv(val) {
        this.ivInternal = val;
        this.ivListener(val);
    },
    get iv() {
        return this.ivInternal;
    },
    registerListener: function (listener) {
        this.ivListener = listener;
    }
}

ivListener.registerListener(function (conditions) {
    updateConditionDisplayArea(conditions);
    updateVariableInAnalysis($(`#${ANALYSIS_PLUGIN_ID} .displayarea .hypothesis-iv`), conditions);
    updateTeaCodeVariables();
    updateMethodSection();

    if(variableMap.length === 0) {
        $("#analysis_preregistea").hide();
    } else {
        $("#analysis_preregistea").show();
    }
});

/////////// Layout Code ///////////

const addConditionPreregistea = () => {
    const preregistea = createPreregisteaForm(CONDITION_PLUGIN_ID, CONDITION_DESCRIPTION);
    const inputArea = preregistea.find(".inputarea");
    addConditionInput(inputArea);
    preregistea.append(addArrow());
    CONDITION_PARENT_SECTION.prepend(preregistea);
}

const addConditionInput = (inputArea) => {
    const inputForm = createConditionForm();
    handleCategoricalVariableInputForm(inputForm);
    const inputBtn = createConditionBtn(inputForm);
    inputArea.append([inputForm, inputBtn]);
}

const createConditionBtn = (inputForm) => {
    const initialBtn = createInitialButton(CONDITION_BTN_ID, "Add Variable");
    initialBtn.on("click", function() {
        const nameInput = inputForm.find(".variable-name");
        const typeInput = inputForm.find(".var-type input[type='radio']:checked");
        const categoriesInput = inputForm.find(".add-category .categories");
        const studyDesignInput = inputForm.find(".study-design input[type='radio']:checked");

        const name = nameInput.val();
        const type = typeInput.val();
        const categories = getCurrentCategories(categoriesInput);
        const studyDesign = studyDesignInput.val();

        if(name.length === 0) {
            alert(INDEPENDENT_VARIABLE_NAME_ALERT);
            return
        }

        if(studyDesignInput.length === 0) {
            alert(INDEPENDENT_VARIABLE_STUDY_DESIGN_ALERT);
            return
        }

        if(typeInput.length === 0) {
            alert(INDEPENDENT_VARIABLE_TYPE_ALERT)
            return
        }

        if(type === "nominal" || type === "ordinal") {
            if(categories.length < 2) {
                alert(CATEGORIES_FOR_NOMINAL_ORDINAL_ALERT);
                return
            }
        }

        updateConditions(null, name, type, categories, studyDesign);
        updateConditionTextArea();

        nameInput.val("");
        typeInput.prop("checked", false);
        categoriesInput.empty();
        categoriesInput.parent().parent().hide();
        studyDesignInput.prop("checked", false);
    });
    return initialBtn;
}


const updateConditions = (variableObject, name, type, categories, studyDesign) => {
    if(variableObject === null) {
        // Add new variable
        variableObject = new Variable(name, type, categories);
        variableObject.study_design = studyDesign;
        variableObject.card_id = CONDITION_ID + "_" + variableObject.name;
        variableObject.section = CONDITION_ID;
    } else {
        variableObject.set(name, type, categories);
        variableObject.study_design = studyDesign;
    }

    variableMap[variableObject.card_id] = variableObject;
    conditions.push(variableObject);
    if(!variableObject.isEditing) ivListener.iv = conditions;
}

const updateConditionTextArea = () => {
    CONDITION_TEXTAREA_NODE.val("");
    if(conditions.length > 0) {
        let within = false, between = false;
        for(let i = 0; i < conditions.length; i++) {
            const condition = conditions[i];
            if(condition.study_design === "within") within = true;
            if(condition.study_design === "between") between = true;
        }

        let studyDesign, newText;
        if(within && between) {
            studyDesign = "mixed factorial design";
        } else if(within) {
            studyDesign = "within-subjects design";
        } else if(between) {
            studyDesign = "between-subjects design";
        }

        newText = `This experiment will be a ${studyDesign}. It comprises of the following factors and levels: \n`;

        for(let i = 0; i < conditions.length; i++) {
            const condition = conditions[i];
            if(condition.type === "nominal" || condition.type === "ordinal") {
                newText += `${i+1}. ${capitalize(condition.display_name)} (`;
                for(let j = 0; j < condition.categories.length; j++) {
                    if(j === condition.categories.length - 1) {
                        newText += condition.categories[j] + ") "
                    } else {
                        newText += condition.categories[j] + ", "
                    }
                }
                newText += "Please add a little description of this variable."
            }
        }

        CONDITION_TEXTAREA_NODE.val(newText);
    }
}

const updateConditionDisplayArea = (conditions) => {
    const display = $(`#${CONDITION_PLUGIN_ID} .displayarea`);
    let cards = [];
    for(let i = 0; i < conditions.length; i++) {
        const variableObject = conditions[i];
        const variableCard = createConditionCard(variableObject);

        variableCard.find(".delete").on("click", function() {
            deleteCondition(variableCard.attr("id"));
            variableCard.remove();
        });
        cards.push(variableCard);
    }
    display.html(cards);
}

const deleteCondition = (card_id) => {
    delete variableMap[card_id];

    let pos = 0;
    for(let i = 0; i < conditions.length; i++) {
        if(card_id === conditions[i].card_id) {
            pos = i;
            break;
        }
    }
    conditions.splice(pos, 1);
    ivListener.iv = conditions;
}


// A bunch of forms
const createConditionForm = () => {
    return $(`<form class="inputarea-form" id="${CONDITION_ID + "_form"}">
                    <div class="form-group">
                        <h4 for='name' class='col-form-label'>What's the exact independent variable name?</h4>
                        <input type='text' class='form-control variable-name'>
                    </div>
    
                    <div class='form-group var-type'>
                        <h4 class="radio control-label">Variable Type:</h4>
    
                        <div class="form-inline type-radio">
                            <label class='form-check-label' for='nominalRadio'>
                                <input class='form-check-input' type='radio' id="nominalRadio" name='variableTypeRadios' value='nominal'>
                                Nominal <span class='glyphicon glyphicon-info-sign' data-toggle="tooltip" data-placement="top" title="Nominal data has discrete categories. (e.g. gender or race)"></span>
                            </label> 
                            <label class='form-check-label' for='ordinalRadio'>
                                <input class='form-check-input' type='radio' id="ordinalRadio" name='variableTypeRadios' value='ordinal'>
                                Ordinal <span class="glyphicon glyphicon-info-sign" data-toggle="tooltip" data-placement="top" title="Ordinal data has an order but no specific meaning to the values. (e.g. responses in a Likert scale, strongly disagree to strongly agree)"></span>
                            </label>
                        </div>
                        <div class="form-inline type-radio">
                            <label class='form-check-label' for='intervalRadio'>
                                <input class='form-check-input' type='radio' id="intervalRadio" name='variableTypeRadios' value='interval'>
                                Interval <span class="glyphicon glyphicon-info-sign" data-toggle="tooltip" data-placement="top" title="Interval data has an order and the value is meaningful. (e.g. time or number of tasks)" ></span>
                            </label>
                            <label class='form-check-label' for='ratioRadio'>
                                <input class='form-check-input' type='radio' id="ratioRadio" name='variableTypeRadios' value='ratio'>
                                Ratio <span class="glyphicon glyphicon-info-sign" data-toggle="tooltip" data-placement="top" title="Ratio data is similar to interval data but can't fall below 0. (e.g. error rate or response rate)"></span>
                            </label>
                        </div>
                    </div>
                </form>`);
}

const createConditionCard = (variable) => {
    let card = $(`
        <div class="uml-card" id="${variable.card_id}" style="width: 200px; height: 150px; position: relative">
            <div class="form-group mb-1" style="border-bottom: 1px solid #0f0f0f; text-align: center">
                <label class="card-header-name"></label>
            </div>
        </div>
    `);

    card.find(".card-header-name").append(`<p>${variable.display_name}</p>`);
    card.append(addCardDetail("Variable Type: ", variable.type));
    card.append(addCardDetail("Study Design: ", variable.study_design));
    if(variable.categories.length > 0) card.append(addCardDetail("Categories: ", variable.categories));

    const cancel = $(`<button type='button' class='delete close' data-dismiss='alert' aria-label='Close' style="position: absolute; top: 0; right: 0">×</button>`)
    card.append(cancel)
    return card;
}