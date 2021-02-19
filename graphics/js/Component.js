class Component {
    constructor(prop, name, type="", addenda={}) {
        this.prop = prop;
        this.name = name;
        this.type = type;
        this.addenda = addenda;
        this.bubble = null;
    }

    toJson() {
        return {
            "name": this.name,
            "data type": this.type,
            "addenda": this.addenda
        }
    }

    dotInPlayground(svg, x, y) {
        this.bubble = svg.append("circle")
            .attr("class", "bubbles")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 100 )
            .style("fill", "green")
            .on("mouseover", showTooltip)
            .on("mousemove", moveTooltip)
            .on("mouseleave", hideTooltip)
    }

    removeBubble(svg) {
        this.bubble.remove();
    }
}