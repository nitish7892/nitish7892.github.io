function Top_platform_breakdown(){


// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 90, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#platbreakdown")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/nitish7892/nitish7892.github.io/master/data/Platform_Overallgroupings_top10.csv", function(data) {

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function(d){return(d.Platform)}).keys()

  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");


 svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width  - 500)
    .attr("y", height + 70)
    .text("Platform");


  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 1400])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

                        svg
    .append("line")
      .attr("x1", 50)
      .attr("x2", 50 )
      .attr("y1", 0)
      .attr("y2", 200)
      .attr("stroke", "grey")
      .attr("stroke-dasharray", "4");



    svg
    .append("line")
      .attr("x1", 0)
      .attr("x2", 1000 )
      .attr("y1", 220)
      .attr("y2", 220)
      .attr("stroke", "grey")
      .attr("stroke-dasharray", "4");

svg.append("text")
                    .attr("x", 800)             
                    .attr("y", 220)
                    .attr("text-anchor", "left")  
                    .style("font-size", "15px")
                    .text("Median Sales"); 

svg.append("text")
                    .attr("x", 60)             
                    .attr("y", 15)
                    .attr("text-anchor", "left")  
                    .style("font-size", "15px")
                    .text("Top Platform"); 



        svg
    .append("line")
      .attr("x1", 200)
      .attr("x2", 500 )
      .attr("y1", 150)
      .attr("y2", 20)
      .attr("stroke", "grey")
      .attr("stroke-dasharray", "4");

      svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -40)
    .attr("x", -150)
    .attr("transform", "rotate(-90)")
    .text("Sales");

      svg.append("text")
                    .attr("x", 400)             
                    .attr("y", 20)
                    .attr("text-anchor", "left")  
                    .style("font-size", "15px")
                    .text("Very small Japan XBox360 Sales"); 

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#C7EFCF','#FE5F55','#EEF5DB'])

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)




  // ----------------
  // Create a tooltip
  // ----------------
  var tooltip = d3.select("#platbreakdown")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    var subgroupName = d3.select(this.parentNode).datum().key;
    var subgroupValue = d.data[subgroupName];
    tooltip
        .html("subgroup: " + subgroupName + "<br>" + "Value: " + subgroupValue)
        .style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .style("left", (d3.event.pageX + 10) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      .style("top", (d3.event.pageY - 15) + "px")
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
  }




  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.Platform); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
        .attr("stroke", "grey")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

})

}

 Top_platform_breakdown();

