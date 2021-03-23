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
            report.design.analysis = "paired-samples t-tests"
        } else {
            report.design.between = true;
            report.design.analysis = "independent t-test"
        }
    }

    report.construct = "I need to change the construct!!"

    report.participants.number = studySampleSize;
    report.participants.alpha = 0.05;
    report.participants.effectSize = studyEffectSize;

    report.hypothesis = teaCode["hypothesis"];
    report.exclusion = $("[name='text5']").val();
}

const updateTeaCodeHypothesis = (iv, dv, relationship) => {
    const condition_type = relationship['condition_type'];
    const two_side = relationship['two-side'];
    const categories = relationship['categories'];
    let hypothesis = [];

    if(categories.length !== 2) console.error("Has to compare 2 categories.");

    hypothesis.push([iv.name, dv.name]);

    if(condition_type === "nominal" || condition_type === "ordinal") {
        if(two_side === true) {
            hypothesis.push([`${iv.name}: ${categories[0]} != ${categories[1]}`]);
        } else if(two_side === false) {
            hypothesis.push([`${iv.name}: ${categories[0]} > ${categories[1]}`]);
        } else {
            hypothesis.push([`${iv.name}: ${categories[0]} = ${categories[1]}`]);
        }
    } else {
        const positive = relationship['positive'];
        if(positive) {
            hypothesis.push([`${iv.name} ~ ${dv.name}`]);
        } else {
            hypothesis.push([`${iv.name} ~ -${dv.name}`]);
        }
    }
    teaCode["hypothesis"].push(hypothesis);
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

const stringifyMethodSection = () => {
    let study_design;
    if(report.design.within && report.design.between) study_design = "mixed factorial";
    else if(report.design.within) study_design = "within-subjects";
    else if(report.design.between) study_design = "between-subjects";

    let experiment_design = `<b>Study Design</b><br>To understand different ${report.design.independent[0].display_name} impact ${report.construct}, we ` +
        `designed a ${study_design} study. We considered the ${report.design.dependent[0].display_name} indicating the ${report.construct}.` +
        `To measure the ${report.design.dependent[0].display_name}, we have users conduct procedures here. Participants were assigned to one of `+
        `the ${report.design.independent[0].categories.length} conditions: 1) ${report.design.independent[0].categories[0]}, and ${report.design.independent[0].categories[1]}.<br>` +
        `<br>` +
        `Before running the experiment, we formulated and preregistered the following hypotheses.<br><br>`;

    let hypothesisText = "";
    for(let i = 0; i < report.hypothesis.length; i++) {
        const dv = report.hypothesis[i][0][1];
        const iv = report.hypothesis[i][0][0];
        const compare = report.hypothesis[i][1][0];

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

    experiment_design += `We will analyze the hypothesis above with ${report.design.analysis}. The hypothesis can be reproduced by the Tea Code.<br><br>`;

    experiment_design += `<b>Participants</b><br>`;

    experiment_design += `A prospective power analysis was performed for sample size determination based on Cohen's conventional effect size ` +
        `d = ${report.participants.effectSize}. We achieved at least 0.8 under &#945; = 0.05 within ${report.participants.number} participants per condition.`

    return experiment_design
}