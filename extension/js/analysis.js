const ANALYSIS_ID = "analysis";
const ANALYSIS_PLUGIN_ID = ANALYSIS_ID + "_preregistea";
const ANALYSIS_BTN_ID = ANALYSIS_ID + "_initial_btn";
const ANALYSIS_TEXTAREA_NODE = $("[name='text4']");
const ANALYSIS_PARENT_SECTION = ANALYSIS_TEXTAREA_NODE.parent().parent().parent();

const ANALYSIS_DESCRIPTION =
    "In this section, you need to select the dependent variable and conditions that you input previously. " +
    "You need to 'generate a hypothesis', and Preregistea will automatically generates the hypothesis and text afterward."

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

    if(pair['dv'] !== '' && pair['iv'] !== '') {
        updateHypothesisFormArea(pair, inputArea);
    } else {
        inputArea.append("Please choose one dependent variable and a condition.");
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
                hypothesisPair['dv'] = '';
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
                hypothesisPair['iv'] = '';
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
        updateTeaCodeHypothesis(iv, dv, relationship);
        updateAnalysisTextArea(iv, dv, relationship);
    })
    inputArea.append(hypothesisFormArea);
    inputArea.append(apiBtn);
}

const updateAnalysisTextArea = (iv, dv, relationship) => {
    const original = ANALYSIS_TEXTAREA_NODE.val();
    let newText = (original !== 0) ? "\n" : "";
    const hypothesis_number = report.hypothesis.length;
    if(iv.type === "nominal") {
        let compare;
        if(relationship["two-side"] === "same") compare = "same as";
        else if(relationship["two-side"] === true) compare = "greater than";
        else if(relationship["two-side"] === false) compare = "different from";
        newText += `H${hypothesis_number}: The median value of ${dv.display_name} in ${iv.categories[0]} group will be ${compare} than that in ${iv.categories[1]}. `;
    } else {
        // TODO: Add this
    }

    if(iv.study_design === "within") {
        newText += `We will analyze this hypothesis with Wilcoxon signed-rank test. See the reproducible Tea code for analysis.`
    } else {
        newText += `We will analyze this hypothesis with Mann-Whitney U test. See the reproducible Tea code for analysis.`
    }

    newText += "\n";

    ANALYSIS_TEXTAREA_NODE.val(original + newText);
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

    template.find(".iv-group-custom-select-1").append(categoryOptions);
    template.find(".iv-group-custom-select-2").append(categoryOptions2);

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





