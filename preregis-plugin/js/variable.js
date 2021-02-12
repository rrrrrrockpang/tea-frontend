const dependentVarLst = [];
const independentVarLst = [];

const hypothesisTextAreaNode = $("[name='text1']");
const dependentVariableTextAreaNode = $("[name='text2']");
const independentVariableTextAreaNode = $("[name='text3']"); // conditions
const analysisTextAreaNode = $("[name=text4]");
const exclusionTextAreaNode = $("[name=text5]");
const sampleSizeTextAreaNode = $("[name=text6]");
const otherNodeTextArea = $("[name=text7]");

const hypothesisSectionNode = hypothesisTextAreaNode.parent().parent();
const dependentVariableSectionNode = dependentVariableTextAreaNode.parent().parent();
const independentVariableSectionNode = independentVariableTextAreaNode.parent().parent();
const analysisSectionNode = analysisTextAreaNode.parent().parent();

const DEPENDENT_PLUGIN_AREA_ID = "dependent_variable_plugin_area";
const DEPENDENT_PLUGIN_AREA_ID_JQUERY_SELECTOR = "#" + DEPENDENT_PLUGIN_AREA_ID;
const DEPENDENT_VARIABLE_BUTTON_ID = "dependent_variable_button";
const DEPENDENT_VARIABLE_TEXT_DISPLAY_ID = "dependent_variable_text_display";

const INDEPENDENT_PLUGIN_AREA_ID = "independent_variable_plugin_area";
const INDEPENDENT_PLUGIN_AREA_ID_JQUERY_SELECTOR = "#" + INDEPENDENT_PLUGIN_AREA_ID;
const INDEPENDENT_VARIABLE_BUTTON_ID = "independent_variable_button";
const INDEPENDENT_VARIABLE_TEXTDISPLAY_ID = "independent_variable_text_display";

const HYPOTHESIS_PLUGIN_AREA_ID = "hypothesis_plugin_area";
const HYPOTHESIS_PLUGIN_AREA_ID_JQUERY_SELECTOR = "#" + HYPOTHESIS_PLUGIN_AREA_ID;
const HYPOTHESIS_BUTTON_ID = "addHypothesis";
const HYPOTHESIS_TEXT_DISPLAY_ID = "hypothesisText";
// Hypothesis we just input text for now.

