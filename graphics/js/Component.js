class Component {
    constructor(prop, name, type="", addenda={}) {
        this.prop = prop;
        this.name = name;
        this.type = type;
        this.addenda = addenda;
    }

    toJson() {
        return {
            "name": this.name,
            "data type": this.type,
            "addenda": this.addenda
        }
    }

    dotInPlayground(svg, x, y) {
        svg.append("rect")
            .attr("class", "bubbles")
            .attr("x", x)
            .attr("y", y)
            .attr("width", 100)
            .attr("height", 100)
            .style("fill", "green")
            .on("mouseover", showTooltip)
            .on("mousemove", moveTooltip)
            .on("mouseleave", hideTooltip)
    }
}