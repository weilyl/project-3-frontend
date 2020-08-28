function pieMaker(data) {
  let data_grouped = {};

  // populate data_grouped object
  for (let i = 0; i < data.length; i++) {
    // check if category exits in grouped array
    // if it exists add amount
    // if it doesn't exist create new object and set the total to that amount

    if (data_grouped[data[i].category]) {
      // category total in data grouped += expense amount in data
      data_grouped[data[i].category] += data[i].amount;
    } else {
      // category name in data grouped object = expense amount
      data_grouped[data[i].category] = data[i].amount;
    }
  }

  // convert data_grouped object into an array of objects
  let data_grouped_array = Object.entries(data_grouped).map((e) => ({
    category: e[0],
    amount: e[1],
  }));

  //pie chart size
  let w = 600, //width
    h = 600, //height
    r = 200, //radius
    color = d3.scale.category20c(); //builtin range of colors

  document.getElementById("piechart").innerHTML = "";

  let vis = d3
    .select("#piechart")
    .append("svg:svg") //create the SVG element inside the <body>
    .data([data_grouped_array]) //associate our data with the document
    .attr("width", w) //set the width and height of our visualization (these will be attributes of the <svg> tag
    .attr("height", h)
    .append("svg:g") //make a group to hold our pie chart
    .attr("transform", "translate(" + r + "," + r + ")"); //move the center of the pie chart from 0, 0 to radius, radius

  let arc = d3.svg
    .arc() //this will create <path> elements for us using arc data
    .outerRadius(r);

  let pie = d3.layout
    .pie() //this will create arc data for us given a list of values
    .value(function (d) {
      return d.amount;
    }); //we must tell it out to access the value of each element in grouped data array

  let arcs = vis
    .selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
    .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
    .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
    .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
    .attr("class", "slice"); //allow us to style things in the slices (like text)

  arcs
    .append("svg:path")
    .attr("fill", function (d, i) {
      return color(i);
    }) //set the color for each slice to be chosen from the color function defined above
    .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function

  arcs
    .append("svg:text") //add a label to each slice
    .attr("transform", function (d) {
      //set the label's origin to the center of the arc
      //we have to make sure to set these before calling arc.centroid
      d.innerRadius = 0;
      d.outerRadius = r;
      return "translate(" + arc.centroid(d) + ")";
    }) //this gives us a pair of coordinates like [50, 50]
    .attr("text-anchor", "middle") //center the text on it's origin
    .text(function (d, i) {
      return data_grouped_array[i].category;
    }); //get the label from grouped data array

  console.log(vis);
  return vis;
}
