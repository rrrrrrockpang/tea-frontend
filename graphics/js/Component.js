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
        var tooltip = d3.select("#playground")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "black")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("color", "white")


        var showTooltip = function(d) {
            tooltip
                .transition()
                .duration(200)
            tooltip
                .style("opacity", 1)
                .html("hi")
                .style("left", (d3.mouse(this)[0]+30) + "px")
                .style("top", (d3.mouse(this)[1]+30) + "px")
        }
        var moveTooltip = function(d) {
            tooltip
                .style("left", (d3.mouse(this)[0]+30) + "px")
                .style("top", (d3.mouse(this)[1]+30) + "px")
        }
        var hideTooltip = function(d) {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0)
        }
        svg.append("circle")
            .attr("class", "bubbles")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 100 )
            .style("fill", "green")
            // -3- Trigger the functions
            .on("mouseover", showTooltip )
            .on("mousemove", moveTooltip )
            .on("mouseleave", hideTooltip )

        // svg.append('circle')
        //     .attr('cx', x)
        //     .attr('cy', y)
        //     .attr('r', 50)
        //     .attr('stroke', 'black')
        //     .attr('fill', '#69a3b2')
        //     .on("mouseover", showTooltip)
        //     .on("mousemove", moveTooltip)
        //     .on("hideTooltip", hideTooltip)
    }
}