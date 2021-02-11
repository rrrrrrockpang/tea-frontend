

$(document).ready(() => {
    $.get(chrome.runtime.getURL('/html/inputBox.html'), (data) => {
        $(data).appendTo('body');
    })
    handleGridChange();
    // dependentVariableSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Hi</div>")
    // dependentVariableSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Hi</div>")
    // dependentVariableSectionNode.attr("class", "col-sm-4")
});

