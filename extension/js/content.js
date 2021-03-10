$(document).ready(function() {
     $('body').on('hidden.bs.popover', function (e) {
        $(e.target).data("bs.popover").inState.click = false;
    }).on('click', function (e) {
        $('.initial_btn').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    dvListener  = {
        dvInternal: dependentVarLst,
        dvListener: function(val) {},
        set dv(val) {
            this.dvInternal = val;
            this.dvListener(val);
        },
        get dv() {
            return this.dvInternal;
        },
        registerListener: function(listener) {
            this.dvListener = listener;
        }
    }

    ivListener  = {
        ivInternal: independentVarLst,
        ivListener: function(val) {},
        set iv(val) {
            this.ivInternal = val;
            this.ivListener(val);
        },
        get iv() {
            return this.ivInternal;
        },
        registerListener: function(listener) {
            this.ivListener = listener;
        }
    }

    dvListener.registerListener(function(val) {
        $(`.hypothesis-dv`).empty();
        let hypothesis_dv = [];

        for(let i = 0; i < val.length; i++) {
            let variable = val[i];
            let card = addHypothesisCard(variable.getName(), "hypothesis_dv_" + variable.getName());

            card.find(".col-sm-12").on("click", function() {
                $(this).parent().parent().parent().css("background", "grey");
                if(analysisDV) {
                    analysisDVElement.css("background", "none");
                    if(analysisDV === variable.getName()) {
                        analysisDVClicked = false;
                        analysisDVElement = null;
                        analysisDV = "";
                    } else {
                        analysisDVClicked = true;
                        analysisDVElement = $(this).parent().parent().parent();
                        analysisDV = variable.getName();
                    }
                } else {
                    analysisDVClicked = true;
                    analysisDVElement = $(this).parent().parent().parent();
                    analysisDV = variable.getName();
                }
            });
            hypothesis_dv.push(card);
        }
        $(`.hypothesis-dv`).append(hypothesis_dv);
    })



    ivListener.registerListener(function(val) {
        let hypothesis_iv = [];
        $(`.hypothesis-iv`).empty();
        for(let i = 0; i < val.length; i++) {
            let variable = val[i];
            let card = addHypothesisCard(variable.getName(), "hypothesis_iv_" + variable.getName());

            card.find(".col-sm-12").on("click", function() {
                $(this).parent().parent().parent().css("background", "grey");
                if(analysisConditionClicked) {
                    analysisConditionElement.css("background", "none");
                    if(analysisCondition === variable.getName()) {
                        analysisConditionClicked = false;
                        analysisConditionElement = null;
                        analysisCondition = "";
                    } else {
                        analysisConditionClicked = true;
                        analysisConditionElement = $(this).parent().parent().parent();
                        analysisCondition = variable.getName();
                    }
                } else {
                    analysisConditionClicked = true;
                    analysisConditionElement = $(this).parent().parent().parent();
                    analysisCondition = variable.getName();
                }
                console.log(analysisConditionClicked);
                console.log(analysisConditionElement);
                console.log(analysisCondition);
            })
            // let clicked = false;
            // card.find(".col-sm-10").on("click", function() {
            //     if(!clicked) {
            //         $(this).parent().parent().css("background", "grey");
            //         if(analysisConditionClicked) {
            //             analysisConditionElement.css("background", "none");
            //         } else {
            //             analysisConditionClicked = true;
            //             analysisConditionElement = $(this).parent().parent();
            //             analysisCondition = variable.getName();
            //         }
            //     } else {
            //         analysisConditionClicked = false;
            //         analysisConditionElement = null;
            //         analysisCondition = "";
            //         $(this).parent().parent().css("background", "none");
            //     }
            //     clicked = !clicked;
            //     console.log(analysisCondition);

            hypothesis_iv.push(card);
        }
        $(`.hypothesis-iv`).append(hypothesis_iv);
    })
     
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
        if(node_id === ANALYSIS_ID) {
            element.createInitialLayout(node);
        }
        icon.on("click", function() {
            element.createInitialLayout(node);
        })
    }
});