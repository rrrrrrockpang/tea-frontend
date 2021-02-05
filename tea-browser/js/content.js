
// Click events on AsPredicted Platform
// $(() => {
//     $("body").on("click", (event) => {
//         const target = event.target;
//         const parent = $(target).parent().get(0);
//         if(target.id === "1" || parent === hypothesisNode.parent().get(0)) {
//             console.log("Hypothesis Clicked");
//         }
//         // Dependent Variable
//         else if(target.id === "2" || parent === dependentVariableNode.parent().get(0)) {
//             console.log("Dependent Variable Area Clicked");
//             handleDependentVariable(event);
//         }
//         // Independent Variable, or condition as in the template
//         else if(target.id === "3" || parent === independentVariableNode.parent().get(0)) {
//             console.log("Independent Variable Area Clicked")
//             handleIndependentVariable(event);
//         }
//         // analysis
//         else if(target.id === "4" || parent === analysisNode.parent().get(0)) {
//             console.log("Analysis Node Clicked");
//             // TODO: This play will take the response from the server and insert in the textarea "analysisNode"
//         }
//         // outliers and exclusion
//         else if(target.id === "5" || parent === exclusionNode.parent().get(0)) {
//             console.log("Outliers and Exclusion clicked");
//             // TODO: What to deal with this? Just let user input?
//         }
//         // sample size
//         else if(target.id === "6" || parent === sampleSizeNode.parent().get(0)) {
//             console.log("Sample Size clicked");
//             // TODO: maybe we can use a power analysis here. Similar to using Tea. Build an API.
//         }
//         // other
//         else if(target.id === "7" || parent === otherNode.parent().get(0)) {
//             console.log("Other clicked");
//             // TODO: Just let the users input?
//         }
//         // Click areas other than the textarea boxes.
//         else {
//             console.log("Nothing is clicked");
//         }
//
//     })
// })

let mouse_in_hypothesis = false;
let mouse_in_dependent_variable = false;
let mouse_in_independent_variable = false;
let mouse_in_analysis = false;
let mouse_in_exclusion = false;
let mouse_in_sample_size = false;
let mouse_in_other = false;

const handleClickEvent = (is_mouse_in_section, event, sectionNode, plugin_selector, create_plugin_func) => {
    if(is_mouse_in_section) {
        let isAttached = sectionNode.parent().find(plugin_selector).length;
        if(isAttached)
            $(plugin_selector).show();
        else
            create_plugin_func(event);
    } else
        $(plugin_selector).hide();
}

$(document).ready(function()
{
    // determine where the mouse is
    hypothesisNode.parent().hover(() => {mouse_in_hypothesis = true;}, () => {mouse_in_hypothesis = false;});
    dependentVariableNode.parent().hover(() => {mouse_in_dependent_variable=true;}, () => {mouse_in_dependent_variable=false;});
    independentVariableNode.parent().hover(() => {mouse_in_independent_variable = true;}, () => { mouse_in_independent_variable = false;});
    analysisNode.parent().hover(() => {mouse_in_analysis = true;}, () => {mouse_in_analysis = false;});
    exclusionNode.parent().hover(() => {mouse_in_exclusion = true;}, () => {mouse_in_exclusion = false;});
    sampleSizeNode.parent().hover(() => {mouse_in_sample_size = true;}, () => {mouse_in_sample_size = false;});
    otherNode.parent().hover(() => {mouse_in_other = true;}, () => {mouse_in_other = false;});

    $("body").mouseup((event) => {
        handleClickEvent(mouse_in_hypothesis, event, hypothesisNode, HYPOTHESIS_PLUGIN_AREA_ID_JQUERY_SELECTOR, handleHypothesis);
        handleClickEvent(mouse_in_dependent_variable, event, dependentVariableNode, DEPENDENT_PLUGIN_AREA_ID_JQUERY_SELECTOR, handleDependentVariable);
        handleClickEvent(mouse_in_independent_variable, event, independentVariableNode, INDEPENDENT_PLUGIN_AREA_ID_JQUERY_SELECTOR, handleIndependentVariable);
    });
});

