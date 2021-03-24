const getCurrentCategories = (categoryArea) => {
    let categories = [];
    $(categoryArea).find('span .category-name').each(function() {
        if($(this).is(":visible")) categories.push($(this).text());
    })
    return categories;
}

const deleteCategory = (categories, deletedCategory) => {
    return categories.filter(function(value, index, arr){
        return value !== deletedCategory;
    });
}

const addCardDetail = (name, text) => {
    return $(`
        <div class="form-group mb-0 card-details">
             <label>${name}: ${text}</label>
        </div>
    `);
}

const addArrow = () => {
    return `<span style="font-size:2em; margin: 5px; text-align: center" class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>`;
}

const handleCategoricalVariableInputForm = (inputForm) => {
    const nominalArea = createCategoricalVariableInputFormArea("Categories", "nominal-category")
    const ordinalArea = createCategoricalVariableInputFormArea("Orders", "ordinal-category")
    nominalArea.insertAfter(inputForm.find(".var-type"));
    ordinalArea.insertAfter(inputForm.find(".var-type"));
    nominalArea.hide();
    ordinalArea.hide();

    inputForm.find(".var-type input[type='radio']").on("change", function() {
        const selected = inputForm.find(".var-type input[type='radio']:checked");
        let nominalArea = inputForm.find(".nominal-category");
        let ordinalArea = inputForm.find(".ordinal-category");

        if(selected.val() === "nominal") {
            if(ordinalArea.is(":visible")) ordinalArea.hide();
            nominalArea.show();
            handleCategoryBtn(nominalArea.find(".add-category-btn")); // Manipulate Add category button
        } else if(selected.val() === "ordinal"){
            if(nominalArea.is(":visible")) nominalArea.hide();
            ordinalArea.show();
            handleCategoryBtn(ordinalArea.find(".add-category-btn"));
        } else {
            nominalArea.hide();
            ordinalArea.hide();
        }
    })
}

const handleCategoryBtn = (categoryAreaBtn) => {
    /**
     * categoryArea is the nominal or ordinal area
     */
    const categoryArea = categoryAreaBtn.closest(".add-category");
    categoryAreaBtn.on('click', function() {
        let categories = getCurrentCategories(categoryArea);
        const newCategory = categoryArea.find(".input-category:visible").val();
        if(newCategory.length === 0) return;
        categories.push(newCategory);

        const card = createCategoryCard(newCategory);
        card.find(".delete-category").on("click", function() {
            const cardComponent = $(this).parent();
            const deletedCategory = cardComponent.find('.category-name:visible').text();
            categories = deleteCategory(categories, deletedCategory);
            cardComponent.remove();
        });
        categoryArea.find(".input-category:visible").val('');
        categoryArea.find(".categories:visible").append(card);
    })
}

const createCategoricalVariableInputFormArea = (text, className) => {
    return $(`<div class="form-group add-category ${className}">
                    <div class="container w-100">
                        <div class="row">
                            <label for='name' class='col-form-label'>${text}:</label>
                            
                            <div class="form-inline">
                                <input type='text' class='form-control input-category'>
                                <button type="button" class="btn btn-success add-category-btn">Add</button>
                            </div>
                        </div>
                        <div class="row categories"></div>
                    </div>
                </div>`);
}

const createCategoryCard = (text) => {
    return $(`
        <span>
            <span class="category-name">${text}</span> &nbsp;
            <a class="btn btn-light delete-category">x</a>
        </span>
    `).css({
        border: "solid",
        "border-color": "yellow",
        padding: "2px",
        "margin-left": "2px",
        "margin-right": "2px"
    })
}