const app = new Vue({
  el: "#app",
  data: {
    hello: "Hello Squilliam!",
  },
});


// table
var data = [
  { "date" : '2013-01-01', "amount" : 45, "category" : "food" },
  { "date" : '2013-02-01', "amount" : 50, "category" : "food" },
  { "date" : '2013-03-01', "amount" : 55, "category" : "food" },
  { "date" : '2013-04-01', "amount" : 50, "category" : "food" },
  { "date" : '2013-05-01', "amount" : 45, "category" : "food" },
  { "date" : '2013-06-01', "amount" : 50, "category" : "food" },
  { "date" : '2013-07-01', "amount" : 50, "category" : "transportation" },
  { "date" : '2013-08-01', "amount" : 52, "category" : "transportation" }
]
		
function tabulate(data, columns) {
	var table = d3.select('body').append('table')
	var thead = table.append('thead')
	var	tbody = table.append('tbody');

	// append the header row
	thead.append('tr')
	  .selectAll('th')
	  .data(columns).enter()
	  .append('th')
	    .text(function (column) { return column; });

	// create a row for each object in the data
	var rows = tbody.selectAll('tr')
	  .data(data)
	  .enter()
	  .append('tr');

	// create a cell in each row for each column
	var cells = rows.selectAll('td')
	  .data(function (row) {
	    return columns.map(function (column) {
	      return {column: column, value: row[column]};
	    });
	  })
	  .enter()
	  .append('td')
	    .text(function (d) { return d.value; });

  return table;
};

// render the tables
tabulate(data, ['date', 'amount', 'category']); // 3 column table

var data_grouped = 
  { 
  
}


for (let i=0; i<data.length; i++) {
  // check if category exits in grouped array
  // if it exists add amount
  // if it doesn't exist create new object and set the total to that amount
  
  if (data_grouped[data[i].category])  {
    // category total in data grouped += expense amount in data
    data_grouped[data[i].category] += data[i].amount
  } 
  else {
    // category name in data grouped object = expense amount
    data_grouped[data[i].category] = data[i].amount
  }
}

console.log(data_grouped)

let data_grouped_array = Object.entries(data_grouped).map((e) => ( { category:e[0], amount:e[1] } ));

console.log(data_grouped_array)

// pie chart
var w = 600,                            //width
    h = 600,                            //height
    r = 200,                            //radius
    color = d3.scale.category20c();     //builtin range of colors
    
    var vis = d3.select("body")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data_grouped_array])     //associate our data with the document
        .attr("width", w)               //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", h)
        .append("svg:g")                                      //make a group to hold our pie chart
        .attr("transform", "translate(" + r + "," + r + ")")  //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()                                    //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()                                 //this will create arc data for us given a list of values
        .value(function(d) { return d.amount; });             //we must tell it out to access the value of each element in grouped data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g")                    //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr("class", "slice");            //allow us to style things in the slices (like text)

        arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } )         //set the color for each slice to be chosen from the color function defined above
        .attr("d", arc);                                            //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs.append("svg:text")                                     //add a label to each slice
        .attr("transform", function(d) {                            //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.innerRadius = 0;
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";})                      //this gives us a pair of coordinates like [50, 50]
        .attr("text-anchor", "middle")                                      //center the text on it's origin
        .text(function(d, i) { return data_grouped_array[i].category; });   //get the label from grouped data array
        


// line graph !!!!!!!!
// Set the dimensions of the canvas / graph
// var margin = {top: 30, right: 20, bottom: 30, left: 50},
//     width = 600 - margin.left - margin.right,
//     height = 270 - margin.top - margin.bottom;

// // Parse the date / time
// var parseDate = d3.time.format("%d-%b-%y").parse;

// // Set the ranges
// var x = d3.time.scale().range([0, width]);
// var y = d3.scale.linear().range([height, 0]);

// // Define the axes
// var xAxis = d3.svg.axis().scale(x)
//     .orient("bottom").ticks(5);

// var yAxis = d3.svg.axis().scale(y)
//     .orient("left").ticks(5);

// // Define the line
// var valueline = d3.svg.line()
// 	.x(function(d) { return x(d.dates); })    //  <= Change to dates
//     .y(function(d) { return y(d.amount); });
    
// // Adds the svg canvas
// var svg = d3.select("body")
//     .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//         .attr("transform", 
//               "translate(" + margin.left + "," + margin.top + ")");

// // Get the data
// d3.csv("data.csv", function(error, data) {
//     data.forEach(function(d) {
// 		d.dates = parseDate(d.date);    //  <= Change to dates
//         d.amount = +d.amount;
//     });

//     // Scale the range of the data
// 	x.domain(d3.extent(data, function(d) { return d.dates; }));//<=dates
//     y.domain([0, d3.max(data, function(d) { return d.amount; })]);

//     // Add the valueline path.
//     svg.append("path")
//         .attr("class", "line")
//         .attr("d", valueline(data));

//     // Add the X Axis
//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis);

//     // Add the Y Axis
//     svg.append("g")
//         .attr("class", "y axis")
//         .call(yAxis);
// });
