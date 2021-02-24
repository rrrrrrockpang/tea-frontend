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


    // In the paper product element
    const paper_container = $("#paperContainer > .container");
    paper_container.css("display", "flex");
    paper_container.css("flex-direction", "column");
    paper_container.css("justify-content", "center");
    console.log(HYPOTHESIS_SECTION_IN_PRODUCT);
    const hypothesis = new Product(HYPOTHESIS_SECTION_IN_PRODUCT, HYPOTHESIS_IN_PRODUCT);
    const independent = new Product(INDEPENDENT_SECTION_IN_PRODUCT, INDEPENDENT_IN_PRODUCT);
    const dependent = new Product(DEPENDENT_SECTION_IN_PRODUCT, DEPENDENT_IN_PRODUCT);
    const study = new Product(STUDY_SECTION_IN_PRODUCT, STUDY_IN_PRODUCT);
    const outlier = new Product(OUTLIER_SECTION_IN_PRODUCT, OUTLIER_IN_PRODUCT);
    const sample_size = new Product(SAMPLESIZE_SECTION_IN_PRODUCT, SAMPLESIZE_IN_PRODUCT);
    const other = new Product(OTHER_SECTION_IN_PRODUCT, OTHER_IN_PRODUCT);

    const arr = [ hypothesis, independent, dependent, study, outlier, sample_size, other ];
    for(let i = 0; i < arr.length; i++) {
        let product = arr[i];
        product.addProduct(paper_container);
        product.showToolTipForm();
    }


    independent_variable_product_container.preregisComponent = independent_container;


    var myline = new LeaderLine(
        independent_variable_product_container.preregisComponent.componentNode[0],
        independent_variable_product_container.productNode[0],
        {
            path: "fluid",
            startSocket: "right",
            endSocket: "left"
        }
    );

    var paper = new Paper();
    paper.addPaper($("#paperTextContainer .container"));


    var myline2 = new LeaderLine(
        independent_variable_product_container.productNode[0],
        $("#sentence_0").get(0),
        {
            hide: true
        });

    $("#sentence_0").on('mouseenter', function (){
        myline2.show();
    })
})




