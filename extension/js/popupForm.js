const createForm = (id) => {
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
    }
}