const ANALYSIS_ID = "analysis";
const ANALYSIS_PLUGIN_ID = ANALYSIS_ID + "_preregistea";
const ANALYSIS_BTN_ID = ANALYSIS_ID + "_initial_btn";
const ANALYSIS_TEXTAREA_NODE = $("[name='text4']");
const ANALYSIS_PARENT_SECTION = ANALYSIS_TEXTAREA_NODE.parent().parent().parent();

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
    const preregistea = createPreregisteaForm(ANALYSIS_PLUGIN_ID);
    ANALYSIS_PARENT_SECTION.prepend(preregistea);

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
    })
    inputArea.append(hypothesisFormArea);
    inputArea.append(apiBtn);
}

const createHypothesisConditionIsNominal = (dv, iv) => {
    const template = $(`<form class='hypothesis_display_form'>
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Hypothesis:
                        <div class="form-inline">
                            <label>The mean value of</label>
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
        <div class="variable-card" id="${id}" style="text-align: center" style="border: solid black">
            <p>${text}</p>
        </div>
    `);
}


const createAnalysisTwoColumnsForm = () => {
    return $(`<div class='container'>
                <div class="row">
                    <div class="col-xs-6 hypothesis-dv" style="border:teal">
                    </div>
                    <div class="col-xs-6 hypothesis-iv">
                    </div>
                </div>
            </div>`);
}





