class Element {
    constructor(id, node) {
        this.id = id;
        this.node = node;
        // this.createInitialLayout(this.node);
        // this.handleInitialBtn();
        this.middle = null;
        // this.paper = null;
        this.isOpen = false;
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
        textareaSection.attr('class', 'col-sm-6');
        // textareaSection.css('margin-bottom', "10px");

        // Add Tea input
        let middle = $("<div id = '" + this.id + "' " +
            "class='tea-div col-sm-6' style='border: solid'></div>");
        middle.css("position: relative");
        middle.append(this.createDisplayArea());            // variable and hypothesis is different
        middle.append(this.createInitialBtn());
        sectionContainer.append(middle);

        // Add paper text
        // let paper = $("<div id=" + this.id + "_paper" + " class='col-sm-4' style='border: solid; margin-bottom: 10px'>Need to Insert something here</div>")
        // sectionContainer.append(paper);

        adjustHeight(sectionContainer);

        this.sectionContainer = sectionContainer;
        this.textareaSection = textareaSection;
        this.middle = middle;
        // this.paper = paper;

        this.handleInitialBtn();

        // the tea section
        this.middle.hide();
        // this.paper.hide();
        $(".counter").css("display", "block");
        this.textareaSection.attr('class', 'col-sm-12');
    }

    toggleTeaSection() {
        if (this.isOpen) {
            this.middle.hide();
            // this.paper.hide();
            $(".counter").css("display", "block");
            this.textareaSection.attr('class', 'col-sm-12');
        } else {
            this.middle.show();
            // this.paper.show();
            $(".counter").css("display", "none");
            this.textareaSection.attr('class', 'col-sm-6');
        }
        this.isOpen = !this.isOpen;
    }

    createInitialBtn() {
        const btn_id = this.id + "_initial_btn";
        let buttonNode = $("<button id = '" + btn_id + "' " +
            "class = 'btn btn-success btn-sm initial_btn' " +
            "style = 'position: absolute; right: 0; bottom: 0'" +
            "></button>");

        if(this.id === DV_ID) {
            buttonNode.text("Add a Variable");
        } else if (this.id === CONDITION_ID) {
            buttonNode.text("Add a Variable");
        } else if (this.id === HYPOTHESIS_ID) {
            buttonNode.text("Define a construct");
        } else if (this.id === ANALYSIS_ID) {
            buttonNode.text("Find the right statistical test with Tea");
        } else if(this.id === SAMPLESIZE_ID) {
            buttonNode.text("Determine Sample Size");
        }

        this.initialButton = buttonNode;

        return buttonNode;
    }

    createDisplayArea() {
        let displayArea = $("<div id = '" + this.id + "_displayarea" + "' " +
            "class='tea-div h-100'>" + this.id + "</div>");

        if(this.id === ANALYSIS_ID) {
            displayArea.append(`
                <div class='container h-100 w-100'>
                    <div class="row h-100">
                        <div class="col-sm-6 h-100 hypothesis-dv">
                        </div>
                        <div class="col-sm-6 h-100 hypothesis-iv">
                        </div>
                    </div>
                </div>
            `);
        } else if(this.id === CONDITION_ID || this.id === DV_ID) {
            displayArea.append(`
                <div class="container h-100 w-100">
                    <div class="row h-80"></div>
                    <div class="row h-20" style="position: absolute; bottom:0">
                        
                        <div class="suggested-area"></div>
                    </div>
                </div>
            `);
        }
        this.displayArea = displayArea;
        return displayArea;
    }

    handleInitialBtn() {
        const button = this.initialButton;
        const displayArea = this.displayArea;
        const id = this.id;
        // const btn_id = button.attr('id');
        let popoverContentForm = null;
        console.log(this.id);

        if(this.id === HYPOTHESIS_ID || this.id === DV_ID || this.id === CONDITION_ID) {
            button.on("click", function() {
                $(".popover:has(.extension_popover_form)").remove();

                popoverContentForm = createForm(id, button, displayArea);
                button.popover({
                    html: true,
                    sanitize: false,
                    container: 'body',
                    placement: 'top',
                    title: " ",
                    content: function () {
                        return popoverContentForm;
                    }
                });
                button.popover("show");
            });
        } else if(this.id === ANALYSIS_ID) {
            button.on("click", function() {
                $(".popover:has(.extension_popover_form)").remove();

                const variables = $(".hypothesis-dv").find(".variable-card");
                if(variables.length <= 0) {
                    alert("Please add variables!");
                } else if (analysisDV === null) {
                    alert("Please select a dependent variable!");
                } else {
                    // TODO: Determine the dependent variable. using the background color
                    let variable = null;
                    for(let i = 0; i < independentVarLst.length; i++) {
                        if(analysisCondition.name === independentVarLst[i].name) {
                            variable = independentVarLst[i];
                            const selectedType = variable.type;
                            popoverContentForm = createForm(id, button, displayArea, selectedType);
                            break;
                        }
                    }
                    // populate the form based on the selected variables
                    var categories = [];
                    var categories2 = [];
                    popoverContentForm.find(".dv-in-form").text(analysisDV.name);
                    popoverContentForm.find(".iv-in-form").text(analysisCondition.name);
                    for(let i = 0; i < variable.addenda.length; i++) {
                        const option = $(`<option value="${variable.addenda[i]}">${variable.addenda[i]}</option>`);
                        if(i === 0) option.prop("selected", true);
                        categories.push(option);
                        categories2.push(option.clone())
                    }
                    popoverContentForm.find(".iv-group-custom-select-1").append(categories);
                    popoverContentForm.find(".iv-group-custom-select-2").append(categories2);

                    button.popover({
                        html: true,
                        sanitize: false,
                        container: 'body',
                        placement: 'top',
                        title: " ",
                        content: function () {
                            return popoverContentForm;
                        }
                    });
                    button.popover("show");
                }
            });
        } else if(this.id === SAMPLESIZE_ID) {
            handleSampleSizeArea(this.displayArea);
        }
        button.on("hide.bs.popover", function() {
            $(".popover").remove();
        })
    }
}
