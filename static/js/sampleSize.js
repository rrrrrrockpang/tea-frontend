const SAMPLE_SIZE_ID = "sample_size";
const SAMPLE_SIZE_PLUGIN_ID = SAMPLE_SIZE_ID + "_preregistea";
const SAMPLE_SIZE_BTN_ID = SAMPLE_SIZE_ID + "_initial_btn";
const SAMPLE_SIZE_TEXTAREA_NODE = $("[name='text6']");
const SAMPLE_SIZE_PARENT_SECTION = SAMPLE_SIZE_TEXTAREA_NODE.parent().parent().parent();

const SAMPLE_SIZE_DESCRIPTION =
    "Determine Sample Size with a power analysis."

const DEFAULT_EFFECT_SIZE = 0.8;
let studyEffectSize = 0.4;
let studySampleSize = 13;
let confidenceInterval = 0.05;

// graph defaults
const margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 500 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

const x = d3.scaleLinear()
        .domain([5, 100])
        .range([ 0, width ]);

const y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0 ]);

let zval = normal_quantile(0.05/2) + 0.4*Math.sqrt(5);
console.log(normal_quantile(0.05/2) + 0.4*Math.sqrt(5))
console.log(normal_cdf(zval))
// // zval = normal_quantile(alpha/sides) + nonctr*Math.sqrt(ss)
// // power =normal_cdf(zval)
// // form.power.value = format(power,2)
const calcPower = (sample, effect, alpha=0.05, two_side=2.0) => {
    // console.log(alpha, two_side, effect, sample);
    effect = 2 * effect.toFixed(3)
    let zval = normal_quantile(alpha/two_side) + effect*Math.sqrt(sample);
    return normal_cdf(zval);
}

const addSampleSizePreregistea = () => {
    const preregistea = createPreregisteaForm(SAMPLE_SIZE_PLUGIN_ID, SAMPLE_SIZE_DESCRIPTION);
    preregistea.append("<br />");
    SAMPLE_SIZE_PARENT_SECTION.prepend(preregistea);

    const inputarea = preregistea.find(".inputarea");
    const displayarea = preregistea.find(".displayarea");

    inputarea.append(createPowerInputForm());
    displayarea.append(createPowerChart());

    inputarea.find(".effect-radio input[type='radio']").on("change", function() {
        const effect = $(".effect-radio input[type='radio']:checked").val();
        $("#effectSizeNumber").val(effect);
    })

    const inputBtn = createAnalysisBtn();
    inputarea.append(inputBtn);
}

const createAnalysisBtn = () => {
    const initialBtn = createInitialButton(SAMPLE_SIZE_BTN_ID, "OK");
    initialBtn.on("click", function() {
        if(studySampleSize === 0) {
            alert("You might want to avoid effect size that's too big or too small.");
            return;
        }

        updateSampleSizeTextArea(studyEffectSize, studySampleSize);
    });
    return initialBtn;
}

const updateSampleSizeTextArea = (effectSize, sampleSize) => {
    // const original = SAMPLE_SIZE_TEXTAREA_NODE.val();
    // let newText = (original.length === 0) ? "" : "\n";

    newText = `A prospective power analysis was performed for sample size determination based on Cohen's conventional effect size f = ${effectSize}. We achieved at least 0.8 under α = 0.05 within ${sampleSize} participants per condition.`
    SAMPLE_SIZE_TEXTAREA_NODE.val(newText);
}

const createPowerInputForm = () => {
    return $(`<form class='inputarea-form'>
                        <div class="form-group">
    
                            <div class="form-inline effect-radio">
                                <label for="effectSizeNumber">Cohen's <i>f</i> &nbsp;
                                    <input type="number" id="effectSizeNumber" name="effectSizeNumber" min="0" max="0.99" step="0.05" value="0.4" size="4">
                                    with a margin of &#177;
                                    <input type="number" id="confidenceInterval" name="confidenceInterval" min="0" value="0.05" size="3">
                                </label>
                                <label class='form-check-label'><input class='form-check-input' type='radio' name='effectSizeRadios' value='0.10'>
                                    Small Effect (0.1)
                                </label>
                                <label class='form-check-label'><input class='form-check-input' type='radio' name='effectSizeRadios' value='0.25'>
                                    Medium Effect (0.25)
                                </label>
                                <label class='form-check-label'><input class='form-check-input' type='radio' name='effectSizeRadios' value='0.40' checked>
                                    Large Effect (0.4)
                                </label>
                            </div>
                            
                            <div class="sample-size-text-display" style="border-top: 1px solid black">
                            13 participants yield at least a power of 0.80 at the effect size Cohen's <i>f</i> = 0.4.
                            </div>
                        </div>
                    </form>`);
}

const createPowerChart = () => {
    const display = $(`<div class="power-analysis"></div>`)
    let graph = d3.select(display[0]);

    const svg = graph.append("svg")
        .attr("width", width + 200 + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add dash line
    svg.append("line")
        .attr("class", "reference")
        .style("stroke", "red")
        .style("stroke-dasharray", ("3, 3"))
        .attr("x1", 0)
        .attr("y1", y(0.8))
        .attr("x2", width)
        .attr("y2", y(0.8));

    function update(number) {
        d3.selectAll(".power-line").remove();

        let focus = svg
            .append('g')
            .append('circle')
            .style("fill", "none")
            .attr("class", "power-line")
            .attr("stroke", "black")
            .attr('r', 4)
            .style("opacity", 0)

        let focusText = svg
            .append('g')
            .append('text')
            .style("opacity", 0)
            .attr('class', 'power-line')
            .attr("text-anchor", "left")
            .attr("alignment-baseline", "middle")

        svg.append('rect')
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('class', 'power-line')
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseout', mouseout);

        const filtered = df(number);
        svg.append("path") // Confidence Interval
            .datum(filtered)
            .attr("class", "power-line")
            .attr("fill", "#69b3a2")
            .attr("fill-opacity", .3)
            .attr("stroke", "none")
            .attr("d", d3.area()
                .x(function (d) {
                    return x(d.sample)
                })
                .y0(function (d) {
                    return y(d.lower)
                })
                .y1(function (d) {
                    return y(d.higher)
                })
            )

        svg.append('g').append("path")
            .datum(filtered)
            .attr("class", "power-line")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) {
                    return x(d.sample)
                })
                .y(function (d) {
                    return y(d.power)
                })
            );

        function mouseover() {
            focus.style("opacity", 1)
            focusText.style("opacity", 1)
        }

        function mousemove(event) {
            // recover coordinate we need
            var x0 = x.invert(d3.pointer(event)[0]);
            var i = bisect(filtered, x0, 1);
            selectedData = filtered[i]
            focus
                .attr("cx", x(+selectedData.sample))
                .attr("cy", y(+selectedData.power))
            focusText
                .html("Size:" + selectedData.sample + "  -  " + "Power:" + Math.round(selectedData.power * 100) / 100)
                .attr("x", x(+selectedData.sample) + 15)
                .attr("y", y(+selectedData.power))
        }

        function mouseout() {
            focus.style("opacity", 0)
            focusText.style("opacity", 0)
        }
    }

    update(0.4);
    d3.select("#effectSizeNumber").on("change", function(d) {
        const effectSize = parseFloat($("#effectSizeNumber").val());
        const powers = df(effectSize, confidenceInterval);
        let sample_size = 0;
        for(let i = 0; i < powers.length - 1; i++) {
            if(powers[i].power < 0.8 && powers[i+1].power > 0.8) {
                sample_size = powers[i+1].sample;
                break
            }
        }
        studySampleSize = sample_size;
        studyEffectSize = effectSize;

        if(powers[0].power > 0.8) {
           $(".sample-size-text-display").html("The effect size is too big.");
        } else if(studySampleSize === 0) {
            $(".sample-size-text-display").html("You might want to change to a bigger effect size.");
        } else {
            $(".sample-size-text-display").html(`${studySampleSize} participants yield at least a power of 0.80 at the effect size Cohen's <i>f</i> = ${studyEffectSize}.`)
        }

        $(".sample-size-text-display").show();

        let number = d3.select("#effectSizeNumber").property("value");
        update(parseFloat(number));
    })

    d3.selectAll(".effect-radio input[type='radio']").on("change", function(d) {
        let number = d3.select(".effect-radio input[type='radio']:checked").property("value");
        console.log(number);

        update(parseFloat(number));
    })

    return display;
}

// helper to find the data and confidence interval
// const filterNumber = (number) => {
//     let lower = power_data.filter(function(d) {
//         const n = number - 0.05;
//         return Math.abs(d.effect - n) < Number.EPSILON;
//     })
//
//     let higher = power_data.filter(function(d) {
//         const n = number + 0.05;
//         return Math.abs(d.effect - n) < Number.EPSILON;
//     })
//
//     let dataFilter = power_data.filter(function(d) {
//         return d.effect === number;
//     });
//
//     dataFilter = dataFilter.map(function(d, i) {
//         d.lower = lower[i].power;
//         d.higher = higher[i].power;
//         return d
//     })
//
//     return dataFilter;
// }


// helper
var bisect = d3.bisector(function(d) { return d.sample; }).left;


const df = (effectSize, confidence = 0.05, alpha=0.05) => {
    const lower_sample = 5, higher_sample = 100;
    let data = [];
    for(let i = lower_sample; i < higher_sample; i++) {
        let obj = {};
        obj.sample = i;
        obj.power = calcPower(i, effectSize, alpha);
        obj.lower = calcPower(i, effectSize - confidence, alpha);
        obj.higher = calcPower(i, effectSize + confidence, alpha);
        data.push(obj);
    }
    return data;
}






















