/* Need to use variable.js, setting.js */
const handleDependentVariable = (event) => {
    console.log("handleDependentVariable Called");
    const parentContainerNode = $(event.target).parent();
    const pluginContainerNode = $("<div>", {id: DEPENDENT_PLUGIN_AREA_ID, class: "plugin"});
    parentContainerNode.css(FORM_GROUP_CONTAINER_CSS);
    addPlugin(parentContainerNode, pluginContainerNode,
        {"button": DEPENDENT_VARIABLE_BUTTON_ID, "textdisplay": DEPENDENT_VARIABLE_TEXT_DISPLAY_ID});
}

const handleIndependentVariable = (event) => {
    console.log("handleDIndependentVariable Called");
    const parentContainerNode = $(event.target).parent();
    const pluginContainerNode = $("<div>", {id: INDEPENDENT_PLUGIN_AREA_ID, class: "plugin"});
    parentContainerNode.css(FORM_GROUP_CONTAINER_CSS);
    addPlugin(parentContainerNode, pluginContainerNode,
        {"button": INDEPENDENT_VARIABLE_BUTTON_ID, "textdisplay": INDEPENDENT_VARIABLE_TEXTDISPLAY_ID});
}

const handleHypothesis = (event) => {
    console.log("handleHypothesis Called");
    const parentContainerNode = $(event.target).parent();
    const pluginContainerNode = $("<div>", {id: HYPOTHESIS_PLUGIN_AREA_ID, class: "plugin"});
    addPlugin(parentContainerNode, pluginContainerNode,
        {"textarea": HYPOTHESIS_TEXT_DISPLAY_ID})
}

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