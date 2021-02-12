/**
 * Section div
 */
const createEditableDiv = (textareaNode) => {
    textareaNode.hide();
    textareaNode.parent().append("<div class='col-sm-4' style='display: flex; max-width: 100%; word-break: break-all' contentEditable=\"true\"><ol></ol></div>");
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
                           "class='tea-div col-sm-4 panel panel-default'>" + text + "</div>");
    textDisplayNode.text(text);
    return textDisplayNode;
};


///// Post-facto adjust the html

/**
 * Adjust div height depending on the heighest div inside.
 * @param parentNode
 */
const adjustHeight = (parentNode) => {
    parentNode.css(PARENT_HEIGHT_FLEX);
    // let maxHeight = -1;
    // parentNode.children("div").each(function(){
    //     maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    // });
    // // you can get from dependentVariableTextAreaNode.css("line-height")
    // // but I don't want to bother with text processing "20px" to "20"
    // let lineHeight = 20;  // line height.
    // console.log(lineHeight);
    // let row = Math.ceil(maxHeight / lineHeight);
    // maxHeight = row * 20;
    // parentNode.children("div").each(function() {
    //     $(this).height(maxHeight);
    // });
    // parentNode.find("textarea").attr('rows', row);
};

/**
 * Add list from clicking a button
 */
const addList = (iframeNode, text) => {
    newLiNode = $("<li class='list-item'>" + text + "</li>")
    iframeNode.append(newLiNode);
}



/**
 * Element in the popover box
 */
function addClose (button) {
    $(document).on('click', '#popover-close', function(){
        button.popover('hide');
    })
    // $("#addDependent").on('shown.bs.popover', function () {
    //     console.log("Hi")
    //     $("#popover-close").on("click", function(){
    //         console.log("?");
    //     });
    // })

}
