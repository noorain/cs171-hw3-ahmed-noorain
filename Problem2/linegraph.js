
    var bbVis, brush, createVis, dataSet, handle, height, margin, svg, svg2, width;

    margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    width = 960 - margin.left - margin.right;

    height = 300 - margin.bottom - margin.top;

    bbVis = {
        x: 0 + 100,
        y: 10,
        w: width - 100,
        h: 100
    };

    dataSet = [];

var margin = {top: 20, right: 200, bottom: 30, left: 100},
    width = 1050 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height,100,20]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var points = [] 

var line = d3.svg.line()
    .interpolate("linear")
    .x(function(d) {  return x(d.date); })
    .y(function(d) { return y(d.temperature); });

var line2 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select("#vis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("timeline.csv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
   data.forEach(function(d) {
      d.date = parseDate("800");
    });
  var allYears = []
  data.forEach(function(d) {
    allYears.push(d.Year)
  })
  data.forEach(function(d) {
    d.date = parseDate(d.Year);
  });

  var USValues = [] , PRFValues = [] , UNValues = [] , HYDEValues = [] , MaddisonValues = []
  var USYears =[] , PRFYears = [], UNYears = [], HYDEYears = [], MaddisonYears = []
  var USMissingarray = [], PRFMissingarray = [], UNMissingarray = [], HYDEMissingarray = [], MaddisonMissingarray = []
  var USGivenObject = [], PRFGivenObject = [], UNGivenObject = [], HYDEGivenObject = [], MaddisonGivenObject = []
  var USmissingObject = [], PRFmissingObject = [], UNmissingObject = [], HYDEmissingObject = [], MaddisonmissingObject = []
  var USCombined  = [], PRFCombined  = [], UNCombined  = [], HYDECombined  = [], MaddisonCombined  = []
  var array1 = []
  //Find min/max/values/years/givenobject
  data.forEach(function(d,i) {
  if(d.UnitedStatesCensusBureau > 0){
      USValues.push(+d.UnitedStatesCensusBureau)
      USYears.push(+d.Year)
       var valueset = {'num': +d.Year, 'date': parseDate(d.Year), 'temperature': d.UnitedStatesCensusBureau}
      USGivenObject.push(valueset)
    }
   if(d.PopulationReferenceBureau > 0){
      PRFValues.push(+d.PopulationReferenceBureau)
      PRFYears.push(+d.Year)
      var valueset = {'num': +d.Year, 'date': parseDate(d.Year), 'temperature': d.PopulationReferenceBureau}
      PRFGivenObject.push(valueset)
    }
     if(d.UnitedNations > 0){
      UNValues.push(+d.UnitedNations)
      UNYears.push(+d.Year)
      var valueset = {'num': +d.Year, 'date': parseDate(d.Year), 'temperature': d.UnitedNations}
      UNGivenObject.push(valueset)
    }
     if(d.HYDE > 0){
      HYDEValues.push(+d.HYDE)
      HYDEYears.push(+d.Year)
      var valueset = {'num': +d.Year, 'date': parseDate(d.Year), 'temperature': d.HYDE}
      HYDEGivenObject.push(valueset)
    }
     if(d.Maddison > 0){
      MaddisonValues.push(+d.Maddison)
      MaddisonYears.push(+d.Year)
      var valueset = {'num': +d.Year, 'date': parseDate(d.Year), 'temperature': d.Maddison}
      MaddisonGivenObject.push(valueset)
    }

  });

    USValuesmin = d3.min(USValues)
    USValuesmax = d3.max(USValues)
    USYearmin = d3.min(USYears)
    USYearmax = d3.max(USYears)

    PRFValuesmin = d3.min(PRFValues)
    PRFValuesmax = d3.max(PRFValues)
    PRFYearmin = d3.min(PRFYears)
    PRFYearmax = d3.max(PRFYears)

    UNValuesmin = d3.min(UNValues)
    UNValuesmax = d3.max(UNValues)
    UNYearmin = d3.min(UNYears)
    UNYearmax = d3.max(UNYears)

    HYDEValuesmin = d3.min(HYDEValues)
    HYDEValuesmax = d3.max(HYDEValues)
    HYDEYearmin = d3.min(HYDEYears)
    HYDEYearmax = d3.max(HYDEYears)

    MaddisonValuesmin = d3.min(MaddisonValues)
    MaddisonValuesmax = d3.max(MaddisonValues)
    MaddisonYearmin = d3.min(MaddisonYears)
    MaddisonYearmax = d3.max(MaddisonYears)

  var USinterpolator = d3.scale.linear()
                      .domain(USYears)
                      .range(USValues)

  var PRFinterpolator = d3.scale.linear()
                      .domain(PRFYears)
                      .range(PRFValues)
  var UNinterpolator = d3.scale.linear()
  .domain(UNYears)
                      //.domain([UNYearmin,UNYearmax])
                      .range(UNValues)
  var HYDEinterpolator = d3.scale.linear()
  .domain(HYDEYears)
                      //.domain([HYDEYearmin,HYDEYearmax])
                      .range(HYDEValues)

  var Maddisoninterpolator = d3.scale.linear()
  .domain(MaddisonYears)
                      //.domain([MaddisonYearmin,MaddisonYearmax])
                      .range(MaddisonValues)
  
  // Initialize all the initial prev,next  values for each category.
  //Calculate missing values..
  prev_us_value = USValuesmin
  prev_us_year = USYearmin
  for (var i=0;i<allYears.length;i++){ 
    misy = allYears[i]
    /*if (i = 0){
      next_us_value = USValues[USYears.indexOf(prev_us_year)]
      next_us_year = USYears[USYears.indexOf(prev_us_year)+1]
    }
    if(i != allYears.length -1){
    if(USYears.indexOf(+misy) > 0){
      prev_us_value = USValues[USYears.indexOf(misy)]
      prev_us_year = misy
      next_us_value = USValues[USYears.indexOf(misy)+1]
      next_us_year =  USYears[USYears.indexOf(misy)+1]
    }
    }*/
    
    //prev = d3.max([allYears[i-1],0])
    //next = d3.min([allYears[i+1],allYears.length-1])
    //console.log("misy,prev,next", misy, prev, next)
    if( +misy> +USYearmin && +misy< +USYearmax && USYears.indexOf(+misy) < 0){
      USMissingarray.push([misy,USinterpolator(+misy)])

      var valueset = {'num': +misy, 'date': parseDate(misy), 'temperature': USinterpolator(+misy)}
      USmissingObject.push(valueset)
    }
    if( +misy> +PRFYearmin && +misy< +PRFYearmax && PRFYears.indexOf(+misy) < 0){
      PRFMissingarray.push([misy,PRFinterpolator(+misy)])
      var valueset = {'num': +misy, 'date': parseDate(misy), 'temperature': PRFinterpolator(+misy)}
      PRFmissingObject.push(valueset)
    }
    if( +misy> +UNYearmin && +misy< +UNYearmax && UNYears.indexOf(+misy) < 0){
      UNMissingarray.push([misy,UNinterpolator(+misy)])
      var valueset = {'num': +misy, 'date': parseDate(misy), 'temperature': UNinterpolator(+misy)}
      UNmissingObject.push(valueset)
    }
    if( +misy> +HYDEYearmin && +misy< +HYDEYearmax && HYDEYears.indexOf(+misy) < 0){
      HYDEMissingarray.push([misy,HYDEinterpolator(+misy)])
      var valueset = {'num': +misy, 'date': parseDate(misy), 'temperature': HYDEinterpolator(+misy)}
      HYDEmissingObject.push(valueset)
    }
    if( +misy> +MaddisonYearmin && +misy< +MaddisonYearmax && MaddisonYears.indexOf(+misy) < 0){
      MaddisonMissingarray.push([misy,Maddisoninterpolator(+misy)])
      var valueset = {'num': +misy, 'date': parseDate(misy), 'temperature': Maddisoninterpolator(+misy)}
      MaddisonmissingObject.push(valueset)
    }

  }

  console.log("USmissingObject:", USmissingObject)
  console.log("USGivenObject:", USGivenObject)

  for(var i = 0; i < USmissingObject.length; i++)
    USCombined.push(USmissingObject[i])
  for(var i = 0; i < USGivenObject.length; i++)
    USCombined.push(USGivenObject[i])
  USCombined.sort(function(a, b){return a.num-b.num})

    for(var i = 0; i < PRFmissingObject.length; i++)
    PRFCombined.push(PRFmissingObject[i])
  for(var i = 0; i < PRFGivenObject.length; i++)
    PRFCombined.push(PRFGivenObject[i])
  PRFCombined.sort(function(a, b){return a.num-b.num})

    for(var i = 0; i < UNmissingObject.length; i++)
    UNCombined.push(UNmissingObject[i])
  for(var i = 0; i < UNGivenObject.length; i++)
    UNCombined.push(UNGivenObject[i])
  UNCombined.sort(function(a, b){return a.num-b.num})

    for(var i = 0; i < HYDEmissingObject.length; i++)
    HYDECombined.push(HYDEmissingObject[i])
  for(var i = 0; i < HYDEGivenObject.length; i++)
    HYDECombined.push(HYDEGivenObject[i])
  HYDECombined.sort(function(a, b){return a.num-b.num})

    for(var i = 0; i < MaddisonmissingObject.length; i++)
    MaddisonCombined.push(MaddisonmissingObject[i])
  for(var i = 0; i < MaddisonGivenObject.length; i++)
    MaddisonCombined.push(MaddisonGivenObject[i])
  MaddisonCombined.sort(function(a, b){return a.num-b.num})
/*
  var FINAL=[{
    name: 'US',
    values: USGivenObject // USCombined //
  },{
    name: 'PRF',
    values: PRFGivenObject // PRFCombined 
},{
    name: 'UN',
    values: UNGivenObject // UNCombined 
}
,{
    name: 'HYDE',
    values: HYDEGivenObject // HYDECombined 
}
,{
    name: 'Maddison',
    values: MaddisonGivenObject // MaddisonCombined
}
];
*/
var FINAL=[
{
    name: 'US',
    values: USCombined }
    ,{
    name: 'PRF',
    values: PRFCombined }
    ,{
    name: 'UN',
    values:  UNCombined },{
    name: 'HYDE',
    values: HYDECombined },{
    name: 'Maddison',
    values: MaddisonCombined}
    ];


console.log("MAXIMUIM:", d3.max([USValuesmin,USValuesmax,PRFValuesmin,PRFValuesmax,UNValuesmin,UNValuesmax ,HYDEValuesmin,HYDEValuesmax ,MaddisonValuesmin,MaddisonValuesmax]))

  x.domain([parseDate("0"),parseDate("2050")]);
  //y.domain([0,3000000000])
  
  y.domain([0,3000000000,d3.max([USValuesmin,USValuesmax,PRFValuesmin,PRFValuesmax,UNValuesmin,UNValuesmax ,HYDEValuesmin,HYDEValuesmax ,MaddisonValuesmin,MaddisonValuesmax])]
    /*[
            d3.min(FINAL, function(c) {   if(c.name != 'Year') return d3.min(c.values, function(v) { return v.temperature; }); }),
            d3.max(FINAL, function(c) {   if(c.name != 'Year') return d3.max(c.values, function(v) { return v.temperature; }); })
          ]
          */);
var array2 = [], array3 = [], array4 = [], array5= []
var array1_missing = [] , array2_missing = [], array3_missing = [], array4_missing = [], array5_missing = []

data.forEach(function(d,i) {
if(d.UnitedStatesCensusBureau > 0)
array1.push([d.Year,d.UnitedStatesCensusBureau])
if(d.PopulationReferenceBureau > 0)
array2.push([d.Year,d.PopulationReferenceBureau])
if(d.UnitedNations > 0)
array3.push([d.Year,d.UnitedNations])
if(d.HYDE > 0)
array4.push([d.Year,d.HYDE])
if(d.Maddison > 0)
array5.push([d.Year,d.Maddison])

if(d.UnitedStatesCensusBureau < 0)
array1_missing.push([d.Year,d.UnitedStatesCensusBureau])
if(d.PopulationReferenceBureau < 0)
array2_missing.push([d.Year,d.PopulationReferenceBureau])
if(d.UnitedNations < 0)
array3_missing.push([d.Year,d.UnitedNations])
if(d.HYDE < 0)
array4_missing.push([d.Year,d.HYDE])
if(d.Maddison < 0)
array5_missing.push([d.Year,d.Maddison])

  });
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
    .attr("transform", "translate(0," + width-10000 + ")")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Census");


var findvalue = function(v){
  dis_values = []
  per_values = []
  dis_values.push(v)
  per_values.push(v)
  num_value = 0; 
  console.log("USYears.indexOf(+v)", USYears.indexOf(+v))
  if(USYears.indexOf(+v) >= 0 ){
    num1 = USValues[USYears.indexOf(+v)]
    num_value++;
  } else 
  num1 = 0
  dis_values.push(num1)
  if(PRFYears.indexOf(+v) >= 0 ){
    num2 = PRFValues[PRFYears.indexOf(+v)]
    num_value++;
  } else 
  num2 = 0
  dis_values.push(num2)
  if(UNYears.indexOf(+v) >= 0 ){
    num3 = UNValues[UNYears.indexOf(+v)]
    num_value++;
  } else 
  num3 = 0
  dis_values.push(num3)
  if(HYDEYears.indexOf(+v) >= 0 ){
    num4 = HYDEValues[HYDEYears.indexOf(+v)]
    num_value++;
  } else 
  num4 = 0
  dis_values.push(num4)
  if(MaddisonYears.indexOf(+v) >= 0 ){
    num5 = MaddisonValues[MaddisonYears.indexOf(+v)]
    num_value++;
  } else 
  num5 = 0
  dis_values.push(num5)
  console.log("num1:", num1 , "num2:", num2)
   var concensus = 0;
  if(num_value > 1)
  concensus= (num1 + num2 + num3 + num4 + num5) / num_value;

dis_values.push(concensus)


per_values.push(d3.max([0,num1/concensus]))
per_values.push(d3.max([0,num2/concensus]))
per_values.push(d3.max([0,num3/concensus]))
per_values.push(d3.max([0,num4/concensus]))
per_values.push(d3.max([0,num5/concensus]))


        var table = 
    d3.select("body").append("table");
    
  table.attr("width", 1000)
     .style("cursor", "n-resize");


  
  var thead = 
    table.append("thead")
  var  trows = thead.selectAll("tr")
          .data([1])
          .enter()
        .append("tr")
        .attr('class', function(d,i){ return "row_" + i; })
      .style("background-color", "#c4c4c4");

var tcells = trows.selectAll("td")
      .data(["Year","United StatesCensusBureau","PopulationReferenceBureau","UnitedNations","HYDE","Maddison","Average"])
      .enter()
      .append("td")
      .text(function(d,i) { return d
      //console.log("d in cells:", d); return d; 
    })
var tbody = table.append("tbody");

  var rows = 
    tbody.selectAll("tr")
          .data([1])
          .enter()
        .append("tr")
        .attr('class', function(d,i){ return "row_" + i; })
        .style("background-color", function(d, i) {
        if (i%2===0){
          return "#fff";
        }else{
          return "#c4c4c4";
        }
      })

  var cells = rows.selectAll("td")
      .data(dis_values)
      .enter()
      .append("td")
      .text(function(d,i) { return d
      //console.log("d in cells:", d); return d; 
    })

var h1 = 
    d3.select("body").append("h1")
    .text("Percentage from Average")

     
        var table = 
    d3.select("body").append("table");
    
  table.attr("width", 1000)
     .style("cursor", "n-resize");


  
  var thead = 
    table.append("thead")
  var  trows = thead.selectAll("tr")
          .data([1])
          .enter()
        .append("tr")
        .attr('class', function(d,i){ return "row_" + i; })
      .style("background-color", "#c4c4c4");

var tcells = trows.selectAll("td")
      .data(["Year","United StatesCensusBureau","PopulationReferenceBureau","UnitedNations",
        "HYDE","Maddison"])
      .enter()
      .append("td")
      .text(function(d,i) { return d
      //console.log("d in cells:", d); return d; 
    })
var tbody = table.append("tbody");

  var rows = 
    tbody.selectAll("tr")
          .data([1])
          .enter()
        .append("tr")
        .attr('class', function(d,i){ return "row_" + i; })
        .style("background-color", function(d, i) {
        if (i%2===0){
          return "#fff";
        }else{
          return "#c4c4c4";
        }
      })

  var cells = rows.selectAll("td")
      .data(per_values)
      .enter()
      .append("td")
      .text(function(d,i) { return d
      //console.log("d in cells:", d); return d; 
    })

     
      console.log("*********************")
return (" Average:" + concensus)
//d3.select(this).style("fill","red");
}

  var city = svg.selectAll(".city")
      .data(FINAL)
      .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d,i) { 
        return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });


console.log("array1:", array1)
      svg.selectAll(".point")
    .data(array1)
  .enter().append("circle")
    .attr("r", 3)
    .attr("fill", "blue")
    .attr("transform", function(d) { console.log("d:", d); return "translate(" +x(parseDate(d[0])) + "," + y(d[1])  + ")"; })
    .on("mouseover", function(d) {
            d3.select(this).style("fill", "#999");
            svg.append("text")
              .attr("x", x(parseDate(d[0])) - 70)
              .attr("y", y(d[1]) - 10 )
             .attr("font-family", "Arial")
      .attr("font-weight", "bold")
      .attr("font-size", "16px")
      .attr("fill", "blue")
      .attr("id", "tooltip")
 .html("Year:" + d[0]+  "<br />" + findvalue(d[0])+ "<br />")
})
    .on("mouseout", function(d) {
          d3.select("#tooltip").remove();
              d3.select(this).style("fill","blue");
              d3.selectAll("table").data([]).exit().remove()

              d3.selectAll("h1").data([]).exit().remove()
        })

    ///////////
    console.log("array1:", array1)
      svg.selectAll(".point")
    .data(array2)
  .enter().append("circle")
    .attr("r", 3)
    .attr("fill", "green")
    .attr("transform", function(d) { console.log("d:", d); return "translate(" +x(parseDate(d[0])) + "," + y(d[1])  + ")"; })
    .on("mouseover", function(d) {
            d3.select(this).style("fill", "#999");
            svg.append("text")
              .attr("x", x(parseDate(d[0])) - 70)
              .attr("y", y(d[1]) - 10 )
             .attr("font-family", "Arial")
      .attr("font-weight", "bold")
      .attr("font-size", "16px")
      .attr("fill", "green")
      .attr("id", "tooltip")
 .html("Year:" + d[0]+  "<br />" + findvalue(d[0])+ "<br />")
})
    .on("mouseout", function(d) {
          d3.select("#tooltip").remove();
              d3.select(this).style("fill","green");
              d3.selectAll("table").data([]).exit().remove()

              d3.selectAll("h1").data([]).exit().remove()
        })
    ////////////////

///////////
    console.log("array1:", array1)
      svg.selectAll(".point")
    .data(array3)
  .enter().append("circle")
    .attr("r", 3)
    .attr("fill", "red")
    .attr("transform", function(d) { console.log("d:", d); return "translate(" +x(parseDate(d[0])) + "," + y(d[1])  + ")"; })
    .on("mouseover", function(d) {
            d3.select(this).style("fill", "#999");
            svg.append("text")
              .attr("x", x(parseDate(d[0])) - 70)
              .attr("y", y(d[1]) - 10 )
             .attr("font-family", "Arial")
      .attr("font-weight", "bold")
      .attr("font-size", "16px")
      .attr("fill", "red")
      .attr("id", "tooltip")
 .html("Year:" + d[0]+  "<br />" + findvalue(d[0])+ "<br />")
})
    .on("mouseout", function(d) {
          d3.select("#tooltip").remove();
              d3.select(this).style("fill","red");
              d3.selectAll("table").data([]).exit().remove()

              d3.selectAll("h1").data([]).exit().remove()
        })
    ////////////////

     ///////////
    console.log("array1:", array1)
      svg.selectAll(".point")
    .data(array4)
  .enter().append("circle")
    .attr("r", 3)
    .attr("fill", "yellow")
    .attr("transform", function(d) { console.log("d:", d); return "translate(" +x(parseDate(d[0])) + "," + y(d[1])  + ")"; })
    .on("mouseover", function(d) {
            d3.select(this).style("fill", "#999");
            svg.append("text")
              .attr("x", x(parseDate(d[0])) - 70)
              .attr("y", y(d[1]) - 10 )
             .attr("font-family", "Arial")
      .attr("font-weight", "bold")
      .attr("font-size", "16px")
      .attr("fill", "yellow")
      .attr("id", "tooltip")
 .html("Year:" + d[0]+  "<br />" + findvalue(d[0])+ "<br />")
})
    .on("mouseout", function(d) {
          d3.select("#tooltip").remove();
              d3.select(this).style("fill","yellow");
              d3.selectAll("table").data([]).exit().remove()

              d3.selectAll("h1").data([]).exit().remove()
        })
    ////////////////

     ///////////
    console.log("array1:", array1)
      svg.selectAll(".point")
    .data(array5)
  .enter().append("circle")
    .attr("r", 3)
    .attr("fill", "black")
    .attr("transform", function(d) { console.log("d:", d); return "translate(" +x(parseDate(d[0])) + "," + y(d[1])  + ")"; })
    .on("mouseover", function(d) {
            d3.select(this).style("fill", "#999");
            svg.append("text")
              .attr("x", x(parseDate(d[0])) - 70)
              .attr("y", y(d[1]) - 10 )
             .attr("font-family", "Arial")
      .attr("font-weight", "bold")
      .attr("font-size", "16px")
      .attr("fill", "black")
      .attr("id", "tooltip")
 .html("Year:" + d[0]+  "<br />" + findvalue(d[0])+ "<br />")
})
    .on("mouseout", function(d) {
          d3.select("#tooltip").remove();
              d3.select(this).style("fill","black");
              d3.selectAll("table").data([]).exit().remove()

              d3.selectAll("h1").data([]).exit().remove()
        })

    ////////////////
  ///HOLES
  ////////////////////
console.log("CHEKCINMG USMissingarray", USMissingarray)
console.log("array1:", array1)
      svg.selectAll(".point")
    .data(USMissingarray)
  .enter().append("circle")
    .attr("r", 3)
    .attr("stroke", "blue")
    .style("stroke","blue")
    .style("fill","none")
    .attr("transform", function(d) { console.log("d:", d); return "translate(" +x(parseDate(d[0])) + "," + y(d[1])  + ")"; })
    .on("mouseover", function(d) {
            d3.select(this).style("fill", "none");
            svg.append("text")
              .attr("x", x(parseDate(d[0])) - 70)
              .attr("y", y(d[1]) - 10 )
             .attr("font-family", "Arial")
      .attr("font-weight", "bold")
      .attr("font-size", "16px")
      .attr("fill", "none")
      .attr("id", "tooltip")
 .html("Year:" + d[0]+  "<br />" + findvalue(d[0])+ "<br />")
})
    .on("mouseout", function(d) {
          d3.select("#tooltip").remove();
              d3.select(this).style("stroke","blue");
              d3.select(this).style("fill","none")

              d3.selectAll("table").data([]).exit().remove()

              d3.selectAll("h1").data([]).exit().remove()
        })

    ///////////
    console.log("array1:", array1)
      svg.selectAll(".point")
    .data(PRFMissingarray)
  .enter().append("circle")
    .attr("r", 3)
    .attr("fill", "none")
    .attr("stroke","green")
    .attr("transform", function(d) { console.log("d:", d); return "translate(" +x(parseDate(d[0])) + "," + y(d[1])  + ")"; })
    .on("mouseover", function(d) {
            d3.select(this).style("fill", "#999");
            svg.append("text")
              .attr("x", x(parseDate(d[0])) - 70)
              .attr("y", y(d[1]) - 10 )
             .attr("font-family", "Arial")
      .attr("font-weight", "bold")
      .attr("font-size", "16px")
      .attr("fill", "none")
      .attr("id", "tooltip")
 .html("Year:" + d[0]+  "<br />" + findvalue(d[0])+ "<br />")
})
    .on("mouseout", function(d) {
          d3.select("#tooltip").remove();
              d3.select(this).style("fill","none");
              d3.selectAll("table").data([]).exit().remove()

              d3.selectAll("h1").data([]).exit().remove()
        })
    ////////////////

///////////
    console.log("array1:", array1)
      svg.selectAll(".point")
    .data(UNMissingarray)
  .enter().append("circle")
    .attr("r", 3)
    .attr("fill", "none")
    .attr("transform", function(d) { console.log("d:", d); return "translate(" +x(parseDate(d[0])) + "," + y(d[1])  + ")"; })
    .on("mouseover", function(d) {
            d3.select(this).style("fill", "#999");
            svg.append("text")
              .attr("x", x(parseDate(d[0])) - 70)
              .attr("y", y(d[1]) - 10 )
             .attr("font-family", "Arial")
      .attr("font-weight", "bold")
      .attr("font-size", "16px")
      .attr("fill", "none")
      .attr("id", "tooltip")
 .html("Year:" + d[0]+  "<br />" + findvalue(d[0])+ "<br />")
})
    .on("mouseout", function(d) {
          d3.select("#tooltip").remove();
              d3.select(this).style("fill","none");
              d3.selectAll("table").data([]).exit().remove()

              d3.selectAll("h1").data([]).exit().remove()
        })
    ////////////////

     ///////////
    console.log("array1:", array1)
      svg.selectAll(".point")
    .data(HYDEMissingarray)
  .enter().append("circle")
    .attr("r", 3)
    .attr("fill", "none")
    .attr("transform", function(d) { console.log("d:", d); return "translate(" +x(parseDate(d[0])) + "," + y(d[1])  + ")"; })
    .on("mouseover", function(d) {
            d3.select(this).style("fill", "#999");
            svg.append("text")
              .attr("x", x(parseDate(d[0])) - 70)
              .attr("y", y(d[1]) - 10 )
             .attr("font-family", "Arial")
      .attr("font-weight", "bold")
      .attr("font-size", "16px")
      .attr("fill", "none")
      .attr("id", "tooltip")
 .html("Year:" + d[0]+  "<br />" + findvalue(d[0])+ "<br />")
})
    .on("mouseout", function(d) {
          d3.select("#tooltip").remove();
              d3.select(this).style("fill","none");
              d3.selectAll("table").data([]).exit().remove()

              d3.selectAll("h1").data([]).exit().remove()
        })
    ////////////////
console.log("FILLLLLLLLED HOLES")
     ///////////
    console.log("array1:", array1)
      svg.selectAll(".point")
    .data(MaddisonMissingarray)
  .enter().append("circle")
    .attr("r", 3)
    .attr("fill", "none")
    .attr("stroke","black")
    .attr("transform", function(d) { console.log("d:", d); return "translate(" +x(parseDate(d[0])) + "," + y(d[1])  + ")"; })
    .on("mouseover", function(d) {
            d3.select(this).style("fill", "#999");
            svg.append("text")
              .attr("x", x(parseDate(d[0])) - 70)
              .attr("y", y(d[1]) - 10 )
             .attr("font-family", "Arial")
      .attr("font-weight", "bold")
      .attr("font-size", "16px")
      .attr("fill", "none")
      .attr("id", "tooltip")
 .html("Year:" + d[0]+  "<br />" + findvalue(d[0])+ "<br />")
})
    .on("mouseout", function(d) {
          d3.select("#tooltip").remove();
              d3.select(this).style("fill","none");
              d3.selectAll("table").data([]).exit().remove()

              d3.selectAll("h1").data([]).exit().remove()
        })
    ////////////////


  ////END OF HOLES 

d3.selectAll(".filter_button").on("change", function() {
  var type = this.value, 
  // I *think* "inline" is the default.
  display = this.checked ? "inline" : "none";

  console.log("type:", type)

  var FINAL=[
{
    name: 'US',
    values: USCombined }
    ];

svg.selectAll(".city").data([]).exit().remove()
    svg.selectAll(".city")
      .data(FINAL)
      .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d,i) { 
        return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });
});




});