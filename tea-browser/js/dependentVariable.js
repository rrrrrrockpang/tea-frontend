/* Need to use variable.js, setting.js */
const handleDependentVariable = (event) => {
    console.log("handleDependentVariable Called");
    const parentContainerNode = $(event.target).parent();
    const pluginContainerNode = $("<div>", {id: DEPENDENT_PLUGIN_AREA_ID});
    parentContainerNode.css(FORM_GROUP_CONTAINER_CSS);
    addPlugin(parentContainerNode, pluginContainerNode, DEPENDENT_VARIABLE_BUTTON_ID, DEPENDENT_VARIABLE_TEXT_DISPLAY_ID);
}

const handleIndependentVariable = (event) => {
    console.log("handleDIndependentVariable Called");
    const parentContainerNode = $(event.target).parent();
    const pluginContainerNode = $("<div>", {id: INDEPENDENT_PLUGIN_AREA_ID});
    parentContainerNode.css(FORM_GROUP_CONTAINER_CSS);
    addPlugin(parentContainerNode, pluginContainerNode, INDEPENDENT_VARIABLE_BUTTON_ID, INDEPENDENT_VARIABLE_TEXTDISPLAY_ID);
}

