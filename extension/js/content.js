$(document).ready(function() {
    // handle variable listener
    // handleVariableListeners();

    // add plugin sections
    addAnalysisPreregistea();
    addConstructPreregistea();
    addDependentVariablePreregistea();
    addConditionPreregistea();
    // addSampleSizePreregistea();
    //
    // // Add Floating button
    const body = $("body");
    addTeaModal(body);
    body.append(addTeaFloatingBtn());
    body.append(addMethodFloatingBtn());
});