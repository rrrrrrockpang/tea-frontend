const addButton = (buttonId) => {
    return $("<button id=\"" + buttonId + "\" class=\"addVar btn btn-success\" data-toggle=\"modal\" data-target=\"#variableInput\" type=\"button\">Add A Variable</button>\n");
}

const addTextDisplay = (textDisplayId) => {
    return $("<div id=" + textDisplayId + "class=\"varText\">\n" +
                "<b>Display the input variables</b>\n" +
             "</div>")
}

const addTextarea = (textareaId) => {
    return $("<textarea id=\"" + textareaId + "\"></textarea>")
}

const addPlugin = (parentContainerNode, pluginContainerNode, elementMap) => {
    /*** elementMap.
     * key: element type (button, textarea, textdisplay)
     * value: element ID (buttonID, textareaID, textdisplayID)
    ***/
    parentContainerNode.append(pluginContainerNode);
    pluginContainerNode.css(PLUGIN_CONTAINER_CSS);
    if("button" in elementMap) {
        console.log("Hi");
        pluginContainerNode.append(addButton(elementMap["button"]));
    }

    if("textarea" in elementMap) {
        pluginContainerNode.append(addTextarea(elementMap["textarea"]));
    }

    if("textdisplay" in elementMap) {
        pluginContainerNode.append(addTextDisplay(elementMap["textdisplay"]));
    }
}