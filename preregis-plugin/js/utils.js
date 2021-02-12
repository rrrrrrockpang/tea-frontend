/**
 * Section div
 */
const createEditableDiv = (textareaNode) => {
    textareaNode.hide();
    textareaNode.parent().append("<div class='editable col-sm-4' style='display: flex; max-width: 100%; word-break: break-all' contentEditable=\"true\"><ol></ol></div>");
}


/**
 * This function creates the middle section of a preregistration question.
 * It prompts users to input necessary information for tea
 * @param id
 * @param domLst
 * @returns {*|Window.jQuery|HTMLElement}
 */
const createTeaDiv = (id, domLst) => {
    let middleTeaDivNode = $("<div id = '" + id + "' " +
                             "class='tea-div col-sm-4 panel panel-default'></div>");
    middleTeaDivNode.css("position: relative")
    for(let i = 0; i < domLst.length; i++) {
        middleTeaDivNode.append(domLst[i]);
    }
    return middleTeaDivNode;
};

/**
 * Buttons that users can click
 * @param id
 * @param text
 * @returns {*|Window.jQuery|HTMLElement}
 */
function createButton (id, text) {
    let buttonNode = $("<button id = '" + id + "' " +
                        "class = 'btn btn-success' " +
                        "style = 'position: absolute; right: 0; bottom: 0' " +
                        ">" + text + "</button>");
    buttonNode.text(text);
    return buttonNode;
}

/**
 * Text section that display information
 * @param id
 * @param text
 * @returns {*|Window.jQuery|HTMLElement}
 */
const createTextDisplay = (id, text) => {
    let textDisplayNode =$("<div id = '" + id + "' " +
                           "class='tea-div col-sm-4 panel panel-default' style='width: 80%'>" + text + "</div>");
    textDisplayNode.append($('<ol></ol>'))
    // textDisplayNode.text(text);
    return textDisplayNode;
};

/**
 * Display variables
 */
const addCard = (text) => {
    const selector =
            "<div class='alert alert-success' role='alert'>" +
                "<strong>"+ text + "</strong>" +
                "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
                    "<span aria-hidden='true'>×</span>" +
                "</button>" +
            "</div>";
    return $(selector);
}


///// Post-facto adjust the html

/**
 * Adjust div height depending on the heighest div inside.
 * @param parentNode
 */
const adjustHeight = (parentNode) => {
    parentNode.css(PARENT_HEIGHT_FLEX);
};

/**
 * Add list from clicking a button
 */
const addList = (iframeNode, text) => {
    newLiNode = $("<li class='list-item'>" + text + "</li>")
    iframeNode.append(newLiNode);
}
