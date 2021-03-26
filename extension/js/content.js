$(document).ready(function() {
    // handle variable listener
    // handleVariableListeners();

    $('[data-toggle="tooltip"]').tooltip({
        delay: { "show": 0, "hide": 0 }
    });

    addInstruction();

    // add plugin sections
    addAnalysisPreregistea();
    addConstructPreregistea();
    addDependentVariablePreregistea();
    addConditionPreregistea();
    addSampleSizePreregistea();
    //
    // // Add Floating button
    const body = $("body");
    addTeaModal(body);
    body.append(addTeaFloatingBtn());
    body.append(addMethodFloatingBtn());
});

const STEP_1_DESCRIPTION = "Step 1: Define your study in Preregistea";
const STEP_2_DESCRIPTION = "Step 2: Adjust the automatically-generated preregistration text";
const STEP_3_DESCRIPTION = "Step 3: Preview analysis code, “method” section, and submit preregistration";
const STEP_4_DESCRIPTION = "Step 4: Submit Preregistration and Push your Analysis Code to Github";

const addInstruction = () => {
    const blueAlert = $(".center1 > .alert-info");

    const description = $("<div class='.row .row_create'></div>").css({
        display: "flex",
        "flex-direction": "row",
        "justify-content": "space-between"
    });

    const first_box = $(`<div id='first_box' class='description-box'><p>${STEP_1_DESCRIPTION}</p></div>`);
    const second_box = $(`<div id='second_box' class='description-box'>${STEP_2_DESCRIPTION}</div>`);
    const third_box = $(`<div id='third_box' class='description-box'>${STEP_3_DESCRIPTION}</div>`);
    // const fourth_box = $(`<div id='fourth_box' class='description-box'>${STEP_4_DESCRIPTION}</div>`);

    description.append([first_box, second_box, third_box]);

    description.insertAfter(blueAlert);

    new LeaderLine(
      document.getElementById('first_box'),
      document.getElementById('second_box'),
        {color: 'black', size: 3}
    );

    new LeaderLine(
      document.getElementById('second_box'),
      document.getElementById('third_box'),
                {color: 'black', size: 3}

    );

    // new LeaderLine(
    //   document.getElementById('third_box'),
    //   document.getElementById('fourth_box')
    // );
}