const CONSTRUCT_ID = "construct";
const CONSTRUCT_PLUGIN_ID = CONSTRUCT_ID + "_preregistea";
const CONSTRUCT_FORM_ID = CONSTRUCT_ID + "_form";
const CONSTRUCT_BTN_ID = CONSTRUCT_ID + "_initial_btn";
const CONSTRUCT_TEXTAREA_NODE = $("[name='text1']");
const CONSTRUCT_PARENT_SECTION = CONSTRUCT_TEXTAREA_NODE.parent().parent().parent();
const CONSTRUCT_DESCRIPTION =
    "In this section, you might want to begin with a vague research question. If possible, make sure to " +
    "define a conceptual idea (construct) with a specific measure (measure) in this step. For example, " +
    "academic performance is a construct, GPA is a measure. Preregistea will help you generate the preregistea text afterward."

/////////// Listener to constructs ///////////

cListener = {
    cInternal: constructs,
    cListener: function(val) {},
    set c(val) {
        this.cInternal = val;
        this.cListener(val);
    },
    get c() {
        return this.cInternal;
    },
    registerListener: function(listener) {
        this.cListener = listener
    }
}

cListener.registerListener(function(constructs) {
    updateConstructDisplayArea(constructs);
    updateConstructOptions(constructs);

    if(constructs.length > 0)  $(".construct-group").show();
});


/////////// Layout Code ///////////

const addConstructPreregistea = () => {
    const preregistea = createPreregisteaForm(CONSTRUCT_PLUGIN_ID, CONSTRUCT_DESCRIPTION);
    const inputArea = preregistea.find('.inputarea')
    addConstructInput(inputArea);
    preregistea.append(addArrow());
    CONSTRUCT_PARENT_SECTION.prepend(preregistea);
}

const addConstructInput = (inputArea) => {
    const inputForm = createConstructForm();
    const inputBtn = createConstructBtn(inputForm);
    inputArea.append([inputForm, inputBtn]);
}

const createConstructForm = () => {
    return $(`<form class='inputarea-form'>
                        <div class="form-group">
                            <h4 for='construct' class='col-form-label'>Construct:</h4>
                            <input type='text' class='form-control construct' required>

                        </div>
                        <div class="form-group">
                            <h4 for='measure' class='col-form-label'>Measure:</h4>
                            <input type='text' class='form-control measure' required>
                        </div>
                    </form>`
              )
}

const createConstructBtn = (inputForm) => {
    const initialBtn = createInitialButton(CONSTRUCT_BTN_ID, "Add Construct");
    initialBtn.on("click", function() {
        const constructInput = inputForm.find(".construct");
        const measureInput = inputForm.find(".measure");

        if(constructInput.val().length > 0 && measureInput.val().length > 0) {
            updateConstruct(constructInput.val(), measureInput.val(), null);
            updateConstructTextArea();

            // clear the form
            constructInput.val("");
            measureInput.val("");
        } else {
            alert(CONSTRUCT_ALERT);
        }

    })
    return initialBtn;
}

const addConstructCard = (construct) => {
    let card = $(`
        <div class="uml-card" id="${construct.card_id}" style="width: 200px; height: 150px; position: relative">
            <div class="form-group mb-1" style="border-bottom: 1px solid #0f0f0f; text-align: center">
                <label class="card-header-name"></label>
            </div>
        </div>
    `);

    card.find(".card-header-name").text(construct.display_name);
    card.append(`
        <div class="form-group mb-0 card-details">
             <label>Measure: ${construct.display_measure}</label>
        </div>
    `);

    const cancel = $(`<button type='button' class='delete close' data-dismiss='alert' aria-label='Close' style="position: absolute; top: 0; right: 0">×</button>`);
    card.append(cancel);

    return card;
}

/// Update Constructs
const updateConstruct = (constructInput, measureInput, constructObject) => {
    if(constructObject === null) {
        // Creating a new construct
        constructObject = new Construct(constructInput, measureInput);
        constructObject.card_id = CONSTRUCT_ID + "_" + constructObject.construct;
    } else {
        constructObject.set(constructInput, measureInput)
    }

    constructMap[constructObject.card_id] = constructObject;    // key: card_id, value: Construct. A map to find the card
    constructMeasureMap[constructObject.construct] = constructObject.measure;   // key: construct, value: measure
    constructs.push(constructObject);  // a list preserving order of input construct
    if(!constructObject.isEditing) cListener.c = constructs;
}

const updateConstructTextArea = () => {
    const original = CONSTRUCT_TEXTAREA_NODE.val();
    let newText = original.length === 0 ? "Add your research question here. \n" : "\n";
    for(let i = 0; i < constructs.length; i++) {
        newText += `We will measure the value of ${constructs[i].display_measure} to represent the concept of ${constructs[i].display_name}.`;
    }
    CONSTRUCT_TEXTAREA_NODE.val(original + newText)
}

const updateConstructDisplayArea = (constructs) => {
    const display = $(`#${CONSTRUCT_PLUGIN_ID} .displayarea`);
    let cards = [];

    for(let i = 0; i < constructs.length; i++) {
        const constructObject = constructs[i];
        const constructCard = addConstructCard(constructObject);
        constructCard.find(".delete").on("click", function() {
            deleteConstruct(constructCard.attr("id"));
            constructCard.remove();
        })
        cards.push(constructCard);
    }
    display.html(cards);
}

const updateConstructOptions = (constructs) => {
    let options = [];

    for(let i = 0; i < constructs.length; i++) {
        const c = constructs[i];
        if (!c.selected) {
            const optionCard = $(`<div class="construct-card" style="border: solid; max-width: fit-content"><span style="margin-left: 5px; margin-right: 5px">${c.construct}</span></div>`);
            optionCard.on("click", function () {
                $(this).css("background", "grey");

                if (constructClicked) {
                    constructElement.css("background", "none");
                    if (constructObject.construct === c.construct) {
                        constructClicked = false;
                        constructElement = null;
                        constructObject = null;
                    } else {
                        constructClicked = true;
                        constructElement = $(this);
                        constructObject = c;
                        $("#dv_preregistea .variable-name").val(constructObject.display_measure);
                    }
                } else {
                    constructClicked = true;
                    constructElement = $(this);
                    constructObject = c;
                    $("#dv_preregistea .variable-name").val(constructObject.display_measure);
                }
            });
            options.push(optionCard);
        }
    }

    $(".construct-card").html(options);
    if(constructs.length <= 0) $(".construct-group").hide();
    else $(".construct-group").show();
}

const deleteConstruct = (card_id) => {
    delete constructMap[card_id];

    let pos = 0;
    for(let i = 0; i < constructs.length; i++) {
        if(card_id === constructs[i].name) {
            pos = i;
            break
        }
    }
    constructs.splice(pos, 1);
    cListener.c = constructs;
}