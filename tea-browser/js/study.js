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
        this.type = "nominal";
        this.name = "abc";
//    this.addenda = {};
    }

    setVar(type, name) {
        this.type = type;
        this.name = name;
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
}