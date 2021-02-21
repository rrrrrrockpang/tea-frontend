var tooltip = d3.select("#playground")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white")

var showTooltip = function(hi) {
    tooltip
        .transition()
        .duration(200)
    tooltip
        .style("opacity", 1)
        .html(hi)
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