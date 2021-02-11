FORM_GROUP_CONTAINER_CSS = {
    "position": "relative"
}

PLUGIN_CONTAINER_CSS = {
    "position": "absolute",
    "top": "0",
    "right": "0",
    "height": "100%",
    "width": "30%",
    "background": "green",
    "display": "block"
}

POPOVER_EFFECT = {
    html: true,
    sanitize: false,
    container: 'body',
    title: function() {
        return $("#popoverTitle").html();
    },
    content: function() {
        return $("#PopoverContent").html();
    }
}