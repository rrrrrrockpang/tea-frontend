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

  getType() {
    return this.type;
  }

  getName() {
    return this.name;
  }

  toString() {
    return "Var: " + this.name + "; Type: " + this.type;
  }
}

postVariable = async (dependentOrIndependent, type, name) => {
  const setting = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: type,
      name: name,
      variable: dependentOrIndependent
    }),
  };

  try {
    const response = await fetch('http://127.0.0.1:5000/', setting);
    const status = await response.status();
    console.log(status);
    return status;
  } catch(e) {
    return e
  }
}

let populateVariable = (dependentOrIndependent) => {
  let variable = new Variable();
  let name = $("#variable-name").val();
  let type = $("#variable-form input[type='radio']:checked").val();
  variable.setVar(type, name);
  let selector = "#" + dependentOrIndependent + "Text";
  $(selector).append(variable.toString());
  $(".modal").modal("hide");

  postVariable(dependentOrIndependent, variable.getType(), variable.getName());
}

let addVariable = (dependentOrIndependent) => {
  $("#variableInformationLabel").append(dependentOrIndependent);
  $("#variableBtn").off().on("click", function(){
    populateVariable(dependentOrIndependent);
  })
}

$("#addDependent").off().on("click", function(){
  addVariable("dependent");
});

$("#addIndependent").off().on("click", function(){
  addVariable("independent");
});

$(document).ready(function() {
  $('.modal').off().on('hidden.bs.modal', function(e)
  { 
      $(this).find('#variable-form').trigger("reset");
      $(this).find('#variableInformationLabel').empty();
  }) ;
})

