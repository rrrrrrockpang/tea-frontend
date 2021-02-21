POPOVER_EFFECT = {
    html: true,
    sanitize: false,
    container: 'body',
    placement: 'top',
    title: "hi",
    content: function() {
        return $("<p>hi</p>")
    }
}