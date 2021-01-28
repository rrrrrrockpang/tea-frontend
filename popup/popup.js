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


let addIndependentVariable = (e) => {
  let variable = new Variable();
  let name = $("#variable-name").val();
  let type = $("#variable-form input[type='radio']:checked").val();
  variable.setVar(type, name);
  console.log("This is good");
  console.log(variable.getVar());
  $("#independentText").append(variable.getVar());

  $(".modal").modal("hide");
}

$("#variableBtn").on("click", addIndependentVariable);



$(document).ready(function() {
  $('.modal').on('hidden.bs.modal', function(e)
  { 
      $(this).find('form').trigger('reset');
  }) ;
})