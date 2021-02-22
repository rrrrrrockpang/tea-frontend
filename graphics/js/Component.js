class Component {
    constructor(prop, name, type="", addenda={}) {
        this.prop = prop;
        this.name = name;
        this.id = this.prop + "_" + this.name;
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
            $("<form id='variable-form' method='post'>" +
            "        <div class='form-group'>" +
            "            <label for='variable-name' class='col-form-label'>Name:" +
                "        <input type='text' class='form-control' id='variable-name' value='"+ this.name +"'readonly></label>" +
            "        </div>" +

            "        <div class='form-group'>" +
            "            <div class='row'><label for='variable-type' class='col-form-label'>Type:</label></div>" +
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























    // addComponent(svg, x, y) {
    //     let formHtml = this.formHTML;
    //     let id = this.id;
    //     this.bubble = svg.append("rect")
    //         .attr("class", "bubbles")
    //         .attr("x", x)
    //         .attr("y", y)
    //         .attr('width', 100)
    //         .attr('height', 100)
    //         .style("fill", "green")
    //         .on('click', function() {
    //             tooltip
    //                 .transition()
    //                 .duration(200)
    //             tooltip
    //                 .style("opacity", 1)
    //                 .html(formHtml)
    //                 .style("left", (d3.mouse(this)[0]+30) + "px")
    //                 .style("top", (d3.mouse(this)[1]+30) + "px")
    //
    //             $("button#hi").on('click', function(){
    //                 d3.select(".tooltip").style("visibility", "hidden");
    //             })
    //         })
    //         // .on("mouse", () => { this.showForm() })
    //         // .on("mouseover", showTooltip)
    //         // .on("mousemove", moveTooltip)
    //         // .on("mouseleave", hideTooltip)
    // }
    //
    // removeComponenet() {
    //     this.bubble.remove();
    // }
    //
    // generateTooltipForm = () => {
    //     // return "<form>" +
    //     //     "<fieldset disabled>" +
    //     //     "<div class='form-group row'>" +
    //     //     "<label class='col-sm-2 col-form-label'>Property</label>" +
    //     //     "<div>" +
    //     //     "<input type='text' disabled class='form-control-plaintext' id='" + this.id + "' value='" + this.prop + "'" +
    //     //     "</div>" +
    //     //     "<div>" +
    //     //     "</fieldset>" +
    //     //     "</form>"
    //
    //     return "<div id='" + this.id + "'>" +
    //                 "<div class='name'>Property: " + this.prop + "</div>" +
    //                 "<div class='type'>Name: " + this.name + "</div>" +
    //                 "<button id='hi'>hi</button>" +
    //            "</div>"
    // }
    //
    //
    // toJson() {
    //     return {
    //         "name": this.name,
    //         "data type": this.type,
    //         "addenda": this.addenda
    //     }
    // }
    //
    // showForm() {
    //     const html = this.generateTooltipForm();
    //
    //     tooltip
    //         .transition()
    //         .duration(200)
    //     tooltip
    //         .style("opacity", 1)
    //         .html(html)
    //         .style("left", (d3.mouse(this)[0]+30) + "px")
    //         .style("top", (d3.mouse(this)[1]+30) + "px")
    // }
}