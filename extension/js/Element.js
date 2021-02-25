class Element {
    constructor(id, node) {
        this.id = id;
        this.node = node;
        this.createInitialLayout(this.node);
        console.log("???")
    }

    /**
     * Because it's hard to find the container in aspredicted.
     * We find the textarea instead. And we proceed with its parent().
     * @param textareaNode
     */
    createInitialLayout(textareaNode) {
        // Find the container for a specific question
        const sectionContainer = textareaNode.parent().parent().parent().parent();
        const textareaSection = textareaNode.parent().parent().parent();

        // shrink textarea node
        sectionContainer.find(".form-group").css("height", "100%");
        sectionContainer.find(".wrapper").css("height", "100%");
        textareaNode.css("height", "100%");
        $(".counter").css("display", "none");   // The counter is tricky to handle in the aspredicted website
        textareaSection.attr('class', 'col-sm-4');
        textareaSection.css('margin-bottom', "10px");

        // Add Tea input
        let middle = $("<div id = '" + this.id + "' " +
            "class='tea-div col-sm-4' style='border: solid; margin-bottom: 10px'></div>");
        middle.css("position: relative");
        middle.append(this.createInitialBtn());
        sectionContainer.append(middle);

        // Add paper text
        let paper = $("<div id=" + this.id + "_paper" + " class='col-sm-4' style='border: solid; margin-bottom: 10px'>Need to Insert something here</div>")
        sectionContainer.append(paper);

        adjustHeight(sectionContainer);
        console.log("!!")
    }

    createInitialBtn() {
        const btn_id = this.id + "_initial_btn";
        let buttonNode = $("<button id = '" + btn_id + "' " +
            "class = 'btn btn-success' " +
            "style = 'position: absolute; right: 0; bottom: 0'" +
            "></button>");

        if(this.id === DV_ID) {
            buttonNode.text("Add a Dependent Variable");
        }

        return buttonNode;
    }
}