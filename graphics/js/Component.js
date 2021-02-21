class Component {
    constructor(prop, name, type="", addenda={}) {
        this.prop = prop;
        this.name = name;
        this.id = this.prop + "_" + this.name;
        this.type = type;
        this.addenda = addenda;
        this.componentNode = null;
        // this.formHTML = this.generateTooltipForm();
    }

    addComponent(div) {
        this.componentNode = $("<div id='" + this.id + "' class='component'></div>");
        div.append(this.componentNode);
    }

    removeComponent() {
        this.componentNode.remove();
    }

    showToolTipForm() {
        console.log("???")
        console.log(this.componentNode);

        this.componentNode.popover(POPOVER_EFFECT);
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