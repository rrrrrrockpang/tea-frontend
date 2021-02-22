class Component {
    constructor(prop, name, description="", type="", addenda={}) {
        this.prop = prop;
        this.name = name;
        this.id = this.prop + "_" + this.name.replace(" ", "_");
        this.description = description;
        this.type = type;
        this.addenda = addenda;
        this.wrapper = null;
        this.componentNode = null;
        // this.formHTML = this.generateTooltipForm();
    }

    addComponent(div) {
        this.wrapper = $("<div class='row'><div class='container'></div></div>");
        this.componentNode = $("<div id='" + this.id + "' class='component'></div>");
        this.wrapper.find(".container").append(this.componentNode);
        div.append(this.wrapper);
    }

    removeComponent() {
        this.componentNode.css("opacity", "0");
    }

    generateTooltipForm() {
        let componenetNode = this.componentNode;

        let formTemplate =
            $("<form id='component-form' method='post'>" +
            "        <div class='form-group'>" +
            "            <label for='name' class='col-form-label'>Name:" +
                "        <input type='text' class='form-control' id='variable-name' value='"+ this.name +"' readonly></label>" +
            "        </div>" +

            "        <div class='form-group'>" +
            "            <div class='row'><label for='type' class='col-form-label'>Type:</label></div>" +
                        "<div class='row'>" +
                            "<div class='radio-inline'>" +
            "                    <input class='form-check-input' type='radio' name='variableTypeRadios' id='nominalRadio' value='nominal' disabled>" +
                "                <label class='form-check-label' for='nominalRadio'>Nominal</label>" +
                "            </div>" +
                "            <div class='radio-inline'>" +
                "                <input class='form-check-input' type='radio' name='variableTypeRadios' id='ordinalRadio' value='ordinal' disabled>" +
                "                <label class='form-check-label' for='ordinalRadio'>Ordinal</label>" +
                "            </div>" +
                "            <div class='radio-inline'>" +
                "                <input class='form-check-input' type='radio' name='variableTypeRadios' id='intervalRadio' value='interval' disabled>" +
                "                <label class='form-check-label' for='intervalRadio'>Interval</label>" +
                "            </div>" +
                "            <div class='radio-inline'>" +
                "                <input class='form-check-input' type='radio' name='variableTypeRadios' id='ratioRadio' value='ratio' disabled>" +
                "                <label class='form-check-label' for='ratioRadio'>Ratio</label>" +
                "            </div>" +
                        "</div>" +
            "        </div>" +
                "</form>");

        let cancelBtn = $("<button type='button' class='btn btn-secondary'>Close</button>");
        let changeBtn = $("<button type='button' class='btn btn-success'>Change</button>");
        formTemplate.append(cancelBtn, changeBtn);
        cancelBtn.on('click', function() {
            componenetNode.popover('hide');
        });

        changeBtn.on('click', function() {
            let choice = confirm("Are you sure you want to change this?");
            if(choice) {
                formTemplate.find("input[type='radio']").prop("disabled", false);
                formTemplate.find("input[type='text']").prop('readonly', false);
                cancelBtn.prop("disabled", true);
                $(this).prop("disabled", true);
                var submitBtn = $("<button type='submit' class='btn btn-success'>Submit</button>");
                formTemplate.append(submitBtn);
                submitBtn.on("click", function() {
                    formTemplate.find("input[type='radio']").prop("disabled", true);
                    formTemplate.find("input[type='text']").prop('readonly', true);
                    cancelBtn.prop("disabled", false);
                    changeBtn.prop("disabled", false);
                    $(this).remove();
                });
            }
        })
        return formTemplate;
    }

    showToolTipForm() {
        let contentHtml = this.generateTooltipForm();
        this.componentNode.popover({
            html: true,
            sanitize: false,
            container: 'body',
            placement: 'right',
            title: this.prop,
            content: function() {
                return contentHtml;
            }
        });
    }
}