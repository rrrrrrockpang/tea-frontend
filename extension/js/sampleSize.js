const addInput = (displayArea) => {
    const form = $(`
        <form class="power-form">
            <div class="form-group">
                <div class="form-inline">
                    <label>Effect Size: 
                        <input type="text" class="form-control effect-size" value="0.5">
                    </label>
                </div>
                <div class="form-inline">
                    <label>alpha 
                        <input type="text" class="form-control alpha" value="0.05">
                    </label>
                </div>
                <button type="button" class="fetch-power-chart">Fetch</button>
            </div>
        </form>
    `)
    displayArea.append(form);
}

const fetchPowerChart = async (displayAreaForm) => {
    const effectSize = displayAreaForm.find('.effect-size').val();
    const alpha = displayAreaForm.find('.alpha').val();
    const request = {
        "effect_size": effectSize,
        "alpha": alpha
    }

    const response = await fetch("http://127.0.0.1:5000/power",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'http://localhost:3000'
        },
        body: JSON.stringify(request)
    });
    const data = await response.json();
    const sample = data['sample'];
    const power = data['power'];
    let arr = [];
    for(let i = 0; i < sample.length; i++) {
        arr.push({
            "sample": sample[i],
            "power": power[i],
            "d": effectSize
        })
    }

    return arr;
    // show the data
    // return [
    //     {"sample": 0, "power": 0.2, "d": 0.2},
    //     {"sample": 18, "power": 0.35, "d": 0.2},
    //     {"sample": 24, "power": 0.45, "d": 0.2},
    //     {"sample": 30, "power": 0.5, "d": 0.2},
    //     {"sample": 36, "power": 0.6, "d":0.2},
    //     {"sample": 42, "power": 0.65, "d": 0.2},
    //     {"sample": 48, "power": 0.67, "d": 0.2}
    //     ]
}

const handleSampleSizeArea = (displayArea) => {
    addInput(displayArea);
    const data = fetchPowerChart(displayArea.find('power-form'));
    console.log(data);

      var div = d3.select(displayArea[0]);
      const margin = {top: 10, right: 30, bottom: 30, left: 60},
          width = 460 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
      // append the svg object to the body of the page
      const svg = div.append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
      // Add X axis --> it is a date format
      var x = d3.scaleLinear()
          .domain([8, 48])
          .range([ 0, width ]);
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
      // Add Y axis
      var y = d3.scaleLinear()
          .domain([0, 1])
          .range([ height, 0 ]);
      svg.append("g")
          .call(d3.axisLeft(y));
      // Add the line
      svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.sample) })
            .y(function(d) { return y(d.power) })
            )
    }