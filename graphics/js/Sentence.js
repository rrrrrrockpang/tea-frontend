

class Sentence {
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.element = null;
    }

    addSentence(div) {
        this.element = $("<span id='" + this.id + "'>" + this.text + "</span>");
        div.append(this.element);
        // this.addHighlightEffect(this.element);
    }

    addHighlightEffect(element) {
        element.on("mouseover", function() {
            $(this).css("background-color", "red");
            myline2.show();
        }).on("mouseleave", function() {
            $(this).css("background-color", "transparent");
        })
    }
}