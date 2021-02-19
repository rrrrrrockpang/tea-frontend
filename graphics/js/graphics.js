
var svg = d3.select("#playground").append("svg").attr("width", 600).attr("height", 600);
const component = new Component("example", "example1");
component.dotInPlayground(svg, 100, 100);


// svg.append('circle')
//     .attr('cx', 10)
//     .attr('cy', 10)
//     .attr('r', 50)
//     .attr('stroke', 'black')
//     .attr('fill', '#69a3b2')