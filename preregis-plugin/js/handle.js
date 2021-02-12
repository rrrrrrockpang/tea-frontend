const handlePopover = function(button) {
    const id = button.attr('id');
    console.log(id);
    button.popover(POPOVER_EFFECT);

    let selector = "";

    button.on('shown.bs.popover', function() {
        // Cancel button
        $('body').on('click', '#popover-close', function(){
            button.popover('hide');
        });
        console.log("button clicked");

        $('body').off("click", '#variableBtn').on('click', '#variableBtn', function(e) {
            console.log('document clicked');
            let variable = new Variable();
            let name = $(".popover-content").find('#variable-name').val();
            let type = $(".popover-content").find("#variable-form input[type='radio']:checked").val();
            variable.setVar(type, name);
            if(id === DEPENDENT_VARIABLE_BUTTON_ID) {
                dependentVarLst.push(variable.toJSON());
                selector = "#" + DEPENDENT_VARIABLE_TEXT_DISPLAY_ID;
                $(selector + '> ol').append(addCard(variable.getName()));
            } else if (id === INDEPENDENT_VARIABLE_BUTTON_ID) {
                independentVarLst.push(variable.toJSON());
                console.log()
                selector = "#" + INDEPENDENT_VARIABLE_TEXTDISPLAY_ID;
                $(selector + '> ol').append(addCard(variable.getName()));
            }
            console.log("?");
            console.log(dependentVarLst);
            console.log(independentVarLst);
            button.popover('hide');
        });
    });

    button.on('hidden.bs.popover', function() {
        $('body').off('#variableBtn');
    })

}

const handleDependentVariableGrid = function() {
    createEditableDiv(dependentVariableSectionNode);
    const DVBtn = createButton(DEPENDENT_VARIABLE_BUTTON_ID, "Add a DV");
    const DVDisplay = createTextDisplay(DEPENDENT_VARIABLE_TEXT_DISPLAY_ID, "Tea");
    const teaSection = createTeaDiv(DEPENDENT_PLUGIN_AREA_ID, [DVBtn, DVDisplay]);
    dependentVariableSectionNode.parent().append(teaSection);
    dependentVariableSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Formal Text</div>");
    adjustHeight(dependentVariableSectionNode.parent());
    handlePopover(DVBtn);

    DVDisplay.on('DOMSubtreeModified', function() {
        console.log(dependentVarLst);
        console.log(dependentVariableSectionNode.parent().children('div').eq(1).html())
        console.log(dependentVariableSectionNode.parent().eq(1).html());
        dependentVariableSectionNode.parent().children().eq(1).append(dependentVarLst.length);
    });
    console.log(dependentVarLst)
}

const handleIndependentVariableGrid = () => {
    createEditableDiv(independentVariableSectionNode);
    const IVBtn = createButton(INDEPENDENT_VARIABLE_BUTTON_ID, "Add a IV");
    const IVDisplay = createTextDisplay(INDEPENDENT_VARIABLE_TEXTDISPLAY_ID, "Tea");
    const teaSection = createTeaDiv(INDEPENDENT_PLUGIN_AREA_ID, [IVBtn, IVDisplay]);
    independentVariableSectionNode.parent().append(teaSection);
    independentVariableSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Formal Text</div>");
    adjustHeight(independentVariableSectionNode.parent());
    handlePopover(IVBtn);
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