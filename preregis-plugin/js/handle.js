const handleDependentVariableGrid = () => {
    // dependentVariableSectionNode.attr("class", "col-sm-4");
    dependentVariableSectionNode.hide();
    dependentVariableSectionNode.parent().append("<div class='col-sm-4'><div id=\"text_area\" style='height: 200px; overflow: scroll' contentEditable=\"true\"><ol></ol></div>");
    const DVBtn = createButton("addDependent", "Add a DV");
    // Add popover effect
    DVBtn.popover({
        html: true,
        title: function() {
            return $("#popover-head").html();
        },
        content: function() {
            return $("#popover-content").html();
        }
    })
    DVBtn.on("click", function () {
        addList($('ol').append("Hi"));
    });
    const DVDisplay = createTextDisplay("dependentText", "Tea");
    const teaSection = createTeaDiv("dependent_variable_div", [DVBtn, DVDisplay]);
    dependentVariableSectionNode.parent().append(teaSection);
    dependentVariableSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Formal Text</div>");
    adjustHeight(dependentVariableSectionNode.parent());
}

const handleIndependentVariableGrid = () => {
    independentVariableSectionNode.attr("class", "col-sm-4");
    // const IVBtn = createButton("addIndependent", "Add a IV");
    const IVDisplay = createTextDisplay("independentText", "Tea");
    const teaSection = createTeaDiv("dependent_variable_div", [IVDisplay]);
    independentVariableSectionNode.parent().append(teaSection);
    independentVariableSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Formal Text</div>");
    adjustHeight(independentVariableSectionNode.parent());
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