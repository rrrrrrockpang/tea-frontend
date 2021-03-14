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

        if(this.id !== ANALYSIS_ID) {
            popoverContentForm = createForm(id, button, displayArea);
        } else {
            //TODO: Check independent variable type "nominal"/others
            button.on("click", function() {
                const variables = $(".hypothesis-dv").find(".variable-card");
                if(variables.length <= 0) {
                    alert("Please add variables!");
                    return;
                } else if (analysisDV === "") {
                    alert("Please select a dependent variable!");
                    return;
                }

                console.log(dependentVarLst);
                for(let i = 0; i < dependentVarLst.length; i++) {
                    if(analysisDV === dependentVarLst[i].name) {
                        const selectedType = dependentVarLst[i].type;
                        console.log(selectedType);
                        popoverContentForm = createForm(id, button, displayArea, selectedType);
                        break;
                    }
                }

                popoverContentForm.find(".dv-in-form").text(analysisDV);

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
            });

        }

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
    }

    getpopoverContentForm(popoverBtn, type="") {
        if(this.id === HYPOTHESIS_ID) return;
        const displayArea = this.displayArea;
        return createForm(this.id, popoverBtn, displayArea)

        // TODO: pass in the right hypothesis form based on the dv variable type
        // else if(id === ANALYSIS_ID) {
        //     let form = createForm(id, "nominal");
        //     // console.log(analysisDV);
        //     // form.find(".dv-in-form").append(addhypothesisPopupCard(analysisDV));
        //     return form;
        //
    }
}
