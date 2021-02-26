PARENT_HEIGHT_FLEX = {
    display: 'flex',
    'min-height': '150px'
}

/**
 * Display variables
 */
const addCard = (text) => {
    const selector =
        "<div class='alert alert-success' role='alert'>" +
        "<strong>"+ text + "</strong>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
        "<span class='delete' aria-hidden='true'>×</span>" +
        "</button>" +
        "</div>";
    return $(selector);
}