const createPreregisteaForm = (id, description) => {
    return $(`<div class="col-xs-12" id="${id}" style="display: flex; flex-direction: column">
                <div class="preregistea h-100 w-100">
                    <div class='container'>
                        <div class="row h-100 description"><p style="padding-left: 10px; padding-right: 10px">${description}</p></div>
                        <div class="row h-100 playground" style="border-top: 2px solid">
                            <div class="col-xs-4 inputarea"></div>
                            <div class="col-xs-8 displayarea"></div>
                        </div>
                    </div>
                </div>
            </div>`);
}

const createInitialButton = (id, text) => {
    return $(`<button type="button" id="${id}" class="btn btn-success initial_btn">${text}</button>`)
        .css({
            right: 0,
        })
}