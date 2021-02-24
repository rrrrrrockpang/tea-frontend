class Paper {
    constructor() {
        // this should be an array of sentence.
        // each sentence can be connected to a Product component
        this.content = null;
        this.content = ["Hi", "This is independent variable.", "This is dependent variable", "This is hypothesis",
                        "This is study design.", "This is exclusion and inclusion design"];
    }

    addPaper(div) {
        for(let i = 0; i < this.content.length; i++) {
            let sentenceId = "sentence_" + i;
            let sentence = new Sentence(sentenceId, this.content[i]);
            sentence.addSentence(div);
        }
    }

}