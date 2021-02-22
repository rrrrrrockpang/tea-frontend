POPOVER_EFFECT = {
    html: true,
    sanitize: false,
    container: 'body',
    placement: 'right',
    title: "hi",
    content: function() {
        return $("<p>hi</p>")
    }
}