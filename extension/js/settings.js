PARENT_HEIGHT_FLEX = {
    display: 'flex',
    'min-height': '150px'
}

/**
 * Display variables
 */
const addCard = (text, id) => {
    return $(`
        <div class="variable-card" id="${id}">
            <div class="container">
                <div class="row w-100">
                    <div class="col-sm-10">
                        <p>${text}</p>
                    </div>
                    <div class="col-sm-2">
                        <button type='button' class='delete close' data-dismiss='alert' aria-label='Close'>×</button>
                    </div>
                </div>
            </div>
        </div>
    `);
}

const addHypothesisCard = (text, id) => {
    return $(`
        <div class="variable-card" id="${id}">
            <div class="container">
                <div class="row w-100">
                    <div class="col-sm-12">
                        <p>${text}</p>
                    </div>
                </div>
            </div>
        </div>
    `);
}