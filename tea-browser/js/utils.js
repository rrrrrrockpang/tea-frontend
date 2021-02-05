/**
 * Add Plugin in frontend
 * @param buttonId
 * @returns {*|Window.jQuery|HTMLElement}
 */
const addButton = (buttonId) => {
    return $("<button id=\"" + buttonId + "\" class=\"addVar btn btn-success\" data-toggle=\"modal\" data-target=\"#variableInput\" type=\"button\">Add A Variable</button>\n");
}

const addTextDisplay = (textDisplayId) => {
    return $("<div id=" + textDisplayId + " class=\"varText\">\n" +
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


/**
 * Add variables to lst
 * @param dependentOrIndependent
 */
const addVarToLst = (dependentOrIndependent) => {
    let variable = new Variable();
    let name = $("#variable-name").val();
    let type = $("#variable-form input[type='radio']:checked").val();
    variable.setVar(type, name);

    if(dependentOrIndependent === "dependent") {
        dependentVarLst.push(variable.toJSON());
        console.log(dependentVarLst);
    } else if (dependentOrIndependent === "independent") {
        independentVarLst.push(variable.toJSON());
        console.log(independentVarLst);
    }

    let selector = "#" + dependentOrIndependent + "Text";
    console.log(selector);
    $(selector).append(variable.toString());
    $(".modal").modal("hide");
}

const addVariable = (dependentOrIndependent) => {
  $("#variableInformationLabel").append(dependentOrIndependent);
  $("#variableBtn").off().on("click", function(){
    addVarToLst(dependentOrIndependent);
  })
}