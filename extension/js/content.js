$(document).ready(function() {
    // Append the icons
    for(let i = 0; i < TEXTAREA_NODES.length; i++) {
        let node_id = IDS[i];
        let node = TEXTAREA_NODES[i];
        let box_height = node.height();
        console.log(box_height)
        let box_width = node.width();
        let wrapper = $("<div class='wrapper'></div>").css({
            position: "relative",
            // "box-sizing": "content-box",
            // left: "16px",
            overflow: "auto",
            width: "100%",
            // position: "relative",
            // overflow: "hidden",
            // border: "0px",
            // margin: "0px",
            // "padding-bottom": "20px",
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

        icon.on("click", function() {
            var element = new Element(node_id, node);
        })
    }
});