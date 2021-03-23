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