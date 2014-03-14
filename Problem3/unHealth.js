

var bbDetail, bbOverview, dataSet, svg;

var margin_outer = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

var width = 960 - margin_outer.left - margin_outer.right;

var height = 800 - margin_outer.bottom - margin_outer.top;
console.log("Height11111", height)
//bbOverview
margin  = {
    x: 100,
    y: 30,
    w: width,
    h: 50
};
//bbDetail 
margin2 = {
    x: 100,
    y: 100,
    w: width,
    h: 300
};

height2 = 100; //500 - margin_outer.bottom - margin_outer.top;

var format = d3.time.format("%a %b %d %H:%M:%S IST %Y");

dataSet = [];

svg = d3.select("#visUN").append("svg").attr({
    width: width + margin_outer.left + margin_outer.right,
    height: height + margin_outer.top + margin_outer.bottom
})
//.append("g").attr({
  //      transform: "translate(" + margin.left + "," + margin.top + ")"
    //});


d3.csv("unHealth.csv", function(data) {

});

var convertToInt = function(s) {
    return parseInt(s.replace(/,/g, ""), 10);
};

var parseDate = d3.time.format("%B %Y").parse;

var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, height2 ]),
    y2 = d3.scale.linear().range([height2, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom"),
yAxis2 = d3.svg.axis().scale(y2).orient("left");
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brushed);

var area = d3.svg.area()
    //.interpolate("monotone")
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.price); });

var area2 = d3.svg.area()
    //.interpolate("monotone")
    .x(function(d) { return x2(d.date); })
    .y0(height2)
    .y1(function(d) { return y2(d.price); });
/*
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
*/

/*var line = d3.svg.line()
    .interpolate("linear")
    .x(function(d) {  return x(d.date); })
    .y(function(d) { return y(d.temperature); });
*/
var color = d3.scale.category10();


svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

var focus = svg.append("g")
    .attr("class", "focus")
//    .attr("transform", "translate(" + margin_outer.left + "," + margin_outer.top + ")");
    .attr("transform", "translate(" + margin.x + "," + 20 + ")");


var context = svg.append("g")
    .attr("class", "line")
    .attr("transform", "translate(" + margin2.x + "," + 10 + ")");

d3.csv("womens.csv", type, function(error, data) {
  x.domain(d3.extent(data.map(function(d) { return d.date; })));
  y.domain([0, d3.max(data.map(function(d) { return d.price; }))]);
  x2.domain(x.domain());
  y2.domain(y.domain());


var array1 = []
  data.forEach(function(d) {
    console.log("dataforeachDD", d)
   
array1.push([d.date,d.price])
  });



  console.log("array1:", array1)



  focus.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

  focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  focus.append("g")
      .attr("class", "y axis")
      .call(yAxis);
      

  context.append("path")
      .datum(data)
     .attr("class", "line")
      .attr("d", area2);

  context.selectAll(".point")
    .data(array1)
  .enter().append("circle")
    .attr("r", 3)
    .attr("cx",function(d){ console.log("D in cx:", d); return x2(d[0]);})
    .attr("cy", function(d){ return y2(d[1]);})

  context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

  context.append("g")
      .attr("class", "y axis")
      .call(yAxis2)
//      .attr("transform", "translate(0," + 10 + ")");

  context.append("g")
      .attr("class", "brush")
      .call(brush)
      //.call(brush.extent([parseDate("September 2010"),parseDate("September 2011")]))

       .call(brush.event)
    .selectAll("rect")
      .attr("y", 0)
      .attr("height", height2-1);


 

focus.selectAll(".point")
    .data(array1)
  .enter().append("circle")
    .attr("r", 3)
    .attr("cx",function(d){ console.log("D in cx:", d); return x(d[0]);})
    .attr("cy", function(d){ return y(d[1]);})
 
   

    //.attr("transform", function(d) { return "translate(" + d + ")"; });
/*

    var circlegroup = focus.append("g");
    circlegroup.attr("clip-path", "url(#clip)");
    circlegroup.selectAll('.dot')
    .data(array1)
    .enter().append("circle")
    .attr('class', 'dot')
    .attr("cx",function(d){ return x(format.parse(d3.keys(d)[0]));})
    .attr("cy", function(d){ return y(d3.values(d)[0]);})
    .attr("r", function(d){ return 4;})
    .on('mouseover', function(d){ d3.select(this).attr('r', 8)})
    .on('mouseout', function(d){ d3.select(this).attr('r', 4)});

*/
  
  var reorder = function(d,i){
    if(i == 0){
    context.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.extent([parseDate("September 2010"),parseDate("September 2011")]))

       .call(brush.event)
    }else{
      context.append("g")
      .attr("class", "brush")
      .call(brush)
      .call(brush.extent([parseDate("September 2011"),parseDate("September 2012")]))

       .call(brush.event)
    
    }


  }
d3.selectAll("input").on("change", reorder);

});

function brushed() {
  console.log("Brushed")
  //focus.selectAll("circle").data([]).exit().remove()
  x.domain(brush.empty() ? x2.domain() : brush.extent());
  
  //x.domain([parseDate("2011"),parseDate("2012")]);
  focus
  .attr("transform", "translate(" + margin.x + "," + 30 + ")")
  .select(".area")
  //.attr("transform", "translate(" + margin.x + "," + 0 + ")")
  .attr("d", area)
  focus.select(".x.axis").call(xAxis);

focus.selectAll("circle")
 .attr("r", 2)
 .attr("clip-path", "url(#clip)")
 //.attr("transform", "translate(" + margin.x + "," + 10 + ")")
    .attr("cx",function(d){ console.log("D in cx111:", d); return x(d[0]);})
    .attr("cy", function(d){ return y(d[1]);})

}


function updateDots() {
    var dots = svg.selectAll('.dot')
        .data(xDim.top(Infinity));
    
    dots
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('r', 2)
        .attr('fill', 'lime');
    
    dots
        .attr('cx', function(d) { return xScale(d[0]); })
        .attr('cy', function(d) { return yScale(d[1]); });
    
    dots.exit().remove();
}

function type(d) {
  d.date = parseDate(d.date);
  d.price = +d.price;
  return d;
}
