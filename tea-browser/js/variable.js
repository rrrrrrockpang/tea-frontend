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

