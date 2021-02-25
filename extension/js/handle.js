const handleClickIcon = (node) => {
    // shrink textarea node
    node.attr('class', 'col-sm-4');
    node.css('min-height', "150px");

    // Add tea div
}

const adjustHeight = (parentNode) => {
    parentNode.css(PARENT_HEIGHT_FLEX);
};