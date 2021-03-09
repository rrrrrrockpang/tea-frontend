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
        let hypothesis_dv = "";
        for(let i = 0; i < val.length; i++) {
            let variable = val[i];
            hypothesis_dv += addCard(variable.getName(), "hypothesis_dv_" + variable.getName()).html();
        }
        $(`.hypothesis-dv`).append(hypothesis_dv);
    })



    ivListener.registerListener(function(val) {
        let hypothesis_iv = "";
        for(let i = 0; i < val.length; i++) {
            let variable = val[i];
            hypothesis_iv += addCard(variable.getName(), "hypothesis_iv_" + variable.getName()).html();
        }
        alert(hypothesis_iv);
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