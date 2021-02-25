$(document).ready(function() {
     $('body').on('hidden.bs.popover', function (e) {
        $(e.target).data("bs.popover").inState.click = false;
    });
     
    // Append the icons
    for(let i = 0; i < TEXTAREA_NODES.length; i++) {
        let node_id = IDS[i];
        let node = TEXTAREA_NODES[i];
        let box_height = node.height();
        console.log(box_height)
        let box_width = node.width();
        let wrapper = $("<div class='wrapper'></div>").css({
            position: "relative",
            overflow: "auto",
            width: "100%",
        });
        node.wrap(wrapper);

        let icon = $("<i id=" + node_id + "_icon" + " class='icon'></i>").css({
            position: "absolute",
            bottom: "20px",
            right: "20px",
            background: "purple",
            padding: "10px",
        });
        node.parent().append(icon);

        let element = new Element(node_id, node);
        icon.on("click", function() {
            element.createInitialLayout(node);
        })
    }
});