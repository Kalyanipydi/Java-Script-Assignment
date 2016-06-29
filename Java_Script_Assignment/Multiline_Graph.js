var margin = {top: 30, right: 40, bottom: 30, left: 20},
   width = 500 - margin.left - margin.right,
   height = 300 - margin.top - margin.bottom;

 var x=d3.scale.ordinal().rangePoints([0,width]),
y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
   .orient("bottom");

var yAxis = d3.svg.axis().scale(y)
   .orient("left");

var color=d3.scale.category10();
var valueline = d3.svg.line()
   .x(function(d) { return x(d.country); })
   .y(function(d) { return y(d.vitamin); });

var svg = d3.select("body")
   .append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
   .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
       $.ajaxSetup({
         cache:false
       });

// Get the data
d3.json("graph3.json", function(error, data) {
 var xDomain=[];
 xDomain.push("");
   data.forEach(function(d) {
       d.country=d.country;
       xDomain.push(d.country);
       d.carbohydrates = parseInt(d.carbohydrates);
       d.proteins = parseInt(d.proteins);
       d.fat =parseInt(d.fat);
   });

   color.domain(d3.keys(data[0]).filter(function(key){return key !== "country";}));
    var interData = color.domain().map(function (name) {

         return {
           name :name,
           values:data.map(function(d){
             return {country:d.country,vitamin:+d[name]};
           })
         };
      });
   // Scale the range of the data
   x.domain(xDomain);
   y.domain([0, d3.max(interData, function(d) { return d3.max(d.values,function(v){return v.vitamin;}); })]);





   svg.append("g")         // Add the X Axis
       .attr("class", "x axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis);

   svg.append("g")         // Add the Y Axis
       .attr("class", "y axis")
       .call(yAxis);

       var result = svg.selectAll(".lines")
       .data(interData).enter()
       .append("g")
       .attr("class","lines");

       result.append("path")      // Add the valueline path.
           .attr("class", "line")
           .attr("d", function(d){return valueline(d.values);})
           .style("stroke",function(d){return color(d.name)});


   svg.append("text")
     		.attr("transform", "translate(" + (width+3) + "," + y(data[data.length-1].carbohydrates) + ")")
     		.attr("dy", ".35em")
     		.attr("text-anchor", "start")
     		.style("fill", "blue")
     		.text("carbo's");
  svg.append("text")
             .attr("transform", "translate(" + (width+3) + "," + y(data[data.length-1].proteins) + ")")
             .attr("dy", ".35em")
             .attr("text-anchor", "start")
             .style("fill", "red")
             .text("proteins");
   svg.append("text")
                  .attr("transform", "translate(" + (width+3) + "," + y(data[data.length-1].fat) + ")")
                  .attr("dy", ".35em")
                  .attr("text-anchor", "start")
                  .style("fill", "green")
                  .text("fat");






});
