// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var sampleData = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var buildingArray = sampleData.filter(sampleObj => sampleObj.id == sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
    var result = resultArray[0];


    // 2. Create a variable that holds the first sample in the metadata array.
    var result = buildingArray[0];
    console.log(result);

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var washingFrequency = sampleData.filter(sampleObj => sampleObj.wfreq == sample.wfreq);

    // Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
    
    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washingFrequency,
        title: { text: "<h2>Belly Button Washing Frequency</h2></br><h3>Scrubs Per Week</h3>" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [1, 10] },
          steps: [
            { range: [1,2], color: "red" },
            { range: [3,4], color: "orange" },
            { range: [5,6], color: "yellow" },
            { range: [7,8], color: "lightgreen" },
            { range: [9,10], color: "green" }
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 490
          }
        }
      }
    
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600, height: 450, margin: { t: 0, b: 0 } 
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
