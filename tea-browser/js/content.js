$("[name='text2']").on("click", (event) => {

    // console.log($(".center1 .row.row_create .col-xs-12 .row.row_create:nth-of-type(4)"))
//    $(".center1 .row_create .col-xs-12 .row_create:nth-of-type(5)").remove()
    console.log($(event.target).parent())
    $(event.target).parent().css("background-color", "red");
})