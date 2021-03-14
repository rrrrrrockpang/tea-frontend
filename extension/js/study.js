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
        if((type === "nominal") && addenda.length <= 1) {
            alert("You need to define more than two categories");
            return false;
        } // TODO: need to handle ordinal
        this.type = type;
        this.name = name;
        this.addenda = addenda;
        return true
    }

    // editVar(type, name, addenda = []){
    //     // interval previously and switch to nominal
    //
    //     // nominal previously and switch to interval
    // }

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