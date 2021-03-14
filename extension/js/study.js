class Study {
    constructor() {
        this.design = "experiment";
        this.independent_var = [];
        this.dependent_var = [];
        this.hypothesis = [];
    }

    getIV(){
        return this.design;
    }
}

class Variable {
    constructor() {
        this.type = null;
        this.name = null;
        this.addenda = null;
        this.isSelected = false;
//    this.addenda = {};
    }

    setVar(type, name, addenda = []) {
        this.type = type;
        this.name = name;
        this.addenda = addenda;
        if((type === "nominal" || type === "ordinal") && addenda.length === 0) console.error("You need to define categories");
    }

    getType() {
        return this.type;
    }

    getName() {
        return this.name;
    }

    toString() {
        return "Var: " + this.name + "; Type: " + this.type;
    }

    toJSON() {
        return {
            "name": this.name,
            "data type": this.type,
        }
    }

    isDefined() {
        return this.type != null && this.name != null
    }
}

class Construct {
    constructor(name, variable) {
        this.construct = name;
        this.variable = variable; // variable is a Variable()
    }

    isDefined() {
        return this.variable.isDefined;
    }
}