$(document).ready(function() {
    $.get(chrome.runtime.getURL('/html/modal.html'), (data) => {
        $(data).appendTo('body');
    })

    $('.modal').off().on('hidden.bs.modal', function(e)
    {
        $(this).find('#variable-form').trigger("reset");
        $(this).find('#variableInformationLabel').empty();
    }) ;
})