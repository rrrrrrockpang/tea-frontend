const CONSTRUCT_ID = "construct";
const CONSTRUCT_PLUGIN_ID = CONSTRUCT_ID + "_preregistea";
const CONSTRUCT_FORM_ID = CONSTRUCT_ID + "_form";
const CONSTRUCT_BTN_ID = CONSTRUCT_ID + "_initial_btn";
const CONSTRUCT_TEXTAREA_NODE = $("[name='text1']");
const CONSTRUCT_PARENT_SECTION = CONSTRUCT_TEXTAREA_NODE.parent().parent().parent();
const CONSTRUCT_DESCRIPTION =
    "Specify any constructs. You will define how to measure the construct later on. For example, academic performance is a construct, " +
    "GPA is a measure. \n You may have a broad research question at this stage. Write it in the textarea below after inputting the construct! " +
        "Preregistea will generate specific hypotheses and how to test them for you in Question 5."
    // "For example, I define a construct of academic performance with a measure GPA. Preregistea will generate a template in the textarea. You can fill in " +
    // "a research question: A month-long academic summer program for disadvantaged kids will reduce the drop in academic performance that occurs during the summer. ";

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
<!--                        <div class="form-group">-->
<!--                            <h4 for='measure' class='col-form-label'>Measure:</h4>-->
<!--                            <input type='text' class='form-control measure' required>-->
<!--                        </div>-->
                    </form>`
              )
}

const createConstructBtn = (inputForm) => {
    const initialBtn = createInitialButton(CONSTRUCT_BTN_ID, "Add Construct");
    initialBtn.on("click", function() {
        const constructInput = inputForm.find(".construct");
        // const measureInput = inputForm.find(".measure");

        if(constructInput.val().trim() in constructMeasureMap) {
            alert("Construct has already defined.")
            return;
        }

        if(constructInput.val().length > 0) {
            // updateConstruct(constructInput.val(), measureInput.val(), null);
            // updateConstructTextArea();
            updateConstructLst(constructInput.val());
            updateConstructTextArea();

            // clear the form
            constructInput.val("");
            // measureInput.val("");
        } else {
            alert(CONSTRUCT_ALERT);
        }

        // if(constructInput.val().length > 0 && measureInput.val().length > 0) {
        //     updateConstruct(constructInput.val(), measureInput.val(), null);
        //     updateConstructTextArea();
        //
        //     // clear the form
        //     constructInput.val("");
        //     measureInput.val("");
        // } else {
        //     alert(CONSTRUCT_ALERT);
        // }
    })
    return initialBtn;
}

const addConstructCard = (construct) => {
    let card = $(`
        <div class="uml-card" id="${construct.card_id}" style="width: 200px; height: 60px; position: relative; display: flex; align-items: center; justify-content: center">
            <div class="form-group mb-1" style="text-align: center">
                <label class="card-header-name"></label>
            </div>
        </div>
    `);

    card.find(".card-header-name").text(construct.display_name);
    // card.append(`
    //     <div class="form-group mb-0 card-details">
    //          <label>Measure: ${construct.display_measure}</label>
    //     </div>
    // `);

    const cancel = $(`<button type='button' class='delete close' data-dismiss='alert' aria-label='Close' style="position: absolute; top: 0; right: 0">×</button>`);
    card.append(cancel);

    return card;
}

const updateConstructLst = (construct_name) => {
    const constructObject = new Construct(construct_name);
    constructObject.card_id = CONSTRUCT_ID + "_" + constructObject.name;
    constructMap[constructObject.card_id] = constructObject;
    constructs.push(constructObject);
    cListener.c = constructs;
}

/// Update Constructs
// const updateConstruct = (constructInput, measureInput, constructObject) => {
//     if(constructObject === null) {
//         // Creating a new construct
//         constructObject = new Construct(constructInput, measureInput);
//         constructObject.card_id = CONSTRUCT_ID + "_" + constructObject.construct;
//     } else {
//         constructObject.set(constructInput, measureInput)
//     }
//
//     constructMap[constructObject.card_id] = constructObject;    // key: card_id, value: Construct. A map to find the card
//     constructMeasureMap[constructObject.construct] = constructObject.measure;   // key: construct, value: measure
//     constructs.push(constructObject);  // a list preserving order of input construct
//     if(!constructObject.isEditing) cListener.c = constructs;
// }

const updateConstructTextArea = () => {
    CONSTRUCT_TEXTAREA_NODE.val("");

    let newText = "Write your broad research question here. \n";
    newText += `We will evaluate the concept of `;
    for(let i = 0; i < constructs.length; i++) {
        if(i === constructs.length - 1) newText += `${constructs[i].display_name}. `;
        else newText += `${constructs[i].display_name}, `;
    }
    CONSTRUCT_TEXTAREA_NODE.val(newText)
}

const updateConstructDisplayArea = (constructs) => {
    const display = $(`#${CONSTRUCT_PLUGIN_ID} .displayarea`);
    let cards = [];

    for(let i = 0; i < constructs.length; i++) {
        const constructObject = constructs[i];
        const constructCard = addConstructCard(constructObject);
        constructCard.find(".delete").on("click", function() {
            deleteConstruct(constructCard.attr("id"));
            updateConstructTextArea();
            constructCard.remove();
        })
        cards.push(constructCard);
    }
    display.html(cards);
}

const updateConstructOptions = (constructs) => {
    options = [];
    for(let i = 0; i < constructs.length; i++) {
        const c = constructs[i];
        const optionCard = $(`<div class="construct-card" style="border: 1px solid black; margin-left: 2px; margin-right: 2px; max-width: fit-content"><span style="padding: 2px;">${c.display_name}</span></div>`);
        optionCard.on("click", function () {
            $(this).css("background", "grey");
            if(constructClicked) {
                constructElement.css("background", "none");
                if(constructObject.name === c.name) {
                    constructClicked = false;
                    constructElement = null;
                    constructObject = null;
                } else {
                    constructClicked = true;
                    constructElement = $(this);
                    constructObject = c;
                }
            } else {
                constructClicked = true;
                constructElement = $(this);
                constructObject = c;
            }
            console.log(constructObject);
        });

        options.push(optionCard);
    }

    $(".construct-card").html(options);
    if(constructs.length <= 0) $(".construct-group").hide();
    else $(".construct-group").show();
}

const deleteConstruct = (card_id) => {
    delete constructMap[card_id];

    let pos = 0;
    for(let i = 0; i < constructs.length; i++) {
        if(card_id === constructs[i].card_id) {
            pos = i;
            break
        }
    }
    constructs.splice(pos, 1);
    cListener.c = constructs;
}