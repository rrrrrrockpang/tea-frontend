const CONDITION_ID = "condition";
const CONDITION_PLUGIN_ID = CONDITION_ID + "_preregistea";
const CONDITION_BTN_ID = CONDITION_ID + "_initial_btn";
const CONDITION_TEXTAREA_NODE = $("[name='text3']");
const CONDITION_PARENT_SECTION = CONDITION_TEXTAREA_NODE.parent().parent().parent();

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
});

/////////// Layout Code ///////////

const addConditionPreregistea = () => {
    const preregistea = createPreregisteaForm(CONDITION_PLUGIN_ID);
    const inputArea = preregistea.find(".inputarea");
    addConditionInput(inputArea);
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

        updateConditions(null, nameInput.val(), typeInput.val(), getCurrentCategories(categoriesInput), studyDesignInput.val());

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
    return $(`<form class="inputarea-form">
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Variable Name:
                        <input type='text' class='form-control variable-name'>
                        </label>
                    </div>
                    
                    <div class="form-group study-design">
                        <label class="radio control-label">Study Design:</label>
                        <label class='form-check-label' for='withinSubject'>
                                <input class='form-check-input' type='radio' name='studyDesignRadio' value='within'>
                                Within-Subject
                        </label>
                        <label class='form-check-label' for='betweenSubject'>
                            <input class='form-check-input' type='radio' name='studyDesignRadio' value='between'>
                            Between-Subject
                        </label>
                    </div>
    
                    <div class='form-group var-type'>
                        <label class="radio control-label">Variable Type:</label>
    
                        <div class="form-inline type-radio">
                        
                            <label class='form-check-label' for='nominalRadio'>
                                <input class='form-check-input' type='radio' name='variableTypeRadios' value='nominal'>
                                Nominal
                            </label>
                            <label class='form-check-label' for='ordinalRadio'>
                                <input class='form-check-input' type='radio' name='variableTypeRadios' value='ordinal'>
                                Ordinal
                            </label>
                            <label class='form-check-label' for='intervalRadio'>
                                <input class='form-check-input' type='radio' name='variableTypeRadios' value='interval'>
                                Interval
                            </label>
                            <label class='form-check-label' for='ratioRadio'>
                                <input class='form-check-input' type='radio' name='variableTypeRadios' value='ratio'>
                                Ratio
                            </label>
                        </div>
                    </div>
                </form>`);
}

const createConditionCard = (variable) => {
    let card = $(`
        <div class="uml-card" id="${variable.name}" style="width: 200px; height: 150px; position: relative">
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