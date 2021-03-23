let dependent_variables = [];
let conditions = [];
let suggested = [];
let variableMap = {};
let hypothesisPair = {
    dv: '',
    iv: ''
};

let constructs = [];
let constructMap = {};
let constructMeasureMap = {};


let teaCode = {
    "variables": [],
    "study_design": {
        "study type": "experiment",
        "independent variables": [],
        "dependent variables":[]
    },
    "hypothesis": []
};

analysisConditionClicked = false;
analysisCondition = null;
analysisConditionElement = null;

analysisDVClicked = false;
analysisDV = null;
analysisDVElement = null;

constructClicked = false;
constructObject = null;
constructElement = null;

class Construct {
    constructor(construct, measure) {
        this.construct = construct.split(' ').join('_');
        this.measure = measure.split(' ').join('_');

        this.display_name = construct;
        this.display_measure = measure;
        this.isEditing = false;
        this.selected = false;
        this.card_id = null;
    }

    set(construct, measure) {
        this.construct = construct;
        this.measure = measure;
    }

    isEditing() {
        this.isEditing = true;
    }

    addMeasure(measure) {
        this.measure = measure;
    }
}

class Variable {
    constructor(name, type='', categories=[]) {
        this.name = name.split(' ').join('_');
        this.type = type;
        this.categories = categories;

        this.display_name = name;
        this.isEditing = false;
        this.study_design = "";
        this.construct = null;
    }

    set(name, type, categories=[]) {
        this.name = name;
        this.type = type;
        this.categories = categories;
    }

    isEditing() {
        this.isEditing = true;
    }

    addConstruct(construct) {
        this.construct = construct;
    }
}