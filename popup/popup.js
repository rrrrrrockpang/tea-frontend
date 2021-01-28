class Study {
  constructor() {
    this.design = "experiment";
    this.independent_var = [];
    this.dependent_var = [];
    this.hypothesis = [];
  }

  getIV(){
    return this.design;
  }
}

class Variable {
  constructor() {
    this.type = "nominal";
    this.name = "abc";
  }

  setVar(type, name) {
    this.type = type;
    this.name = name;
  }

  getVar() {
    return "Var: " + this.name + "; Type: " + this.type;
  }
}

// let study = new Study();
// let variable = new Variable();
// console.log(variable.getVar());
// document.write(study.getIV());

let addIndependentVariable = () => {
  let variable = new Variable();
  variable.setVar("ordinal", "independent Variable a");
  console.log("This is good");
  $("#independentText").append(variable.getVar());
}

document.getElementById("dependentID").onclick = addIndependentVariable;

$(document).ready(function(){
    $('.modal').modal('show');
});
