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

    const construct = (constructObject === null) ? "<u>conceptual construct your dependent variable measures</u>" : constructObject.display_name;
    const analysis = (report.design.analysis === 0) ? "<u>Preregistea will determine the statistical tests for you after filling out the form</u>" : report.design.analysis;
    const dependent = (typeof report.design.dependent[0] === "undefined") ? "<u>dependent variable</u>" : report.design.dependent[0].display_name;

    let experiment_design = `<h3><b>Study Design</b></h3><br>To understand different ${independent} impact ${construct}, we ` +
        `designed a ${study_design} study. We considered the ${dependent} indicating the ${construct}.` +
        `To measure the ${dependent}, we have users conduct procedures here. Participants were assigned to one of `+
        `the ${catlength} conditions: 1) ${cat1}, and ${cat2}.<br>` +
        `<br>` +
        `Before running the experiment, we formulated and preregistered the following hypotheses.<br><br>`;

    let hypothesisText = "";

    if(report.hypothesis.length === 0) hypothesisText += "<u>Please specify any hypothesis in Preregistea</u>"
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

    experiment_design += `<br>We will analyze the hypothesis above with ${analysis}. The hypothesis can be reproduced by the Tea Code.<br><br>`;

    experiment_design += `<h3><b>Participants</b></h3><br>`;

    const effectSize = (report.participants.effectSize === null) ? "<u>effect size</u>" : report.participants.effectSize;
    const number = (report.participants.number) ? "<u>sample size</u>" : report.participants.number;

    experiment_design += `A prospective power analysis was performed for sample size determination based on Cohen's conventional effect size ` +
        `d = ${effectSize}. We achieved at least 0.8 under &#945; = 0.05 within ${number} participants per condition.`

    return experiment_design
}