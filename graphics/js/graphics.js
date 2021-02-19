var svg = d3.select("#playground").append("svg").attr("width", 600).attr("height", 600);
const component = new Component("example", "example1");
component.dotInPlayground(svg, 100, 100);
const component2 = new Component("hi", "2");
component2.dotInPlayground(svg, 200, 200);

