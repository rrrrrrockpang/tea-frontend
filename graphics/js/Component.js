class Component {
    constructor(prop, name, type="", addenda={}) {
        this.prop = prop;
        this.name = name;
        this.type = type;
        this.addenda = addenda;
        this.bubble = null;
        this.formHTML = this.generateTooltipForm();
    }

    addComponent(svg, x, y) {
        this.bubble = svg.append("rect")
            .attr("class", "bubbles")
            .attr("x", x)
            .attr("y", y)
            .attr('width', 100)
            .attr('height', 100)
            .style("fill", "green")
            .on("mouseover", () => {
                this.showTooltip(this.formHTML)
            })
            .on("mousemove", moveTooltip)
            .on("mouseleave", hideTooltip)
    }

    removeComponenet() {
        this.bubble.remove();
    }

    generateTooltipForm = () => {
        return "<div id='" + this.prop + '_' + this.name + "'>" +
            "<div class='name'>Property: " + this.prop + "</div>" +
            "<div class='type'>Name: " + this.name + "</div>" +
            "</div>"
    }


    toJson() {
        return {
            "name": this.name,
            "data type": this.type,
            "addenda": this.addenda
        }
    }

    showTooltip(text) {
        tooltip
            .transition()
            .duration(200)

        tooltip
            .style("opacity", 1)
            .html(text)
            .style("left", (d3.mouse(this)[0]+30) + "px")
            .style("top", (d3.mouse(this)[1]+30) + "px")
    }
}