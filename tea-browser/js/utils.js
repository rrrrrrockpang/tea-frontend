const addButton = (buttonId) => {
    return $("<button id=\"" + buttonId + "\" class=\"addVar btn btn-success\" data-toggle=\"modal\" data-target=\"#variableInput\" type=\"button\">Add A Variable</button>\n");
}

const addTextDisplay = (textDisplayId) => {
    return $("<div id=" + textDisplayId + "class=\"varText\">\n" +
                "<b>Display the input variables</b>\n" +
             "</div>")
}

const addPlugin = (parentContainerNode, pluginContainerNode, buttonId=null, textDisplayId=null) => {
    parentContainerNode.append(pluginContainerNode);
    pluginContainerNode.css(PLUGIN_CONTAINER_CSS);
    if(buttonId != null) {
        pluginContainerNode.append(addButton(buttonId));
    }

    if(textDisplayId != null) {
        pluginContainerNode.append(addTextDisplay(textDisplayId));
    }
}