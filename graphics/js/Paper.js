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

// We designed our first experiment to measure differences in
// how people perceive the same effect when it is communicated
// in one of two conventional formats: a) means and standard
// errors, which focus on uncertainty in measuring the mean
// and b) means and standard deviations, which present information
// about variation in individual outcomes around the mean.
// Specifically, we compare error bars that show 95% CIs (using
// 1.96 standard errors), as in Figure 1a, to error bars that show
// 95% PIs (using 1.96 standard deviations), as in Figure 1b.

// In theory these presentations contain the same information
// about the underlying data so long as one knows the sample
// size, but the former focuses on inferential uncertainty whereas
// the latter emphasizes outcome uncertainty. We are interested
// in how people’s perceptions of treatment effectiveness compare when they are shown only one of these two graphical
// formats. In particular, estimating the sample standard deviation from visualizations like Figure 1a requires the reader
// to inflate the error bars by the (square root of the) sample
// size. As this seems difficult for even sophisticated readers, we
// imagined that people would perceive different effect sizes for
// visualizations shown in format a) compared to format b).

// We also used this experiment to investigate whether differences between visualization formats can be mitigated by simply adding extra text in the captions that appear alongside a
// given figure. For instance, it is not uncommon for a scientific
// paper to summarize both sample statistics as well as inferential
// statistics in text, but to visualize only one of these. Perhaps
// simply adding information about 95% PIs in the caption for
// a plot showing 95% CIs changes the inferences readers make
// about the distribution of outcomes under the treatment while
// still communicating information about inferential uncertainty.
// Before running the experiment, we formulated and preregistered1 the following hypotheses:

// H1. Willingness to pay. Participants who are shown visualizations with 95% CIs will exhibit different willingness to pay
// for the same treatment compared to those who are shown
// 95% PIs.

// H2. Probability of superiority. Participants who are shown
// visualizations with 95% CIs will report different estimates
// for the probability that undergoing the treatment provides a
// benefit over a control condition.

// We examined these hypotheses for two caption alternatives:
// when the figure caption matched the information in the visualization, and when the figure caption contained extra information beyond what is directly shown in the visualization.

// Experimental Design
// To test these hypotheses, we created a scenario that we deemed
// would be easily understandable by laypeople and representative of many situations where one uses analytical results to
// decide whether to make an investment or take a precaution. We
// presented the information in this scenario in different formats,
// and measured differences in how people perceived the effect of
// the treatment. Specifically, we told participants that they were
// athletes competing in a boulder sliding game, playing against
// an equally skilled competitor named Blorg. The goal of the
// game is to slide a boulder on ice farther than the opponent’s
// boulder. There is an all-or-nothing 250 Ice Dollar prize for the
// contestant who slides their boulder the farthest. Participants
// were given the opportunity to rent a superior boulder (i.e.,
// undergo a treatment) that is expected (but not guaranteed) to
// increase their sliding distance for their next and final competition. They were then shown a visualization that provided
// statistics about both the standard and special boulders with an
// accompanying caption. Finally, they were asked how much
// they were willing to pay for the special boulder and to estimate
// the probability of winning if they used it.

// We manipulated the information shown to participants in a 2 x
// 2 design that varied both the visualization and text that they
// saw. Participants were randomly assigned to see a figure with
// either 95% CIs or 95% PIs, and were independently randomly
// assigned to see an accompanying caption that was either specific to the visualization they were shown or that contained
// extra information beyond what was directly presented in the
// visualization. Crossing these two levels of visualization and
// accompanying explanation created the four between-subjects
// conditions in our experiment. Screenshots of all conditions
// are provided in the supplemental material.

// Data & Stimuli
// We constructed the stimuli in our experiment to correspond
// to a Cohen’s d of approximately 0.25 and a probability of
// superiority of 57%, typical of the effect sizes observed in
// fields such as psychology, neuroscience, and medicine [5, 7,
// 8]. We achieved this using the following parameters for the
// standard and special boulder: slides from the standard boulder
// were normally distributed with a mean of 100 meters and a
// standard deviation of 15.3 meters, whereas slides from the
// special boulder had the same standard deviation but a mean
// of 104 meters. We chose a standard deviation of 15.3 meters
// so that the 95% PI, derived from 1.96 standard deviations
// above and below the mean, would span an easily readable,
// round number range of 70 to 130 meters. We then took 1,000
// samples from each of these distributions and used them to
// compute 95% CIs on the mean and 95% PIs on individual
// outcomes for each of the boulders. We plotted the results
// and matched the number of tick marks on the vertical axis,
// as shown in Figures 1a and 1b. We eschewed bar charts to
// prevent “within-the-bar bias” [11]. We created captions to
// explain the mean, 95% PI, and 95% CI, and phrased each of
// these in terms of what would happen during 1,000 potential
// future slides of each boulder.

// Participants
// We recruited 2,400 participants from Amazon’s Mechanical
// Turk to take part in the experiment. We chose this sample
// size based on the results of a previous pilot, so that we had
// approximately 80% power in detecting differences between
// conditions at a 5% significance level. Removing the 49
// participants who participated in both the previous pilot and
// this experiment left us with 2,351 participants. All participants
// were located in the U.S. with Mechanical Turk approval
// ratings of 97% or above. Participants were randomly assigned
// to one of the four conditions (95% CI w/ matching text, n
// = 569; 95% CI w/ extra text, n = 584; 95% PI w/ matching
// text, n = 647; 95% PI w/ extra text, = 551). Each participant
// received a flat payment of $0.75.

// Procedure
// Participants were first presented with the rules of the game
// described above, and told that they had the option to rent the
// special boulder for a one-time use. The instructions indicated
// that it was within the rules of the game for them to rent the
// special boulder, and that they could be assured that their opponent would not have access to it and would instead use a
// standard boulder. On the next screen they were shown text
// with statistics about the standard boulder as per the condition
// they were randomly assigned to. They were also told that there
// was no reason to believe that they would have an advantage
// over Blorg (or vice versa) if they chose the standard boulder.
// Both screens required that they checked a box to confirm that
// they understood the information presented to them.

// On the third screen they saw text with statistics about the
// special boulder, along with a visualization that summarized
// the information about the standard and special boulder, as
// per the condition they had been assigned to. Below this they
// were asked for their willingness to pay for the special boulder.
// Participants responded by moving a slider that ranged from
// 0 to 250 Ice Dollars and was initialized at the 250 Ice Dollar
// mark to encourage people to respond with the most they were
// willing to pay. They were required to move the slider from its
// default value before they could submit a response.

// After they submitted their response to this question, participants were asked to estimate the probability of superiority
// for both the standard and special boulders. Estimating the
// probability of superiority for the standard boulder served as
// an attention check, as it should have been clear from the previous screens that the probability of winning with the standard
// boulder was 50%. Participants responded to each question by
// typing a whole number between 0 and 100, inclusive, for each
// question. This concluded the experiment