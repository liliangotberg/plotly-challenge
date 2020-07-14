// create interactive dashboard to explore sample.json dataset. dataset looks at Belly Button Biodiversity data that lists a sample of microvial species, aka operational taxonomic units (OTU)
// a start with "init" function
// use samples.json file containing data, in dict format
// define variables to use for display values in dashboard, use camelTypeStyle
// remember that we need to cast/convert values as needed

function init(i) {
    const belly = "samples.json";
    d3.json(belly).then(function(data) {
        var testSubNames = data.names;
        console.log(testSubNames);
        var sampleValues = data.samples[i].sample_values;
        console.log(sampleValues);
        var otuIDs = data.samples[i].otu_ids;
        console.log(otuIDs);
        var otuIDStr = otuIDs.map(d => "OTU" + d);
        console.log(otuIDStr);
        var otuLabels = data.samples[i].otu_labels;
        console.log(otuLabels);
        var panelMetadata = data.metadata[i];
        console.log(panelMetadata);

        // create and label dropdown menu for test subject id info
        // create and label corresponding demo panel section  
        var panelDropdown = d3.select("#selDataset")
        for (i in testSubNames) {
            var newPanelDropdownOption = panelDropdown.append("option")
            newPanelDropdownOption.text(testSubNames[i]);
        }


        // connect id with metadata from html
        // clear demo panel between subjects ID
        // append a return key:value pair from metadata array

        var mdPanel = d3.select("#sample-metadata");
        mdPanel.html("");
        Object.entries(panelMetadata).forEach(function([key, value]) {
            var row = mdPanel.append("p");
            row.text(`${key.toUpperCase()} :${value}`)

        })

        // create variables for horizontal bar chart and use .slice method to return top 10 values for each subject
        var barData = [{
            x: sampleValues.slice(0, 10).reverse(),
            y: otuIDStr,
            text: otuLabels.slice(0, 10).reverse(),
            orientation: "h",
            marker: {
                color: "red"
            },
            type: "bar"
        }]

        // create labels and title for horizontal bar chart 
        var barLayout = {
            xaxis: { title: "Test Subject Sample Values" },
            yaxis: { title: "Test Subject OTU IDs" },
            title: "Top 10 Operational Taxonomic Units (OTU) IDs"
        }

        // define and label plot chart
        Plotly.newPlot("bar", barData, barLayout);

        // create variable and labels for bubble chart 
        var bubble = {
            x: otuIDs,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIDs
            }
        };
        var bubbleData = [bubble];
        var layout = {
            title: "Belly Button Bacteria Type",
            xaxis: { title: "Operational Taxonomic Units (OTU) ID" }
        };

        // plot bubble chart
        Plotly.newPlot('bubble', bubbleData, layout);
    })
}

// create function to updata charts
// connect data to subject as user toggles through entries
function optionChanged(d) {
    const belly = "samples.json";
    d3.json(belly).then(function(data) {
        var testSubNames = data.names;
        const isNumber = (element) => element === d;
        var indx = (testSubNames.findIndex(isNumber));
        d3.selectAll("td").remove();
        d3.selectAll("option").remove();
        var panelDropdown = d3.select("#selDataset")
        panelDropdown.append("option").text(d);
        init(indx);
    });
}

//initialize dashboard charts/displays
init(0);