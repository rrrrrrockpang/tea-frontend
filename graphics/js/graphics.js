$(document).ready(function(){
    console.log("ready");
    // Deal with popover effect
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

        $('.product').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    // Add RQ, DV, IV, Hypothesis, study analysis, sample size, etc
    const preregis_container = $("#preregisContainer > .container");

    const name = new Component("name", "first preregistration");
    name.addComponent(preregis_container);
    name.showToolTipForm();

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

    const analysis_container = new Component("analysis", "analysis_1");
    analysis_container.addComponent(preregis_container);
    analysis_container.showToolTipForm();

    const outlier_container = new Component("outlier", "inclusion");
    outlier_container.addComponent(preregis_container);
    outlier_container.showToolTipForm();

    const sample_size_container = new Component("sample_size", "sample_size_1");
    sample_size_container.addComponent(preregis_container);
    sample_size_container.showToolTipForm();

    const other_container = new Component("other", "other_1");
    other_container.addComponent(preregis_container);
    other_container.showToolTipForm();


    // Product
    const paper_container = $("#paperContainer > .container");
    const independent_variable_product_container = new Product("independent_variable", "Hello, this is exciting");
    independent_variable_product_container.addProduct(paper_container);
    independent_variable_product_container.showToolTipForm();

    var myline = new LeaderLine(
        dependent_container.componentNode[0],
        independent_variable_product_container.productNode[0]
    );
})




