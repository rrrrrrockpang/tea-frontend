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
        if(this.textareaSection != null && this.middle != null) {
            if(this.isOpen) {
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
        } else {
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
            this.isOpen = true;
        }
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

        // hypothesis selector
        // if(this.id === ANALYSIS_ID) {
        //     displayArea = $(`
        //         <div class="container" style="width: 100%; display: flex; flex-direction: column">
        //             <div class="row">
        //                 <div class="col-sm-6">
        //                     <div class="dropdown show">
        //                         <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //                             DV
        //                         </button>
        //
        //                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        //                        </div>
        //                     </div>
        //                 </div>
        //                 <div class="col-sm-6">Hello</div>
        //             </div>
        //         </div>
        //     `);
        //
        //     displayArea.find(".btn").on("click", function() {
        //         let count = $(".dropdown-menu .dropdown-item").length;
        //         console.log(dependentVarLst);
        //         if(dependentVarLst.length === 0) {
        //             alert("Please add some variables");
        //             return;
        //         }
        //         if(count !== dependentVarLst.length) {
        //             for(let i = 0; i < dependentVarLst.length; i++) {
        //                 $(`<a class="dropdown-item" href="#">${dependentVarLst[i]}</a>`).appendTo(".dropdown-menu");
        //             }
        //         }
        //     });
        // }
        if(this.id === ANALYSIS_ID) {
            displayArea.append(`
                <div class='container h-100'>
                    <div class="row h-100">
                        <div class="col-sm-6 h-100 hypothesis-dv">
                        </div>
                        <div class="col-sm-6 h-100 hypothesis-iv">
                        </div>
                    </div>
                </div>
            `);
        }

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


        if(id === DV_ID || id === CONDITION_ID) {
            const formTemplate = createForm(id);

            formTemplate.find(".var-type input[type='radio']").on("change", function () {
                let selected = $(`#${id + '_form'} input[type='radio']:checked`);
                let nominal_area = formTemplate.find("#nominal-category");
                let ordinal_area = formTemplate.find("#ordinal-category");

                // handle nominal
                if (selected.val() === "nominal") {
                    if (ordinal_area.length !== 0) {
                        ordinal_area.hide();
                    }

                    if (nominal_area.length !== 0) {
                        nominal_area.show();
                    } else {
                        let addenda = $(`

                    <div class="form-group add-category" id="nominal-category">
                        <label for='name' class='col-form-label'>Categories:</label>
                        
                        <div class="form-inline">
                            <input type='text' class='form-control'>
                            <button type="submit" class="btn btn-success mb-2">Add</button>
                        </div>
                    </div>
                `);
                        addenda.insertAfter(formTemplate.find(".var-type"));
                    }
                }

                if (selected.val() === "ordinal") {
                    if (nominal_area.length !== 0) {
                        nominal_area.hide();
                    }

                    if (ordinal_area.length !== 0) {
                        ordinal_area.show();
                    } else {
                        let addenda = $(`
                    <div class="form-group add-category" id="ordinal-category">
                        <label for='name' class='col-form-label'>Categories:</label>
                        
                        <div class="form-inline">
                            <input type='text' class='form-control'>
                            <button type="submit" class="btn btn-success mb-2">Add</button>
                        </div>
                    </div>
                `);
                        addenda.insertAfter(formTemplate.find(".var-type"));
                    }
                }

                if (selected.val() === "interval" || selected.val() === "ratio") {
                    nominal_area.hide();
                    ordinal_area.hide();
                }
            })

            // cancel and submit btn
            let cancelBtn = $("<button type='button' class='btn btn-secondary'>Close</button>");
            let submitBtn = $("<button type='button' class='btn btn-success'>Add</button>");
            formTemplate.append(cancelBtn, submitBtn);
            cancelBtn.on('click', function() {
                popoverBtn.popover('hide');
            });

            submitBtn.on('click', function() {
                // Add to array
                // Display to the display area
                if(id === DV_ID || id === CONDITION_ID) {
                    let variable = new Variable();
                    let name = formTemplate.find("input[type='text']").val();
                    let type = formTemplate.find(".var-type input[type='radio']:checked").val();
                    variable.setVar(type, name);
                    let card = addCard(variable.getName());

                    if (id === DV_ID) {
                        dependentVarLst.push(variable);
                        card.find(".delete").on("click", function () {
                            let pos = 0;
                            for(let i = 0; i < dependentVarLst.length; i++) {
                                if($(this).parent().parent().find(".col-sm-10 p").text() === dependentVarLst[i]) {
                                    pos = i;
                                    break
                                }
                            }
                            $(this).parent().parent().parent().parent().remove();
                            dependentVarLst.splice(pos, 1);
                            console.log(dependentVarLst);
                        });
                        dvListener.dv = dependentVarLst;
                    } else if (id === CONDITION_ID) {
                        independentVarLst.push(variable);
                        card.find(".delete").on("click", function () {
                            $(this).parent().parent().parent().parent().remove();
                            let pos = 0;
                            for(let i = 0; i < dependentVarLst.length; i++) {
                                if($(this).parent().parent().find(".col-sm-10 p").text() === dependentVarLst[i]) {
                                    pos = i;
                                    break
                                }
                            }
                            independentVarLst.splice(pos, 1);
                            console.log(independentVarLst)
                        });
                        ivListener.iv = independentVarLst;
                    }
                    displayArea.append(card);
                }
            })
            return formTemplate;
        }


    }
}
