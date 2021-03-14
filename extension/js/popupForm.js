const cloneFormTemplate = (id, variable, formTemplate, card) => {
    const editableTemplate = formTemplate.clone();

    editableTemplate.attr('id', `${id}_var_${varNameSet.size}`);
    editableTemplate.attr('class', 'editable_template');
    handleNominalandOrdinal(editableTemplate.attr('id'), editableTemplate);
    // This is why we dictionary. Instead looping to find the variable
    // we can just call
    // It's late today. So I'll just use a loop here
    let pos = 0;
    for(let i = 0; i < dependentVarLst.length; i++) {
        const temp = dependentVarLst[i];
        if(editableTemplate.find('#dv_name').text() === temp.name) {
            pos = i;
            break
        }
    }
    editableTemplate.find('.btn-secondary').on("click", function(){
        card.popover('hide');
    })
    editableTemplate.find('.btn-success').text('Change').on("click", function() {
        let name = editableTemplate.find("input[type='text']").val();
        if(varNameSet.has(name) && name !== variable.name) {
            alert("Please choose a different name for your variable!");
            return;
        }
        card.popover('hide');
        // change the variable in the Study.js
        // TODO: finish this tomorrow
        // let type = editableTemplate.find(".var-type input[type='radio']:checked").val();
        // if(localCategories.length > 0) {
        //        variable.setVar(type, name, localCategories);
        //        localCategories = [];
        // } else {
        //    variable.setVar(type, name);
        // }
    })
    return editableTemplate;
}

const addCategoryBtn = (addenda) => {
    addenda.find("button").on("click", function(){
        // add categories
        const text = addenda.find('input[type=text]').val();
        localCategories.push(text);
        addenda.find('.categories').append(addCategoryCard(text));
    })
}

const handleNominalandOrdinal = (id, formTemplate) => {
    formTemplate.find(".var-type input[type='radio']").on("change", function () {
            let selected = $(`#${id} input[type='radio']:checked`);
            // let selected = $(this).find(":checked");
            let nominal_area = formTemplate.find("#nominal-category");
            let ordinal_area = formTemplate.find("#ordinal-category");

            // handle nominal
            if (selected.val() === "nominal") {
                if (ordinal_area.length !== 0) {
                    ordinal_area.hide();
                }

                if (nominal_area.length !== 0) {
                    nominal_area.show();
                } else {
                    let addenda = $(`
                        <div class="form-group add-category" id="nominal-category">
                            <div class="container w-100">
                                <div class="row">
                                    <label for='name' class='col-form-label'>Categories:</label>
                                    
                                    <div class="form-inline">
                                        <input type='text' class='form-control'>
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
                <div class="form-group add-category" id="ordinal-category">
                    <label for='name' class='col-form-label'>Orders:</label>
                    
                    <div class="form-inline">
                        <input type='text' class='form-control'>
                        <button type="submit" class="btn btn-success mb-2">Add</button>
                    </div>
                </div>
            `);
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
            let name = formTemplate.find("input[type='text']").val();
            // TODO: Potential bug. categories is also type='text'
            if(varNameSet.has(name)) {
                alert("Please choose a different name for your variable!");
                return;
            }


            let type = formTemplate.find(".var-type input[type='radio']:checked").val();
            if(localCategories.length > 0) {
               variable.setVar(type, name, localCategories);
               localCategories = [];
            } else {
               variable.setVar(type, name);
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
        handleCancelBtn(cancelBtn, popoverbtn);
        handleSubmitConstructBtn(submitBtn, formtemplate, displayArea, popoverbtn);

    } else if(id === DV_ID || id === CONDITION_ID) {
        displayArea.find(".row.h-80")
        formtemplate = $(`<form class='extension_popover_form' id='${id + "_form"}'>
                <div class="form-group">
                    <label for='name' class='col-form-label'>Variable Name:
                    <input type='text' class='form-control' id='${id + "_name"}'>
                    </label>
                </div>

                <div class='form-group var-type'>
                    <label class="radio control-label">Variable Type:</label>

                    <div class="form-inline">
                        <label class='form-check-label' for='nominalRadio'>
                            <input class='form-check-input' type='radio' name='variableTypeRadios' id='nominalRadio' value='nominal'>
                            Nominal
                        </label>
                        <label class='form-check-label' for='ordinalRadio'>
                            <input class='form-check-input' type='radio' name='variableTypeRadios' id='ordinalRadio' value='ordinal'>
                            Ordinal
                        </label>
                        <label class='form-check-label' for='intervalRadio'>
                            <input class='form-check-input' type='radio' name='variableTypeRadios' id='intervalRadio' value='interval'>
                            Interval
                        </label>
                        <label class='form-check-label' for='ratioRadio'>
                            <input class='form-check-input' type='radio' name='variableTypeRadios' id='ratioRadio' value='ratio'>
                            Ratio
                        </label>
                    </div>
                </div>
            </form>`);
        handleNominalandOrdinal(id + '_form', formtemplate);

        let cancelBtn = $("<button type='button' class='btn btn-secondary'>Close</button>");
        let submitBtn = $("<button type='button' class='btn btn-success'>Add</button>");
        formtemplate.append(cancelBtn, submitBtn);
        handleCancelBtn(cancelBtn, popoverbtn);
        handleSubmitVariableBtn(submitBtn, id, formtemplate, displayArea, popoverbtn);
    } else if(id === ANALYSIS_ID) {
        if(type === "nominal") {
            return $(`
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
                            <select class="custom-select">
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
            return $(`
                <form class='extension_popover_form' id='${id + "_form"}'>
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Hypothesis:
                        <div class="form-inline" style="display: inline-block;">
                            <label>The greater value of</label>
                            <label class="iv-in-form mr-sm-2"></label>
                            <label>will lead to</label>
                            <select class="custom-select my-1 mr-sm-2">
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
    }

    return formtemplate;
}

