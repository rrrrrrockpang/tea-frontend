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
    parentContainerNode.css(FORM_GROUP_CONTAINER_CSS);
    addPlugin(parentContainerNode, pluginContainerNode,
        {"textarea": HYPOTHESIS_TEXT_DISPLAY_ID});
}

const handleAnalysis = (event) => {
    console.log("handleAnalysis Called.");
    const parentContainerNode = $(event.target).parent();
    const pluginContainerNode = $("<div>", {id: ANALYSIS_PLUGIN_AREA_ID, class: "plugin"});
    parentContainerNode.css(FORM_GROUP_CONTAINER_CSS);
    addPlugin(parentContainerNode, pluginContainerNode,
        {"button2": ANALYSIS_BUTTON_ID});
}


const handleVariable = () => {
    $("#addDependent").off().on("click", function(){
      addVariable("dependent");
    });

    $("#addIndependent").off().on("click", function(){
      addVariable("independent");
    });
}

const handleModal = () => {
    $('.modal').off().on('hidden.bs.modal', function() {
      $(this).find('#variable-form').trigger("reset");
      $(this).find('#variableInformationLabel').empty();
    }) ;
}

const handleGetAnalysisResult = () => {
    $("#" + ANALYSIS_BUTTON_ID).off().on("click", function() {
        const study_type = "experiment"; //$("input[name='studyLabel']:checked").val();
        const hypothesis = "['condition', 'wtp_final'], ['condition: SE > SD']";//$("#hypothesisInput").val();

        postRequest(study_type, dependentVarLst, independentVarLst, hypothesis).then(res => {
            console.log(res);
        });
    })
}