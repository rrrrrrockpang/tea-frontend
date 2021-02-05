const dependentVarLst = [];
const independentVarLst = [];

const hypothesisNode = $("[name='text1']");
const dependentVariableNode = $("[name='text2']");
const independentVariableNode = $("[name='text3']"); // conditions
const analysisNode = $("[name=text4]");
const exclusionNode = $("[name=text5]");
const sampleSizeNode = $("[name=text6]");
const otherNode = $("[name=text7]");

const DEPENDENT_PLUGIN_AREA_ID = "dependent_variable_plugin_area";
const DEPENDENT_PLUGIN_AREA_ID_JQUERY_SELECTOR = "#" + DEPENDENT_PLUGIN_AREA_ID;
const DEPENDENT_VARIABLE_BUTTON_ID = "addDependent";
const DEPENDENT_VARIABLE_TEXT_DISPLAY_ID = "dependentText";

const INDEPENDENT_PLUGIN_AREA_ID = "independent_variable_plugin_area";
const INDEPENDENT_PLUGIN_AREA_ID_JQUERY_SELECTOR = "#" + INDEPENDENT_PLUGIN_AREA_ID;
const INDEPENDENT_VARIABLE_BUTTON_ID = "addIndependent";
const INDEPENDENT_VARIABLE_TEXTDISPLAY_ID = "independentText";

const HYPOTHESIS_PLUGIN_AREA_ID = "hypothesis_plugin_area";
const HYPOTHESIS_PLUGIN_AREA_ID_JQUERY_SELECTOR = "#" + HYPOTHESIS_PLUGIN_AREA_ID;
const HYPOTHESIS_BUTTON_ID = "addHypothesis";
const HYPOTHESIS_TEXT_DISPLAY_ID = "hypothesisText";
// Hypothesis we just input text for now.

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