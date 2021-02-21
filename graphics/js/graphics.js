// var svg = d3.select("#playground").append("svg").attr("width", 600).attr("height", 600);
var svg = $("#playground").height("600px").width("600px");
const component = new Component("example", "example1");
component.addComponent(svg, 100, 100);
const component2 = new Component("hi", "2");
component2.addComponent(svg, 200, 200);

component2.showToolTipForm();

$("#gg").popover(POPOVER_EFFECT);
console.log($("#gg"))

