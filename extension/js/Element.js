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
            middle.append(this.createDisplayArea());            // variable and hypothesis is different
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

            this.handleInitialBtn();
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

    createDisplayArea() {
        let displayArea = $("<div id = '" + this.id + "_displayarea" + "' " +
            "class='tea-div col-sm-4 panel panel-default' style='width: 65%'>" + this.id + "</div>");
        this.displayArea = displayArea;
        return displayArea;
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

        }
    }

    getpopoverContentForm(popoverBtn) {
        const id = this.id;
        const displayArea = this.displayArea;

        const formTemplate = $(`
            <form class='extension_popover_form' id='${id + "_form"}'>
                <div class="form-group">
                    <label htmlFor='name' className='col-form-label'>Name:
                    <input type='text' class='form-control' id='${id + "_name"}'>
                    </label>
                </div>
                
                <div class='form-group var-type'>
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
                            <label class='form-check-label' for='intervalRadio'>Interval</label>
                        </div>
                        <div class='radio-inline'>
                            <input class='form-check-input' type='radio' name='variableTypeRadios' id='ratioRadio' value='ratio'>
                            <label class='form-check-label' for='ratioRadio'>Ratio</label>
                        </div>
                    </div>
                </div>
            </form>
        `);

        formTemplate.find(".var-type input[type='radio']").on("change", function() {
            let selected = $(`#${id + '_form'} input[type='radio']:checked`);
            let nominal_area = formTemplate.find("#nominal-category");
            let ordinal_area = formTemplate.find("#ordinal-category");

            // handle nominal
            if(selected.val() === "nominal") {
                if(ordinal_area.length !== 0) {
                    ordinal_area.hide();
                }

                if(nominal_area.length !== 0) {
                    nominal_area.show();
                } else {
                    let addenda = $(`
                    <div class="form-group" id="nominal-category">
                        <div class='row'><label for='type' class='col-form-label'>Categories:</label></div>
                        <div class="form-row align-items-center">
                            <div class="col-auto">
                                <input type="text" class='form-control'>
                            </div>
                            <div class="col-auto">
                                <button type="submit" class="btn btn-success mb-2">Add</button>
                            </div>
                        </div>
                    </div>
                `   );
                    addenda.insertAfter(formTemplate.find(".var-type"));
                }
            }

            if(selected.val() === "ordinal") {
                if(nominal_area.length !== 0) {
                    nominal_area.hide();
                }

                if(ordinal_area.length !== 0) {
                    ordinal_area.show();
                } else {
                    let addenda = $(`
                    <div class="form-group" id="ordinal-category">
                        <div class='row'><label for='type' class='col-form-label'>Orders:</label></div>
                        <div class="form-row align-items-center">
                            <div class="col-auto">
                                <input type="text" class='form-control'>
                            </div>
                            <div class="col-auto">
                                <button type="submit" class="btn btn-success mb-2">Add</button>
                            </div>
                        </div>
                    </div>
                `   );
                    addenda.insertAfter(formTemplate.find(".var-type"));
                }
            }

            if(selected.val() === "interval" || selected.val() === "ratio") {
                nominal_area.hide();
                ordinal_area.hide();
            }
        })

        // formTemplate.find("#nominalRadio").change(function() {
        //     let radio = $(this);
        //     let nominal_area = formTemplate.has("#nominal-category");
        //
        //     if(nominal_area.length === 0) {
        //         if(radio.is(':checked')) {
        //             let addenda = $(`
        //             <div class="form-group" id="nominal-category">
        //                 <div class='row'><label for='type' class='col-form-label'>Categories:</label></div>
        //                 <div class="form-row align-items-center">
        //                     <div class="col-auto">
        //                         <input type="text" class='form-control'>
        //                     </div>
        //                     <div class="col-auto">
        //                         <button type="submit" class="btn btn-success mb-2">Add</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         `   );
        //             addenda.insertAfter(formTemplate.find(".var-type"));
        //         }
        //     } else {
        //         if(radio.is(':checked')) {
        //             nominal_area.show();
        //         } else {
        //             console.log("??????")
        //             nominal_area.hide();
        //         }
        //     }
        // });
        //
        // formTemplate.find("#ordinalRadio").change(function() {
        //     if($(this).is(':checked')) {
        //         alert("ordinal checked");
        //     }
        // })


        let cancelBtn = $("<button type='button' class='btn btn-secondary'>Close</button>");
        let changeBtn = $("<button type='button' class='btn btn-success'>Add</button>");
        formTemplate.append(cancelBtn, changeBtn);
        cancelBtn.on('click', function() {
            popoverBtn.popover('hide');
        });

        changeBtn.on('click', function() {
            // Add to array
            // Display to the display area
            console.log(id);
            console.log(DV_ID);
            if(id === DV_ID) {
                alert("??")

                let variable = new Variable();
                let name = formTemplate.find(`${id + "_name"}`).val();
                let type = formTemplate.find(".var-type input[type='radio']:checked").val();
                alert(name + type);
                variable.setVar(type, name);
                dependentVarLst.push(variable.toJSON());
                displayArea.append(addCard(variable.getName()));
                console.log(dependentVarLst);
            }
        })
        return formTemplate;
    }
}
