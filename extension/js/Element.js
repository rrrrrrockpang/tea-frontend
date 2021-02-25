class Element {
    constructor(id, node) {
        this.id = id;
        this.node = node;
        // this.createInitialLayout(this.node);
        // this.handleInitialBtn();
        this.middle = null;
        this.paper = null;
        this.isOpen = false;
    }

    /**
     * Because it's hard to find the container in aspredicted.
     * We find the textarea instead. And we proceed with its parent().
     * @param textareaNode
     */
    createInitialLayout(textareaNode) {
        if(this.textareaSection != null && this.middle != null && this.paper != null) {
            if(this.isOpen) {
                this.middle.hide();
                this.paper.hide();
                $(".counter").css("display", "block");
                this.textareaSection.attr('class', 'col-sm-12');
            } else {
                this.middle.show();
                this.paper.show();
                $(".counter").css("display", "none");
                this.textareaSection.attr('class', 'col-sm-4');
            }
            this.isOpen = !this.isOpen;
        } else {
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

            this.sectionContainer = sectionContainer;
            this.textareaSection = textareaSection;
            this.middle = middle;
            this.paper = paper;

            this.createInitialBtn();
            this.isOpen = true;
        }
    }

    createInitialBtn() {
        const btn_id = this.id + "_initial_btn";
        let buttonNode = $("<button id = '" + btn_id + "' " +
            "class = 'btn btn-success' " +
            "style = 'position: absolute; right: 0; bottom: 0'" +
            "></button>");

        if(this.id === DV_ID) {
            buttonNode.text("Add a Dependent Variable");
        } else if (this.id === CONDITION_ID) {
            buttonNode.text("Add an Independent Variable");
        } else if (this.id === HYPOTHESIS_ID) {
            buttonNode.text("Operationalize your construct");
        } else if (this.id === ANALYSIS_ID) {
            buttonNode.text("Find the right statistical test with Tea");
        } else if(this.id === SAMPLESIZE_ID) {
            buttonNode.text("Determine Sample Size");
        }

        this.initialButton = buttonNode;

        return buttonNode;
    }

    handleInitialBtn() {
        let button = this.initialButton;
        const btn_id = button.attr('id');
        const popoverContentForm = this.getpopoverContentForm(button);

        if(this.id !== ANALYSIS_ID) {
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

            button.on('shown.bs.popover', function() {

            })
        }
    }

    getpopoverContentForm(popoverBtn) {
        const formTemplate = $(`
            <form class='extension_popover_form' id='${this.id + "_form"}'>
                <div class="form-group">
                    <label htmlFor='name' className='col-form-label'>Name:
                    <input type='text' class='form-control' id='${this.id + "_name"}'>
                    </label>
                </div>
                
                <div class='form-group'>
                    <div class='row'><label for='type' class='col-form-label'>Type:</label></div>
                    <div class="row">
                        <div class='radio-inline'>
                            <input class='form-check-input' type='radio' name='variableTypeRadios' id='nominalRadio' value='nominal'>
                            <label class='form-check-label' for='nominalRadio'>Nominal</label>
                        </div>
                        <div class='radio-inline'>
                            <input class='form-check-input' type='radio' name='variableTypeRadios' id='ordinalRadio' value='ordinal'>
                            <label class='form-check-label' for='ordinalRadio'>Ordinal</label>
                        </div>
                        <div class='radio-inline'>
                            <input class='form-check-input' type='radio' name='variableTypeRadios' id='intervalRadio' value='interval'>
                            <label class='form-check-label' for='intervalRadio'>Nominal</label>
                        </div>
                        <div class='radio-inline'>
                            <input class='form-check-input' type='radio' name='variableTypeRadios' id='ratioRadio' value='ratio'>
                            <label class='form-check-label' for='ratioRadio'>Ratio</label>
                        </div>
                    </div>
                </div>
            </form>
        `);

        let cancelBtn = $("<button type='button' class='btn btn-secondary'>Close</button>");
        let changeBtn = $("<button type='button' class='btn btn-success'>Change</button>");
        formTemplate.append(cancelBtn, changeBtn);
        cancelBtn.on('click', function() {
            popoverBtn.popover('hide');
        });
        return formTemplate;
    }
}
