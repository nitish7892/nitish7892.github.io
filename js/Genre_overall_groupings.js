function Genre_overall(){

// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 90, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;




// append the svg object to the body of the page
var svg = d3.select("#genreover")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");




// Parse the Data
d3.csv("https://raw.githubusercontent.com/nitish7892/nitish7892.github.io/master/data/Genre_Overall.csv", function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Genre; }))
  .padding(0.2);
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
    .attr("y", height + 50)
    .text("Genre");

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
                    .text("Top Genre"); 

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 2000])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

  // Y label Frequency 
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -40)
    .attr("x", -150)
    .attr("transform", "rotate(-90)")
    .text("Sales");

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.Genre); })
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    // no bar at the beginning thus:
    .attr("height", function(d) { return height - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })



// Animation
svg.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.Total); })
  .attr("height", function(d) { return height - y(d.Total); })
  .delay(function(d,i){console.log(i) ; return(i*100)})


})


}

Genre_overall();
