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
//    this.addenda = {};
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

  toJSON() {
    return {
        "name": this.name,
        "data type": this.type,
    }
  }
}

const dependentVarLst = [];
const independentVarLst = [];

const addVarToLst = (dependentOrIndependent) => {
    let variable = new Variable();
    let name = $("#variable-name").val();
    let type = $("#variable-form input[type='radio']:checked").val();
    variable.setVar(type, name);

    if(dependentOrIndependent === "dependent") {
        dependentVarLst.push(variable.toJSON());
        console.log(dependentVarLst);
    } else if (dependentOrIndependent === "independent") {
        independentVarLst.push(variable.toJSON());
        console.log(independentVarLst);
    }

    let selector = "#" + dependentOrIndependent + "Text";
    $(selector).append(variable.toString());
    $(".modal").modal("hide");
}

const postRequest = async (study_type, dependentVarLst, independentVarLst, hypothesis) => {
  const setting = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'study_type': study_type,
      'dependent_variables': dependentVarLst,
      'independent_variables': independentVarLst,
      'hypothesis': hypothesis
    })
  };

  try {
    const response = await fetch('http://127.0.0.1:5000/submit', setting);
    const status = await response.status();
    console.log(status);
    return status;
  } catch(e) {
    return e;
  }
};

const submitForm = () => {
    const study_type = $("input[name='studyLabel']:checked").val();
    const hypothesis = $("#hypothesisInput").val();

    postRequest(study_type, dependentVarLst, independentVarLst, hypothesis);
}

let addVariable = (dependentOrIndependent) => {
  $("#variableInformationLabel").append(dependentOrIndependent);
  $("#variableBtn").off().on("click", function(){
    addVarToLst(dependentOrIndependent);
  })
}

$("#addDependent").off().on("click", function(){
  addVariable("dependent");

});

$("#addIndependent").off().on("click", function(){
  addVariable("independent");
});

$("#formBtn").off().on("click", function() {
  submitForm();
})

$(document).ready(function() {
  $('.modal').off().on('hidden.bs.modal', function(e)
  {
      $(this).find('#variable-form').trigger("reset");
      $(this).find('#variableInformationLabel').empty();
  }) ;
})


/*
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

  if(dependentOrIndependent === "dependent") {
    dependentVarLst.push(variable.name);
  }

  console.log(dependentVarLst);

//  postVariable(dependentOrIndependent, variable.getType(), variable.getName());
}

let addVariable = (dependentOrIndependent) => {
  $("#variableInformationLabel").append(dependentOrIndependent);
  $("#variableBtn").off().on("click", function(){
    populateVariable(dependentOrIndependent);
  })
}

*/

