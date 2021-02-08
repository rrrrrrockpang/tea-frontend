const handleDependentVariableGrid = () => {
    dependentVariableSectionNode.attr("class", "col-sm-4");
    const DVBtn = createButton("addDependent", "Add a DV");
    const DVDisplay = createTextDisplay("dependentText", "This is the dependent variable");
    const teaSection = createTeaDiv("dependent_variable_div", [DVBtn, DVDisplay]);
    dependentVariableSectionNode.parent().append(teaSection);
    dependentVariableSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Placeholder for Formal Text</div>");
    adjustHeight(dependentVariableSectionNode.parent());
}

const handleIndependentVariableGrid = () => {
    independentVariableSectionNode.attr("class", "col-sm-4");
    const IVBtn = createButton("addIndependent", "Add a IV");
    const IVDisplay = createTextDisplay("independentText", "This is the independent variable");
    const teaSection = createTeaDiv("dependent_variable_div", [IVBtn, IVDisplay]);
    independentVariableSectionNode.parent().append(teaSection);
    independentVariableSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Placeholder for Formal Text</div>");
    adjustHeight(independentVariableSectionNode.parent());
}

const handleGridChange = () => {
    handleDependentVariableGrid();
    handleIndependentVariableGrid();
}