const handlePopover = function(button) {
    const id = button.attr('id');
    console.log(id);
    button.popover(POPOVER_EFFECT);
    // Add Variable
    if (id === "addDependent") {
        console.log("I found dependent")
    }
    // Cancel button
    $(document).on('click', '#popover-close', function(){
        button.popover('hide');
    });

    $(document).on('click', '#variableBtn', function() {
        let variable = new Variable();

        let name = $(".popover-content").find('#variable-name').val();
        console.log(name);
        let type = $(".popover-content").find("#variable-form input[type='radio']:checked").val();
        variable.setVar(type, name);
        if(id === 'addDependent') { //TODO: Change to formal FINAL variable
            dependentVarLst.push(variable.toJSON());
            console.log(dependentVarLst);
        } else if (id === "addIndependent") {
            independentVarLst.push(variable.toJSON());
            console.log(independentVarLst);
        }

        let selector = "#dependentText";
        $(selector).append(variable.toString());
        button.popover('hide');
    });
}

const handleDependentVariableGrid = function() {
    createEditableDiv(dependentVariableSectionNode);
    const DVBtn = createButton("addDependent", "Add a DV");
    const DVDisplay = createTextDisplay("dependentText", "Tea");
    const teaSection = createTeaDiv("dependent_variable_div", [DVBtn, DVDisplay]);
    dependentVariableSectionNode.parent().append(teaSection);
    dependentVariableSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Formal Text</div>");
    adjustHeight(dependentVariableSectionNode.parent());
    handlePopover(DVBtn);
}

const handleIndependentVariableGrid = () => {
    independentVariableSectionNode.attr("class", "col-sm-4");
    const IVBtn = createButton("addIndependent", "Add a IV");
    const IVDisplay = createTextDisplay("independentText", "Tea");
    const teaSection = createTeaDiv("dependent_variable_div", [IVBtn, IVDisplay]);
    independentVariableSectionNode.parent().append(teaSection);
    independentVariableSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Formal Text</div>");
    adjustHeight(independentVariableSectionNode.parent());
    IVBtn.popover(POPOVER_EFFECT);
}

const handleAnalysisGrid = () => {
    analysisSectionNode.attr("class", "col-sm-4");
    const analysisDisplay = createTextDisplay("analysisText", "Tea");
    const teaSection = createTeaDiv("analysis_div", [analysisDisplay]);
    analysisSectionNode.parent().append(teaSection);
    analysisSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Formal Text</div>");
    adjustHeight(analysisSectionNode.parent());
};

const handleHypothesis = () => {
    hypothesisSectionNode.attr("class", "col-sm-4");
    const hypothesisDisplay = createTextDisplay("hypothesisText", "Tea");
    const teaSection = createTeaDiv("analysis_div", [hypothesisDisplay]);
    hypothesisSectionNode.parent().append(teaSection);
    hypothesisSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Formal Text</div>");
    adjustHeight(hypothesisSectionNode.parent());
}

const handleGridChange = () => {
    handleHypothesis();
    handleDependentVariableGrid();
    handleIndependentVariableGrid();
    handleAnalysisGrid();
}