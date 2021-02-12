

$(document).ready(() => {
    $.get(chrome.runtime.getURL('/html/inputBox.html'), (data) => {
        $(data).appendTo('body');
    });

    $('body').on('hidden.bs.popover', function (e) {
        $(e.target).data("bs.popover").inState = { click: false, hover: false, focus: false }
    });

    handleGridChange();
    // dependentVariableSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Hi</div>")
    // dependentVariableSectionNode.parent().append("<div class='col-sm-4 panel panel-default'>Hi</div>")
    // dependentVariableSectionNode.attr("class", "col-sm-4")
});

