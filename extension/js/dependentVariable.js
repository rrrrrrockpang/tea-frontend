const DEPENDENT_VARIABLE_ID = "dv";
const DEPENDENT_VARIABLE_PLUGIN_ID = DEPENDENT_VARIABLE_ID + "_preregistea";
const DEPENDENT_VARIABLE_BTN_ID = DEPENDENT_VARIABLE_ID + "_initial_btn";
const DEPENDENT_VARIABLE_TEXTAREA_NODE = $("[name='text2']");
const DEPENDENT_VARIABLE_PARENT_SECTION = DEPENDENT_VARIABLE_TEXTAREA_NODE.parent().parent().parent();

const DEPENDENT_VARIABLE_DESCRIPTION =
    "Define Dependent Variable(s). Specify the type of the dependent variables you plan to measure. They might be a measure of the concept you defined in the previous step."

dvListener = {
    dvInternal: dependent_variables,
    dvListener: function (val) {},
    set dv(val) {
        this.dvInternal = val;
        this.dvListener(val);
    },
    get dv() {
        return this.dvInternal;
    },
    registerListener: function (listener) {
        this.dvListener = listener;
    }
}

dvListener.registerListener(function (dvs) {
    updateDependentVariableDisplayArea(dvs);
    updateVariableInAnalysis($(`#${ANALYSIS_PLUGIN_ID} .displayarea .hypothesis-dv`), dvs); // TODO: !!!
    updateTeaCodeVariables();
    updateMethodSection();

    if(variableMap.length === 0) {
        $("#analysis_preregistea").hide();
    } else {
        $("#analysis_preregistea").show();
    }
});

/////////// Layout Code ///////////

const addDependentVariablePreregistea = () => {
    const preregistea = createPreregisteaForm(DEPENDENT_VARIABLE_PLUGIN_ID, DEPENDENT_VARIABLE_DESCRIPTION);
    const inputArea = preregistea.find(".inputarea");
    addDependentVariableInput(inputArea);
    preregistea.append(addArrow());
    DEPENDENT_VARIABLE_PARENT_SECTION.prepend(preregistea);
}

const addDependentVariableInput = (inputArea) => {
    const inputForm = createDependentVariableForm();
    handleCategoricalVariableInputForm(inputForm);
    const inputBtn = createDependentVariableBtn(inputForm);
    inputArea.append([inputForm, inputBtn]);
}

const createDependentVariableBtn = (inputForm) => {
    const initialBtn = createInitialButton(DEPENDENT_VARIABLE_BTN_ID, "Add Variable");
    initialBtn.on("click", function() {
        const nameInput = inputForm.find(".variable-name");
        const typeInput = inputForm.find(".var-type input[type='radio']:checked");
        const categoriesInput = inputForm.find(".add-category .categories");
        const construct = constructObject; // TODO: Add this

        const name = nameInput.val();
        const type = typeInput.val();
        const categories = getCurrentCategories(categoriesInput);
        if(construct === null && constructs.length !== 0) {
            if(!confirm(CONSTRUCT_DEPENDENT_VARIABLE_ALERT)) return
        }

        if(name.length === 0) {
            alert(DEPENDENT_VARIABLE_NAME_ALERT);
            return
        }

        if(typeInput.length === 0) {
            alert(DEPENDENT_VARIABLE_TYPE_ALERT)
            return
        }

        if(type === "nominal" || type === "ordinal") {
            if(categories.length < 2) {
                alert(CATEGORIES_FOR_NOMINAL_ORDINAL_ALERT);
                return
            }
        }

        updateDependentVariables(null, name, type, categories, construct);
        updateDependentVariableTextArea();

        console.log(dependent_variables);
        nameInput.val("");
        typeInput.prop("checked", false);
        categoriesInput.empty();
        categoriesInput.parent().parent().hide();
    })
    return initialBtn;
}

/// Update DVS

const updateDependentVariables = (variableObject, name, type, categories, construct = null) => {
    if(variableObject === null) {
        variableObject = new Variable(name, type, categories);
        variableObject.construct = construct;
        variableObject.card_id = DEPENDENT_VARIABLE_ID + "_" + variableObject.name;
        variableObject.section = DEPENDENT_VARIABLE_ID;
    } else {
        variableObject.set(name, type, categories);
        variableObject.construct = construct;
    }

    variableMap[variableObject.card_id] = variableObject;
    dependent_variables.push(variableObject);
    if(!variableObject.isEditing) dvListener.dv = dependent_variables;
}

const updateDependentVariableTextArea = () => {
    DEPENDENT_VARIABLE_TEXTAREA_NODE.val("");

    if(dependent_variables.length > 0) {
        let newText = "";

        newText += `There will be ${dependent_variables.length} key dependent variables: `
        for(let i = 0; i < dependent_variables.length; i++) {
            if(i === dependent_variables.length - 1) {
                newText += `${i+1}) ${dependent_variables[i].display_name}: \n `
            } else {
                newText += `${i+1}) ${dependent_variables[i].display_name}, `
            }
        }

        for(let i = 0; i < dependent_variables.length; i++) {
            newText += `${i+1}. ${capitalize(dependent_variables[i].display_name)}. `;
            if(dependent_variables[i].construct !== null) {
                newText += `${dependent_variables[i].display_name} is used to measure ${dependent_variables[i].construct.display_name}. `
            }
            newText += "Please add a little description of this variable.";
        }

        DEPENDENT_VARIABLE_TEXTAREA_NODE.val(newText);
    }

}

const updateDependentVariableDisplayArea = (dvs) => {
    const display = $(`#${DEPENDENT_VARIABLE_PLUGIN_ID} .displayarea`);
    let cards = [];
    for(let i = 0; i < dvs.length; i++) {
        const variableObject = dvs[i];
        const variableCard = createVariableCard(variableObject);
        variableCard.find(".delete").on("click", function () {
            deleteVariable(variableCard.attr("id"));
            variableCard.remove();
        })
        cards.push(variableCard);
    }
    display.html(cards);
}

const deleteVariable = (card_id) => {
    delete variableMap[card_id];

    let pos = 0;
    for(let i = 0; i < dependent_variables.length; i++) {
        if(card_id === dependent_variables[i].card_id) {
            pos = i;
            break;
        }
    }

    console.log(dependent_variables);
    console.log(pos);
    dependent_variables.splice(pos, 1);
    dvListener.dv = dependent_variables;
}


/// A bunch of forms
const createDependentVariableForm = () => {
    return $(`<form class="inputarea-form">
                    <div>
                        <div class="form-group construct-group" style="display: none"> 
                              <h4 class="radio control-label construct-label">Construct:</h4>
                              <div class="construct-card" style="display: flex;"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <h4 for='variable-name' class='col-form-label'>Variable Name:</h4>
                        <input type='text' class='form-control variable-name' required>
                    </div>
    
                    <div class='form-group var-type'>
                        <h4 class="radio control-label">Variable Type:</h4>
    
                        <div class="form-inline type-radio">
                        
                            <label class='form-check-label' for='nominalRadio'>
                                <input class='form-check-input' type='radio' id="nominalRadio" name='variableTypeRadios' value='nominal'>
                                Nominal
                            </label>
                            <label class='form-check-label' for='ordinalRadio'>
                                <input class='form-check-input' type='radio' id="ordinalRadio" name='variableTypeRadios' value='ordinal'>
                                Ordinal
                            </label>
                            <label class='form-check-label' for='intervalRadio'>
                                <input class='form-check-input' type='radio' id="intervalRadio" name='variableTypeRadios' value='interval'>
                                Interval
                            </label>
                            <label class='form-check-label' for='ratioRadio'>
                                <input class='form-check-input' type='radio' id="ratioRadio" name='variableTypeRadios' value='ratio'>
                                Ratio
                            </label>
                        </div>
                    </div>
                </form>`);
}

const createVariableCard = (variable) => {
    let card = $(`
        <div class="uml-card" id="${variable.card_id}" style="width: 200px; height: 150px; position: relative">
            <div class="form-group mb-1" style="border-bottom: 1px solid #0f0f0f; text-align: center">
                <label class="card-header-name"></label>
            </div>
        </div>
    `);

    card.find(".card-header-name").append(`<p>${variable.display_name}</p>`);
    card.append(addCardDetail("Variable Type: ", variable.type));
    if(variable.categories.length > 0) card.append(addCardDetail("Categories: ", variable.categories));
    if(variable.construct != null) card.append(addCardDetail("Construct: ", variable.construct.display_name));

    const cancel = $(`<button type='button' class='delete close' data-dismiss='alert' aria-label='Close' style="position: absolute; top: 0; right: 0">×</button>`)
    card.append(cancel)
    return card;
}