const ANALYSIS_ID = "analysis";
const ANALYSIS_PLUGIN_ID = ANALYSIS_ID + "_preregistea";
const ANALYSIS_BTN_ID = ANALYSIS_ID + "_initial_btn";
const ANALYSIS_TEXTAREA_NODE = $("[name='text4']");
const ANALYSIS_PARENT_SECTION = ANALYSIS_TEXTAREA_NODE.parent().parent().parent();

const ANALYSIS_DESCRIPTION =
    "Specify Hypotheses between dependent and independent Variables by clicking the variables of your interest."

hypothesisPairListener = {
    pInternal: hypothesisPair,
    pListener: function (val) {},
    set pair(val) {
        this.pInternal = val;
        this.pListener(val);
    },
    get pair() {
        return this.pInternal;
    },
    registerListener: function (listener) {
        this.pListener = listener;
    }
}

hypothesisPairListener.registerListener(function(pair) {
    const inputArea = $(`#analysis_preregistea .inputarea`);
    inputArea.empty();

    if(pair['dv'] !== null && pair['iv'] !== null) {
        updateHypothesisFormArea(pair, inputArea);
    } else {
        inputArea.append("Please choose a dependent variable and a condition.");
    }
})

/////////// Layout Code ///////////

const addAnalysisPreregistea = () => {
    const preregistea = createPreregisteaForm(ANALYSIS_PLUGIN_ID, ANALYSIS_DESCRIPTION);
    preregistea.append(addArrow());
    ANALYSIS_PARENT_SECTION.prepend(preregistea);
    preregistea.hide();

    const displayArea = preregistea.find(".displayarea");
    const container = createAnalysisTwoColumnsForm();
    displayArea.append(container);

}

const updateVariableInAnalysis = (displayarea, variables) => {
    let cards = [];
    console.log(variables);
    console.log(displayarea[0].outerHTML)

    for(let i = 0; i < variables.length; i++) {
        const card = addHypothesisCard(variables[i].display_name, variables[i].card_id);
        card.on("click", function() {
            addHypothesisCardEventListener(card, variables[i]);
        })
        cards.push(card);
    }

    displayarea.html(cards);
}

const addHypothesisCardEventListener = (card, variable) => {
    card.css("background", "grey");

    if(variable.section === DEPENDENT_VARIABLE_ID) {
        if(analysisDVClicked) {
            analysisDVElement.css("background", "none");
            if(analysisDV.name === variable.name) {
                analysisDVClicked = false;
                analysisDVElement = null;
                analysisDV = null;
                hypothesisPair['dv'] = null;
            } else {
                analysisDVClicked = true;
                analysisDVElement = card;
                analysisDV = variable;
                hypothesisPair['dv'] = analysisDV;
            }
        } else {
            analysisDVClicked = true;
            analysisDVElement = card;
            analysisDV = variable;
            hypothesisPair['dv'] = analysisDV;
        }
        hypothesisPairListener.pair = hypothesisPair;
    } else {
        if(analysisConditionClicked) {
            analysisConditionElement.css("background", "none");
            if(analysisCondition.name === variable.name) {
                analysisConditionClicked = false;
                analysisConditionElement = null;
                analysisCondition = null;
                hypothesisPair['iv'] = null;
            } else {
                analysisConditionClicked = true;
                analysisConditionElement = card;
                analysisCondition = variable;
                hypothesisPair['iv'] = analysisCondition;
            }
        } else {
            analysisConditionClicked = true;
            analysisConditionElement = card;
            analysisCondition = variable;
            hypothesisPair['iv'] = analysisCondition;
        }
        hypothesisPairListener.pair = hypothesisPair;
    }
}

const updateHypothesisFormArea = (pair, inputArea) => {
    let dv = hypothesisPair['dv'];
    let iv = hypothesisPair['iv'];
    let hypothesisFormArea;
    if(iv.type === 'nominal') hypothesisFormArea = createHypothesisConditionIsNominal(dv, iv);
    else hypothesisFormArea = createHypothesisConditionIsNotNominal(dv, iv);

    // This is so important!
    const apiBtn = $("<button type='button' class='btn btn-success submit'>Generate a Hypothesis</button>");
    apiBtn.on("click", function() {
        const conditionType = iv.type;
        let relationship;
        if(conditionType === "nominal") {
            let two_side = false;
            const selected = $(".two-side").find(":selected").val();
            if(selected === 'different') {
                two_side = true;
            } else if (selected === "same") {
                two_side = "same";
            }

            let cat1 = $(`.iv-group-custom-select-1 option:selected`).val();
            let cat2 = $('.iv-group-custom-select-2 option:selected').val();
            if(selected === 'less') {
                let temp = cat2;
                cat2 = cat1;
                cat1 = temp;
            }
            relationship = {
                'condition_type': 'nominal',
                'two-side': two_side,
                'categories': [cat1, cat2]
            }
        } else {
            let positive = false;
            let posNeg = $('.positive-negative option:selected').val();
            if(posNeg) positive = true;
            relationship = {
                'condition_type' : conditionType,
                'positive': positive
            }
        }
        console.log(relationship)
        updateTeaCodeHypothesis(iv, dv, relationship);
        updateAnalysisTextArea(iv, dv, relationship);
    })
    inputArea.append(hypothesisFormArea);
    inputArea.append(apiBtn);
}

const updateAnalysisTextArea = () => {
    let newText = "";

    for(let i = 0; i < report.hypothesis.length; i++) {
        const iv = report.hypothesis[i][0][0], dv = report.hypothesis[i][0][1];

        if(iv.type === 'nominal') {
            let compare;
            if(report.hypothesis[i][1][0] === "!=") compare = "different from";
            else if(report.hypothesis[i][1][0] === ">") compare = "greater than";
            else compare = "same as";

            newText += `H${i}: The median value of ${dv.display_name} in ${report.hypothesis[i][1][1]} group will be ${compare} than that in ${report.hypothesis[i][1][2]}. `;

            if(iv.study_design === "within") {
                newText += `We will analyze this hypothesis with Wilcoxon signed-rank test. See the reproducible Tea code for analysis.`
            } else {
                newText += `We will analyze this hypothesis with Mann-Whitney U test. See the reproducible Tea code for analysis.`
            }
        } else {
            const pos = report.hypothesis[i][1][0];
            if(pos === "~") {
                newText += `H${i}: The greater value of ${iv.display_name} will lead to greater value of ${dv.display_name}.`;
            } else {
                newText += `H${i}: The greater value of ${iv.display_name} will lead to less value of ${dv.display_name}.`;
            }

            newText += `We will analyze this hypothesis with a linear regression model. See the reproducible Tea code for anlaysis. `
        }
        newText += "\n";
    }

    ANALYSIS_TEXTAREA_NODE.val(newText);
}

const createHypothesisConditionIsNominal = (dv, iv) => {
    const template = $(`<form class='hypothesis_display_form'>
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Hypothesis:
                        <div class="form-inline">
                            <label>The median value of</label>
                            <label class="dv-in-form"></label>
                            <label>in</label>
                            <select class="iv-group-custom-select-1">
                            </select>
                            <label>group will be</label>
                            <select class="custom-select two-side">
                                <option value="greater">greater than</option>
                                <option value="less">less than</option>
                                <option value="different">different from</option>
                                <option value="same">same as</option>
                            </select>
                            <label>that in</label>
                            <select class="iv-group-custom-select-2">
                            </select>
                        </div>
                    </div>
                </form>`);

    template.find(".dv-in-form").append(dv.name);
    let categoryOptions = [];
    let categoryOptions2 = [];
    for(let i = 0; i < iv.categories.length; i++) {
        const option = $(`<option value="${iv.categories[i]}">${iv.categories[i]}</option>`);
        categoryOptions.push(option);
        categoryOptions2.push(option.clone());
    }

    categoryOptions[0].prop("selected", true);
    categoryOptions2[1].prop("selected", true);

    template.find(".iv-group-custom-select-1").html(categoryOptions);
    template.find(".iv-group-custom-select-2").html(categoryOptions2);

    return template;
}

const createHypothesisConditionIsNotNominal = (dv, iv) => {
    const template = $(`
                <form class='hypothesis_display_form'>
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Hypothesis:
                        <div class="form-inline" style="display: inline-block;">
                            <label>The greater value of</label>
                            <label class="iv-in-form mr-sm-2"></label>
                            <label>will lead to</label>
                            <select class="custom-select positive-negative">
                                <option value="greater" selected>greater</option>
                                <option value="less">less</option>
                                <option value="different">different</option>
                                <option value="same">the same</option>
                            </select>
                            <label class="dv-in-form"></label>
                        </div>
                    </div>
                </form>
            `);
    template.find(".dv-in-form").append(dv.name);
    template.find(".iv-in-form").append(iv.name);
    return template;
}

const addHypothesisCard = (text, id) => {
    return $(`
        <div class="hypothesis-card" id="${id}">
            <p>${text}</p>
        </div>
    `);
}


const createAnalysisTwoColumnsForm = () => {
    return $(`<div class='container'>
                <div class="row">
                    <div class="col-xs-6">
                        <p style="text-align: center">Dependent Variables</p>
                        <div class="hypothesis-dv"></div>
                    </div>
                    <div class="col-xs-6">
                        <p style="text-align: center">Independent Variables</p>
                        <div class="hypothesis-iv"></div>
                    </div>
                </div>
            </div>`);
}





