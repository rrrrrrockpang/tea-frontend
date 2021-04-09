const createPreregisteaForm = (id, description) => {
    const preregistea = $(`<div class="col-xs-12 preregistea-container" id="${id}" style="display: flex; flex-direction: column">
                <div class="preregistea h-100 w-100">
                    <div class='container'>
                        <div class="row h-100 playground">
                            <div class="col-xs-5 inputarea"></div>
                            <div class="col-xs-7 displayarea"></div>
                        </div>
                    </div>
                </div>
            </div>`);

    preregistea.prepend(`<div class="alert alert-success description" role="alert">${description}</div>`);

    return preregistea;

}

const createInitialButton = (id, text) => {
    return $(`<button type="button" id="${id}" class="btn btn-success initial_btn">${text}</button>`)
        .css({
            right: 0,
        })
}