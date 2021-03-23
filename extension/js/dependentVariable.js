const DEPENDENT_VARIABLE_ID = "dv";
const DEPENDENT_VARIABLE_PLUGIN_ID = DEPENDENT_VARIABLE_ID + "_preregistea";
const DEPENDENT_VARIABLE_BTN_ID = DEPENDENT_VARIABLE_ID + "_initial_btn";
const DEPENDENT_VARIABLE_TEXTAREA_NODE = $("[name='text2']");
const DEPENDENT_VARIABLE_PARENT_SECTION = DEPENDENT_VARIABLE_TEXTAREA_NODE.parent().parent().parent();

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
});

/////////// Layout Code ///////////

const addDependentVariablePreregistea = () => {
    const preregistea = createPreregisteaForm(DEPENDENT_VARIABLE_PLUGIN_ID);
    const inputArea = preregistea.find(".inputarea");
    addDependentVariableInput(inputArea);
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
        // const construct = selectedConstruct; // TODO: Add this
        console.log(nameInput.val(), typeInput.val(), getCurrentCategories(categoriesInput));

        updateDependentVariables(null, nameInput.val(), typeInput.val(), getCurrentCategories(categoriesInput));

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

const updateDependentVariableDisplayArea = (dvs) => {
    const display = $(`#${DEPENDENT_VARIABLE_PLUGIN_ID} .displayarea`);
    let cards = [];
    console.log()
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
    dependent_variables.splice(pos, 1);
    dvListener.dv = dependent_variables;
}


/// A bunch of forms
const createDependentVariableForm = () => {
    return $(`<form class="inputarea-form">
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Variable Name:
                        <input type='text' class='form-control variable-name'>
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
                              
                    <div>
                        <div class="form-group construct-group"> 
                              <label class="radio control-label construct-label">Construct:</label>
                              <div class="construct-card"></div>
                        </div>
                    </div>
                </form>`);
}

const createVariableCard = (variable) => {
    let card = $(`
        <div class="uml-card" id="${variable.name}" style="width: 200px; height: 150px; position: relative">
            <div class="form-group mb-1" style="border-bottom: 1px solid #0f0f0f; text-align: center">
                <label class="card-header-name"></label>
            </div>
        </div>
    `);

    card.find(".card-header-name").append(`<p>${variable.display_name}</p>`);
    card.append(addCardDetail("Variable Type: ", variable.type));
    if(variable.categories.length > 0) card.append(addCardDetail("Categories: ", variable.categories));
    if(variable.construct != null) card.append(addCardDetail("Construct: ", variable.construct));

    const cancel = $(`<button type='button' class='delete close' data-dismiss='alert' aria-label='Close' style="position: absolute; top: 0; right: 0">×</button>`)
    card.append(cancel)
    return card;
}