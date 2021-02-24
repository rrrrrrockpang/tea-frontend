class Sentence {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }

    addSentence(div) {
        this.wrapper = $("<span id='" + this.id + "'>" + this.text + "</span>");
        this.wrapper.css("border-style", "solid");
        div.append(this.wrapper);
    }


}