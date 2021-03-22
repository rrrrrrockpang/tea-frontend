const cloneFormValues = (formTemplate, editableFormTemplate) => {
    formTemplate.find('input[type]').each(function() {
        $(this).attr('value', $(this).val());
    })
}

const cloneFormTemplate = (id, variable, formTemplate, card) => {
    const editableTemplate = formTemplate.clone();

    editableTemplate.attr('id', `${id}_var_${varNameSet.size}`);
    editableTemplate.attr('class', 'editable_template');
    cloneFormValues(formTemplate, editableTemplate);
    handleNominalandOrdinal(`${id}_var_${varNameSet.size}`, editableTemplate);

    // This is why we dictionary. Instead looping to find the variable
    // we can just call
    // It's late today. So I'll just use a loop here
    let pos = 0;
    for(let i = 0; i < dependentVarLst.length; i++) {
        const temp = dependentVarLst[i];
        if(editableTemplate.find('.variable-name').text() === temp.name) {
            pos = i;
            break
        }
    }
    handleCancelBtn(editableTemplate.find('.return'), card);
    editableTemplate.find('.submit').text('Change').on("click", function() {
        let name = editableTemplate.find("input[type='text']").val();
        if(varNameSet.has(name) && name !== variable.name) {
            alert("Please choose a different name for your variable!");
            return;
        }

        let type = editableTemplate.find(".var-type input[type='radio']:checked").val();

        let categories = getCurrentCategories(editableTemplate.find('.add-category'));

        let isVariableSuccessfullySet = false;
        if(categories.length > 0) {
            isVariableSuccessfullySet = variable.setVar(type, name, categories);
        } else {
            isVariableSuccessfullySet = variable.setVar(type, name);
        }

        if(!isVariableSuccessfullySet) return;
        console.log(variable);

        card.popover('hide');
    });
    addCategoryBtn(editableTemplate.find('.add-category'));
    return editableTemplate;
}

const getCurrentCategories = (addenda) => {
    let categories = [];
    $(addenda).find('span .category-name').each(function() {
        if($(this).is(":visible")) categories.push($(this).text());
    })
    return categories;
}

const addCategoryBtn = (addenda) => {
    addenda.find("button").on("click", function(){
        // add categories
        let categories = getCurrentCategories(addenda);
        const text = addenda.find('input[type=text]').val();
        categories.push(text);
        console.log(categories);
        const card = addCategoryCard(text);

        card.find('.delete-category').on("click", function() {
            const category = $(this).parent().find('span').text();
            categories = categories.filter(function(value, index, arr){
                return value !== category;
            })
            $(this).parent().remove();
        });
        addenda.find('.input-category').val('');
        addenda.find('.categories').append(card);
    })
}

const handleNominalandOrdinal = (id, formTemplate) => {
    formTemplate.find(".var-type input[type='radio']").on("change", function () {
            let selected = $(`#${id} input[type='radio']:checked`);
            // let selected = $(this).find(":checked");
            let nominal_area = formTemplate.find(".nominal-category");
            let ordinal_area = formTemplate.find(".ordinal-category");

            // handle nominal
            if (selected.val() === "nominal") {
                if (ordinal_area.length !== 0) {
                    ordinal_area.hide();
                }

                if (nominal_area.length !== 0) {
                    nominal_area.show();
                } else {
                    let addenda = $(`
                        <div class="form-group add-category nominal-category">
                            <div class="container w-100">
                                <div class="row">
                                    <label for='name' class='col-form-label'>Categories:</label>
                                    
                                    <div class="form-inline">
                                        <input type='text' class='form-control input-category'>
                                        <button type="button" class="btn btn-success mb-2">Add</button>
                                    </div>
                                </div>
                                <div class="row categories"></div>
                            </div>
                        </div>
                    `);
                    addCategoryBtn(addenda);
                    addenda.insertAfter(formTemplate.find(".var-type"));
                }
            }

            if (selected.val() === "ordinal") {
                if (nominal_area.length !== 0) {
                    nominal_area.hide();
                }

                if (ordinal_area.length !== 0) {
                    ordinal_area.show();
                } else {
                    let addenda = $(`
                <div class="form-group add-category ordinal-category">
                    <label for='name' class='col-form-label'>Orders:</label>
                    
                    <div class="form-inline">
                        <input type='text' class='form-control input-category'>
                        <button type="button" class="btn btn-success mb-2">Add</button>
                    </div>
                    
                    <div class="row categories"></div>
                </div>
            `);
                    addCategoryBtn(addenda);
                    addenda.insertAfter(formTemplate.find(".var-type"));
                }
            }

            if (selected.val() === "interval" || selected.val() === "ratio") {
                nominal_area.hide();
                ordinal_area.hide();
            }
    })
};

const handleCancelBtn = (cancelBtn, popoverBtn) => {
    cancelBtn.on('click', function() {
        popoverBtn.popover('hide');
    });
}

const handleSubmitVariableBtn = (submitBtn, id, formTemplate, displayArea, popoverBtn) => {
        submitBtn.on('click', function() {
            let variable = new Variable();
            let name = formTemplate.find("input[type='text']").first().val();
            // TODO: Potential bug. categories is also type='text'
            if(varNameSet.has(name)) {
                alert("Please choose a different name for your variable!");
                return;
            }

            let type = formTemplate.find(".var-type input[type='radio']:checked").val();
            let categories = getCurrentCategories(formTemplate.find('.add-category'));
            let isVariableSuccessfullySet = false;
            if(categories.length > 0) {
               isVariableSuccessfullySet = variable.setVar(type, name, categories);
            } else {
               isVariableSuccessfullySet = variable.setVar(type, name);
            }

            if(!isVariableSuccessfullySet) {
                return;
            }
            let card = addCard(variable.getName());
            varNameSet.add(name);

            // add popover to the card
            const editableTemplate = cloneFormTemplate(id, variable, formTemplate, card)
            card.popover({
                html: true,
                sanitize: false,
                container: 'body',
                placement: 'top',
                title: " ",
                content: editableTemplate
            })

            if (id === DV_ID) {
                dependentVarLst.push(variable);
                card.find(".delete").on("click", function () {
                    let pos = 0;
                    for(let i = 0; i < dependentVarLst.length; i++) {
                        if($(this).parent().parent().find(".col-sm-10 p").text() === dependentVarLst[i].getName()) {
                            pos = i;
                            break
                        }
                    }
                    dependentVarLst.splice(pos, 1);
                    varNameSet.delete($(this).parent().parent().find(".col-sm-10 p").text());
                    dvListener.dv = dependentVarLst;
                    $(this).parent().parent().parent().parent().remove();
                });
                dvListener.dv = dependentVarLst;
                console.log(dependentVarLst);
            } else if (id === CONDITION_ID) {
                independentVarLst.push(variable);
                card.find(".delete").on("click", function () {
                    let pos = 0;
                    for(let i = 0; i < independentVarLst.length; i++) {
                        if($(this).parent().parent().find(".col-sm-10 p").text() === independentVarLst[i].getName()) {
                            pos = i;
                            break
                        }
                    }
                    varNameSet.delete($(this).parent().parent().find(".col-sm-10 p").text());
                    independentVarLst.splice(pos, 1);
                    ivListener.iv = independentVarLst;
                    $(this).parent().parent().parent().parent().remove();
                    console.log(independentVarLst);
                });
                ivListener.iv = independentVarLst;
            }
            displayArea.append(card);
            popoverBtn.popover("hide");
        });
}

const handleSubmitConstructBtn = (submitBtn, formTemplate, displayArea, popoverbtn) => {
    submitBtn.on("click", function (){
        let measureName = formTemplate.find("input[type='text'].measure").val();
        if(varNameSet.has(measureName)) {
            alert("Please choose a different name for your variable!");
            return;
        }

        let constructName = formTemplate.find("input[type='text'].construct").val();
        let measure = new Variable();
        measure.name = measureName;
        let construct = new Construct(constructName, measure);
        varNameSet.add(measure.name);
        let card = addCard(measure.getName());

        constructLst.push(construct);
        card.find(".delete").on("click", function () {
            $(this).parent().parent().parent().parent().remove();
            let pos = 0;
            for(let i = 0; i < constructLst.length; i++) {
                if($(this).parent().parent().find(".col-sm-10 p").text() === constructLst[i].name) {
                    pos = i;
                    break
                }
            }
            constructLst.splice(pos, 1);
            constructListener.c = constructLst;
        })
        displayArea.append(card);
        constructListener.c = constructLst;
        popoverbtn.popover("hide");
    })
}

const createForm = (id, popoverbtn, displayArea, type="") => {
    let formtemplate = null;

    if(id === HYPOTHESIS_ID) {
        formtemplate = $(`<form class='extension_popover_form' id='${id + "_form"}'>
                <div class="form-group">
                    <label for='name' class='col-form-label'>Construct:
                    <input type='text' class='form-control construct' id='${id + "_construct"}' >
                    </label>
                </div>

                <div class="form-group">
                    <label for='name' class='col-form-label'>Measure:
                    <input type='text' class='form-control measure' id='${id + "_measure"}'>
                    </label>
                </div>
            </form>`);

        let cancelBtn = $("<button type='button' class='btn btn-secondary'>Close</button>");
        let submitBtn = $("<button type='button' class='btn btn-success'>Add</button>");
        formtemplate.append(cancelBtn, submitBtn);
        formtemplate.append(cancelBtn, submitBtn);
        handleCancelBtn(cancelBtn, popoverbtn);
        handleSubmitConstructBtn(submitBtn, formtemplate, displayArea, popoverbtn);

    } else if(id === DV_ID || id === CONDITION_ID) {
        displayArea.find(".row.h-80")
        formtemplate = $(`<form class='extension_popover_form' id='${id + "_form"}'>
                <div class="form-group">
                    <label for='name' class='col-form-label'>Variable Name:
                    <input type='text' class='form-control variable-name ${id + "_name"}'>
                    </label>
                </div>

                <div class='form-group var-type'>
                    <label class="radio control-label">Variable Type:</label>

                    <div class="form-inline type-radio">
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

        if(id === CONDITION_ID) {
            formtemplate.find(".form-inline.type-radio").prepend($(`
                <label class='form-check-label' for='nominalRadio'>
                    <input class='form-check-input' type='radio' name='variableTypeRadios' value='nominal'>
                    Nominal
                </label>
            `))
        }
        handleNominalandOrdinal(id + '_form', formtemplate);

        let cancelBtn = $("<button type='button' class='btn btn-secondary return'>Close</button>");
        let submitBtn = $("<button type='button' class='btn btn-success submit'>Add</button>");
        formtemplate.append(cancelBtn, submitBtn);
        handleCancelBtn(cancelBtn, popoverbtn);
        handleSubmitVariableBtn(submitBtn, id, formtemplate, displayArea, popoverbtn);
    } else if(id === ANALYSIS_ID) {
        let hypothesisSentence;
        let apiBtn = $("<button type='button' class='btn btn-success submit'>Add</button>");

        if(type === "nominal") {
             hypothesisSentence = $(`
                <form class='extension_popover_form' id='${id + "_form"}'>
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Hypothesis:
                        <div class="form-inline">
                            <label>The mean value of</label>
                            <label class="dv-in-form"></label>
                            <label>in</label>
                            <select class="iv-group-custom-select-1">
<!--                                <option value="CI" selected>CI</option>-->
<!--                                <option value="PI">PI</option>-->
                            </select>
                            <label>group will be</label>
                            <select class="custom-select two-side">
                                <option value="greater" selected>greater than</option>
                                <option value="less">less than</option>
                                <option value="different">different from</option>
                                <option value="same">same as</option>
                            </select>
                            <label>that in</label>
                            <select class="iv-group-custom-select-2">
<!--                                <option value="CI" selected>CI</option>-->
<!--                                <option value="PI">PI</option>-->
                            </select>
                        </div>
                    </div>
                </form>
            `);
        } else {
            hypothesisSentence = $(`
                <form class='extension_popover_form' id='${id + "_form"}'>
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Hypothesis:
                        <div class="form-inline" style="display: inline-block;">
                            <label>The greater value of</label>
                            <label class="iv-in-form mr-sm-2"></label>
                            <label>will lead to</label>
                            <select class="custom-select positive-negative">
                                <option value="greater" selected>greater</option>
                                <option value="less">less</option>
                                <option value="different">different</option>
                                <option value="same">the same</option>
                            </select>
                            <label class="dv-in-form mr-sm-2"></label>
                        </div>
                    </div>
                </form>
            `)
        }
        apiBtn.on("click", function() {
            const condition_type = analysisCondition.type; // TODO: transform analysisCondition and analysisDV to Variable
            let relationship;
            if(condition_type === 'Nominal') {
                let two_side = false;
                const selected = hypothesisSentence.find('.two-side:selected').val();
                if(selected === 'different') {
                    two_side = true;
                }

                // categories
                let cat1 = hypothesisSentence.find('.iv-group-custom-select-1:selected').val();
                let cat2 = hypothesisSentence.find('.iv-group-custom-select-2:selected').val();
                if(selected === 'less') {
                    let temp = cat2;
                    cat2 = cat1;
                    cat1 = temp;
                }

                relationship = {
                    'condition_type': 'nominal',
                    'two-side': two_side,
                    'categories': [cat1, cat2]
                }
            } else {
                let positive = false;
                let posNeg = hypothesisSentence.find('.positive-negative:selected').val();
                if(posNeg === "greater") positive = true;

                relationship = {
                    'condition_type': condition_type,
                    'positive': positive
                }
            }
            teaAPI(analysisCondition, analysisDV, relationship);
            popoverbtn.popover('hide');
        })
        hypothesisSentence.append(apiBtn);
        return hypothesisSentence;
    }

    return formtemplate;
}

