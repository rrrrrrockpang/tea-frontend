const createForm = (id, type="") => {
    if(id === HYPOTHESIS_ID) {
        return $(`<form class='extension_popover_form' id='${id + "_form"}'>
                <div class="form-group">
                    <label for='name' class='col-form-label'>Construct:
                    <input type='text' class='form-control' id='${id + "_construct"}'>
                    </label>
                </div>

                <div class="form-group">
                    <label for='name' class='col-form-label'>Measure:
                    <input type='text' class='form-control' id='${id + "_measure"}'>
                    </label>
                </div>
            </form>`);
    } else if(id === DV_ID || id === CONDITION_ID) {
        return $(`<form class='extension_popover_form' id='${id + "_form"}'>
                <div class="form-group">
                    <label for='name' class='col-form-label'>Variable Name:
                    <input type='text' class='form-control' id='${id + "_name"}'>
                    </label>
                </div>

                <div class='form-group var-type'>
                    <label class="radio control-label">Variable Type:</label>

                    <div class="form-inline">
                        <label class='form-check-label' for='nominalRadio'>
                            <input class='form-check-input' type='radio' name='variableTypeRadios' id='nominalRadio' value='nominal'>
                            Nominal
                        </label>
                        <label class='form-check-label' for='ordinalRadio'>
                            <input class='form-check-input' type='radio' name='variableTypeRadios' id='ordinalRadio' value='ordinal'>
                            Ordinal
                        </label>
                        <label class='form-check-label' for='intervalRadio'>
                            <input class='form-check-input' type='radio' name='variableTypeRadios' id='intervalRadio' value='interval'>
                            Interval
                        </label>
                        <label class='form-check-label' for='ratioRadio'>
                            <input class='form-check-input' type='radio' name='variableTypeRadios' id='ratioRadio' value='ratio'>
                            Ratio
                        </label>
                    </div>
                </div>
            </form>`);
    } else if(id === ANALYSIS_ID) {
        if(type === "nominal") {
            return $(`
                <form class='extension_popover_form' id='${id + "_form"}'>
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Hypothesis:
                        <div class="form-inline">
                            <label>The mean value of</label>
                            <label class="dv-in-form mr-sm-2"></label>
                            <label>in</label>
                            <select class="custom-select my-1 mr-sm-2">
                                <option value="CI" selected>CI</option>
                                <option value="PI">PI</option>
                            </select>
                            <label>group will be</label>
                            <select class="custom-select my-1 mr-sm-2">
                                <option value="greater" selected>greater than</option>
                                <option value="less">less than</option>
                                <option value="different">different from</option>
                                <option value="same">same as</option>
                            </select>
                            <label>than that in</label>
                            <select class="custom-select my-1 mr-sm-2">
                                <option value="CI" selected>CI</option>
                                <option value="PI">PI</option>
                            </select>
                        </div>
                    </div>
                </form>
            `);
        } else {
            return $(`
                <form class='extension_popover_form' id='${id + "_form"}'>
                    <div class="form-group">
                        <label for='name' class='col-form-label'>Hypothesis:
                        <div class="form-inline" style="display: inline-block;">
                            <label>The greater value of</label>
                            <label class="dv-in-form mr-sm-2"></label>
                            <label>will lead to</label>
                            <select class="custom-select my-1 mr-sm-2">
                                <option value="greater" selected>greater</option>
                                <option value="less">less</option>
                                <option value="different">different</option>
                                <option value="same">the same</option>
                            </select>
                            <label class="dv-in-form mr-sm-2"></label>
                        </div>
                    </div>
                </form>
            `)
        }
    }
}