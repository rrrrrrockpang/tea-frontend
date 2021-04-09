const updateTeaCodeVariables = () => {
    let variables = [];
    let dv_study_design = [];
    let iv_study_design = [];

    updateVariableLst(dependent_variables, variables, dv_study_design);
    updateVariableLst(conditions, variables, iv_study_design);

    teaCode["variables"] = variables;
    teaCode["study_design"]["independent variables"] = iv_study_design;
    teaCode["study_design"]["dependent variables"] = dv_study_design;
}

const updateMethodSection = () => {
    report.design.dependent = dependent_variables
    report.design.independent = conditions

    for(let i = 0; i < conditions.length; i++) {
        if(conditions[i].study_design === "within") {
            report.design.within = true;
            if(!report.design.analysis.includes("Wilcoxon signed-rank test")){
                report.design.analysis.push("Wilcoxon signed-rank test");
            }
        } else {
            report.design.between = true;
            if(!report.design.analysis.includes("Mann-Whitney U-test")) {
                report.design.analysis.push("Mann-Whitney U-test");
            }
        }
    }

    // report.construct = constructObject.display_name;

    report.participants.number = studySampleSize;
    report.participants.alpha = 0.05;
    report.participants.effectSize = studyEffectSize;

    // report.hypothesis = teaCode["hypothesis"];
    report.exclusion = $("[name='text5']").val();
}

const updateTeaCodeHypothesis = (iv, dv, relationship) => {
    const report_hypothesis = [];
    const condition_type = relationship['condition_type'];
    let hypothesis = [];



    hypothesis.push([iv.name, dv.name]);
    report_hypothesis.push([iv, dv]);

    if(condition_type === "nominal" || condition_type === "ordinal") {
        const two_side = relationship['two-side'];
        const categories = relationship['categories'];
        if(categories.length !== 2) console.error("Has to compare 2 categories.");

        if(two_side === true) {
            hypothesis.push([`${iv.name}: ${categories[0]} != ${categories[1]}`]);
            report_hypothesis.push(['!=', categories[0], categories[1]])
        } else if(two_side === false) {
            hypothesis.push([`${iv.name}: ${categories[0]} > ${categories[1]}`]);
            report_hypothesis.push(['>', categories[0], categories[1]])
        } else {
            hypothesis.push([`${iv.name}: ${categories[0]} = ${categories[1]}`]);
            report_hypothesis.push(['=', categories[0], categories[1]])
        }
    } else {
        const positive = relationship['positive'];
        if(positive) {
            hypothesis.push([`${iv.name} ~ ${dv.name}`]);
            report_hypothesis.push(['~'])
        } else {
            hypothesis.push([`${iv.name} ~ -${dv.name}`]);
            report_hypothesis.push([`-~`])
        }
    }
    teaCode["hypothesis"].push(hypothesis);
    report.hypothesis.push(report_hypothesis);
}

const updateVariableLst = (dvOrIv, variableTea, studyDesignVar) => {
    for (let i = 0; i < dvOrIv.length; i++) {
        const di = dvOrIv[i];
        let variable = {
            "name": di.name,
            "data type": di.type,
        };

        if (di.type === "nominal" || di.type === "ordinal") {
            variable["categories"] = di.categories;
        }
        variableTea.push(variable);
        studyDesignVar.push(di.name);
    }
}

const stringifyTeaCode = () => {
    let finalString = "";
    const v = teaCode["variables"];
    const vString = `variables = ${JSON.stringify(v, null, '\t')}\n`
    finalString += vString + `tea.define_variables(variables)\n\n`;

    const s = teaCode["study_design"];
    const sString = `study_design = ${JSON.stringify(s, null, '\t')} \n`
    finalString += sString + `tea.define_study_design(study_design) \n\n`

    const hs = teaCode["hypothesis"];
    let hString = "";
    for (let i = 0; i < hs.length; i++) {
        const h = hs[i];
        hString += `tea.hypothesize(${JSON.stringify(h[0])}, ${JSON.stringify(h[1])}) \n`
    }

    finalString += hString + "\n";

    return finalString
}

let reportText = "", RCode = "", pythonCode = "", teaAPICode;

const stringifyMethodSection = () => {
    let study_design;
    if(report.design.within && report.design.between) study_design = "mixed factorial";
    else if(report.design.within) study_design = "within-subjects";
    else if(report.design.between) study_design = "between-subjects";

    let independent, cat1, cat2, catlength;
    if(typeof report.design.independent[0] === "undefined") {
        independent = "<u>independent variable</u>";
        cat1 = "<u>category 1</u>";
        cat2 = "<u>category 2</u>";
        catlength = "<u>Number of categories</u>"
    } else {
        independent = report.design.independent[0].display_name;
        cat1 = report.design.independent[0].categories[0];
        cat2 = report.design.independent[0].categories[1];
        catlength = report.design.independent[0].categories.length;
    }

    console.log(report)

    const construct = (constructObject === null) ? "<u>conceptual construct your dependent variable measures</u>" : constructObject.display_name;
    const analysis = (report.design.analysis === 0) ? "<u>Preregistea will determine the statistical tests for you after filling out the form</u>" : report.design.analysis;
    const dependent = (typeof report.design.dependent[0] === "undefined") ? "<u>dependent variable</u>" : report.design.dependent[0].display_name;

    let experiment_design = `<h3><b>Study Design</b></h3><br>To understand different ${independent} impact ${construct}, we ` +
        `designed a ${study_design} study. We considered the ${dependent} indicating the ${construct}.` +
        `To measure the ${dependent}, we have users conduct <u>(you can add detailed experimental procedure here)</u>. Participants were assigned to one of `+
        `the ${catlength} conditions: 1) ${cat1}, and ${cat2}.<br>` +
        `<br>` +
        `Before running the experiment, we formulated and preregistered the following hypotheses.<br><br>`;

    let hypothesisText = "";

    const hypothesis_from_tea = teaCode["hypothesis"];

    if(hypothesis_from_tea.length === 0) hypothesisText += "<u>Please specify any hypothesis in Preregistea</u>"
    for(let i = 0; i < hypothesis_from_tea.length; i++) {
        const dv = hypothesis_from_tea[i][0][1];
        const iv = hypothesis_from_tea[i][0][0];
        const compare = hypothesis_from_tea[i][1][0];

        if(compare.includes("!=")) {
            let cat1 = compare.substring(compare.indexOf(": ") + 2, compare.indexOf(" !="));
            let cat2 = compare.substring(compare.indexOf("!=" + 3));
            hypothesisText += `<b>H${i+1}</b>: Participants in the ${cat1} conditions will result in different ${dv} than participants in the ${cat2} condition.<br>`;
        } else if (compare.includes(">")) {
            let cat1 = compare.substring(compare.indexOf(": ") + 2, compare.indexOf(" >"));
            let cat2 = compare.substring(compare.indexOf(">" + 3));
            hypothesisText += `<b>H${i+1}</b>: Participants in the ${cat1} conditions will result in higher mean value of ${dv} than the participants in the ${cat2} condition.<br>`;
        } else {
            let cat1 = compare.substring(compare.indexOf(": ") + 2, compare.indexOf(" ="));
            let cat2 = compare.substring(compare.indexOf("=" + 3));
            hypothesisText += `<b>H${i+1}</b>: Participants in the ${cat1} conditions will result in similar ${dv} than the participants in the ${cat2} condition.<br>`;
        }
    }

    experiment_design += hypothesisText + "<br>";

    experiment_design += `<br>We will analyze the hypothesis above with `;
    if(analysis.length > 1) {
        experiment_design += "the Wilcoxon signed-rank test and the Mann-Whitney U Test. "
    } else {
        experiment_design += `the ${analysis[0]}. `;
    }

    experiment_design += `The statistical analysis code can be reproduced by the Tea.`

    experiment_design += `<h3><b>Participants</b></h3><br>`;

    // const effectSize = (report.participants.effectSize === null) ? "<u>effect size</u>" : report.participants.effectSize;
    // const number = (report.participants.number) ? "<u>sample size</u>" : report.participants.number;

    experiment_design += `A prospective power analysis was performed for sample size determination based on Cohen's conventional effect size ` +
        `d = ${studyEffectSize}. We achieved at least 0.8 under &#945; = 0.05 within ${studySampleSize} participants per condition.`

    return experiment_design
}

const INDEPENDENT_T_TEST = "independent-samples t-test",
    MANNWHITNEY_U_TEST = "Mann-Whitney U test",
    ONEWAY_ANOVA = "One-way ANOVA",
    KRUSKAL_WALLIS_TEST = "Kruskal-Wallis test",
    PAIRED_SAMPLES_T_TEST = "Paired-samples t-test",
    WILCOXON_SIGNED_RANK_TEST = "Wilcoxon signed-rank test",
    ONE_WAY_REPEATED_MEASURES_ANOVA = "One-way repeated measures ANOVA",
    FRIEDMAN_TEST = "Friedman test",
    FACTORIAL_ANOVA = "Factorial ANOVA",
    GLM = "Generalized Linear Models",
    LLM = "Linear Mixed Models",
    GLMM = "Generalized Linear Mixed Models"

const INDEPENDENT_T_TEST_RATIONALE = "INDEPENDENT_T_TEST RATIONALE",
    MANNWHITNEY_U_TEST_RATIONALE = "MANNWHITNEY_U_TEST RATIONALE",
    ONEWAY_ANOVA_RATIONALE = "One-way ANOVA",
    KRUSKAL_WALLIS_TEST_RATIONALE = "Kruskal-Wallis test",
    PAIRED_SAMPLES_T_TEST_RATIONALE = "PAIRED_SAMPLES_T_TEST RATIONALE",
    WILCOXON_SIGNED_RANK_TEST_RATIONALE = "Wilcoxon signed-rank test rationale",
    ONE_WAY_REPEATED_MEASURES_ANOVA_RATIONALE = "One-way repeated measures ANOVA",
    FRIEDMAN_TEST_RATIONALE = "Friedman test",
    FACTORIAL_ANOVA_RATIONALE = "Factorial ANOVA",
    GLM_RATIONALE = "Generalized Linear Models",
    LLM_RATIONALE = "Linear Mixed Models",
    GLMM_RATIONALE = "Generalized Linear Mixed Models"

// const get_method_one_factor = (iv, parametric_test, nonparametric_test, parametric_test_rationale, nonparametric_test_rationale) => {
//     if(iv.assumption.normality && iv.assumption.independence && iv.assumption.homoscedasticity) {
//         return {
//             method: parametric_test,
//             rationale: parametric_test_rationale
//         }
//     } else {
//         return {
//             method: nonparametric_test,
//             rationale: nonparametric_test_rationale
//         }
//     }
// }

const decide_method = (independent_variables, dependent_variable) => { // 这里不要dependent variable是因为有independent assumption里有dv
    // handle的时候可以又一个button click就decide method
    // click 完把每个assumption全部清零
    const iv_len = independent_variables.length;

    if(iv_len <= 0) {
        console.error("Need to have at least one independent variable!");
        return false;
    }

    let method, rationale;

    if(iv_len === 1) {
        const iv = independent_variables[0];
        if(iv.categories.length === 2) {
            if(iv.study_design === 'between') {
                if(iv.assumption[dependent_variable.name].isParametric) {
                    method = INDEPENDENT_T_TEST;
                    rationale = INDEPENDENT_T_TEST_RATIONALE;
                } else {
                    method = MANNWHITNEY_U_TEST;
                    rationale = MANNWHITNEY_U_TEST_RATIONALE;
                }
            } else {
                if(iv.assumption[dependent_variable.name].isParametric) {
                    method = PAIRED_SAMPLES_T_TEST;
                    rationale = PAIRED_SAMPLES_T_TEST_RATIONALE;
                } else {
                    method = WILCOXON_SIGNED_RANK_TEST;
                    rationale = WILCOXON_SIGNED_RANK_TEST_RATIONALE;
                }
            }
        } else if(iv.categories.length > 2) {
            if(iv.study_design === 'between') {
                if(iv.assumption[dependent_variable.name].isParametric) {
                    method = ONEWAY_ANOVA;
                    rationale = ONEWAY_ANOVA_RATIONALE;
                } else {
                    method = KRUSKAL_WALLIS_TEST;
                    rationale = KRUSKAL_WALLIS_TEST_RATIONALE;
                }
            } else {
                if(iv.assumption[dependent_variable.name].isParametric) {
                    method = ONE_WAY_REPEATED_MEASURES_ANOVA;
                    rationale = ONE_WAY_REPEATED_MEASURES_ANOVA_RATIONALE;
                } else {
                    method = FRIEDMAN_TEST;
                    rationale = FRIEDMAN_TEST_RATIONALE;
                }
            }
        }
    } else { // more factors
        let isBetween = true, isParametric = true;
        for(let i = 0; i < independent_variables.length; i++) {
            if(independent_variables[i].study_design !== 'between') {
                isBetween = false;
            }
            if(!independent_variables[i].assumption[dependent_variable.name].isParametric) {
                isParametric = false;
            }
        }

        if(isBetween) {
            if(isParametric) {
                method = FACTORIAL_ANOVA;
                rationale = FACTORIAL_ANOVA_RATIONALE;
            } else {
                method = GLM;
                rationale = GLM_RATIONALE;
            }
        } else {
            if(isParametric) {
                method = LLM;
                rationale = LLM_RATIONALE;
            } else {
                method = GLMM;
                rationale = GLMM_RATIONALE;
            }
        }
    }
    return {
        method: method,
        rationale: rationale
    }

}


// const openPreregistration = () => {
//     const hypothesis = $("[name='text1']").val();
//     const dv = $("[name='text2']").val();
//     const iv = $("[name='text3']").val();
//     const analysis = $("[name='text4']").val();
//     const outlier = $("[name='text5']").val();
//     const ss = $("[name='text6']").val();
//     const other = $("[name='text7']").val();
//
//     const code = $("code"); // Tea code for now
//
//     $.getJSON("/create", {
//
//     })
// }