$(document).ready(function() {
    $.get(chrome.runtime.getURL('/html/modal.html'), (data) => {
        $(data).appendTo('body');
    })
})