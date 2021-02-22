
$('body').on('hidden.bs.popover', function (e) {
    $(e.target).data("bs.popover").inState.click = false;
});

$('body').on('click', function (e) {
    $('.component').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});

const preregis_container = $("#preregisContainer > .container");

const dependent_container = new Component("dependent_variable", "wtp_final");
dependent_container.addComponent(preregis_container);
dependent_container.showToolTipForm();

// Independent Container
// Placeholder. will be populated after a json array.
const independent_container = new Component("independent_variable", "condition");
independent_container.addComponent(preregis_container);
independent_container.showToolTipForm();

const hypothesis_container = new Component("hypothesis", "hi");
hypothesis_container.addComponent(preregis_container);
hypothesis_container.showToolTipForm();

$("#removew").on("click", function() {
    dependent_container.removeComponent();
})

