class Product {
    constructor(section, description) {
        this.section = section;
        this.id = this.section;
        this.description = description;
        this.productNode = null;
        this.preregisComponent = null;
    }

    addProduct(div) {
        this.wrapper = $("<div class='row'><div class='container'></div></div>");
        this.productNode = $("<div id='" + this.id + "' class='product'></div>");
        this.wrapper.find(".container").append(this.productNode);
        div.append(this.wrapper);
    }

    removeProduct() {
        this.productNode.css("opacity", "0");
    }

    generateTooltipForm() {
        let productNode = this.productNode;

        let formTemplate =
            $("<form id='product-form' method='post'>" +
                "<div class='form-group'>" +
                    "<label for='section' class='col-form-label'>Section:" +
                    "<input type='text' class='form-control' id='sectionInput' value='" + this.section + "' readonly>" +
                    "</label>" +
                "</div>" +

                "<div class='form-group'>" +
                    "<label for='section' class='col-form-label'>Description:" +
                    "<textarea class='form-control' id='descriptionTextarea'>" + this.description + "</textarea>" +
                "</div>" +
            "</form>");

        formTemplate.find("textarea").on("keyup", function() {
            $(this).css("height", "auto");
            $(this).css("overflow", "hidden");
            $(this).style.height = "1px";
            $(this).style.height = (25+$(this).scrollHeight) + "px";
        });

        let cancelBtn = $("<button type='button' class='btn btn-secondary'>Close</button>");
        let changeBtn = $("<button type='button' class='btn btn-success'>Change</button>");
        formTemplate.append(cancelBtn, changeBtn);
        cancelBtn.on('click', function() {
            productNode.popover('hide');
        });

        changeBtn.on('click', function() {
            let choice = confirm("Are you sure you want to change this?");
            if(choice) {
                formTemplate.find("input[type='radio']").prop("disabled", false);
                formTemplate.find("input[type='text']").prop('readonly', false);
                cancelBtn.prop("disabled", true);
                $(this).prop("disabled", true);
                var submitBtn = $("<button type='submit' class='btn btn-success'>Submit</button>");
                formTemplate.append(submitBtn);
                submitBtn.on("click", function() {
                    formTemplate.find("input[type='radio']").prop("disabled", true);
                    formTemplate.find("input[type='text']").prop('readonly', true);
                    cancelBtn.prop("disabled", false);
                    changeBtn.prop("disabled", false);
                    $(this).remove();
                });
            }
        })

        return formTemplate;
    }

    showToolTipForm() {
        let contentHtml = this.generateTooltipForm();
        this.productNode.popover({
            html: true,
            sanitize: false,
            container: 'body',
            placement: 'right',
            title: this.section,
            content: function() {
                return contentHtml;
            }
        });
    }
}