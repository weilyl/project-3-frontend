// table
// const data = [
//   { id: 1, date: "2013-01-01", amount: 45, category: "food" },
//   { id: 2, date: "2013-02-01", amount: 50, category: "food" },
//   { id: 3, date: "2013-03-01", amount: 55, category: "food" },
//   { id: 4, date: "2013-04-01", amount: 50, category: "food" },
//   { id: 5, date: "2013-05-01", amount: 45, category: "transportation" },
//   { id: 6, date: "2013-06-01", amount: 50, category: "transportation" },
//   { id: 7, date: "2013-07-01", amount: 50, category: "transportation" },
//   { id: 8, date: "2013-08-01", amount: 52, category: "transportation" },
// ];

const assignID = () => {
  $(".update-expense")
    .attr("id", event.target.id)
    .on("click", function () {
      expense.updateExpense();
    });
};

const tabulate = (data, columns) => {
  $("#table").empty();
  let table = d3.select("#table").append("table");
  let thead = table.append("thead");
  let tbody = table.append("tbody");

  // append the header row
  thead
    .append("tr")
    .selectAll("th")
    .data(columns)
    .enter()
    .append("th")
    .text(function (column) {
      return column;
    });

  // create a row for each object in the data
  let rows = tbody.selectAll("tr").data(data).enter().append("tr");

  // create a cell in each row for each column
  let cells = rows
    .selectAll("td")
    .data(function (row) {
      return columns.map(function (column) {
        return { column: column, value: row[column] };
      });
    })
    .enter()
    .append("td")
    .text(function (d) {
      return d.value;
    });

  // update button
  let thisElement = null;

  thead.append("th").text("");
  rows
    .selectAll("td.update")
    // use a class so you don't re-select the existing <td> elements
    .data(function (d) {
      return [d];
    })
    .enter()
    .append("td")
    .attr("data-toggle", "modal")
    .attr("data-target", "#updateExpenseModal")
    .append("button")
    .attr("class", "update")
    .attr("id", function (d) {
      return d.id;
    })
    .text("update")
    .on("click", assignID);

  // delete button
  thead.append("th").text("");
  rows
    .selectAll("td.delete")
    // use a class so you don't re-select the existing <td> elements
    .data(function (d) {
      return [d];
    })
    .enter()
    .append("td")
    .append("button")
    .attr("class", "delete")
    .attr("id", function (d) {
      return d.id;
    })
    .text("delete")
    .on("click", function () {
      expense.deleteExpense();
    });

  return table;
};

// render the tables
// tabulate(data, ["date", "amount", "category"]); // 3 column table

// let data_grouped = {};

// // populate data_grouped array
// for (let i = 0; i < data.length; i++) {
//   // check if category exits in grouped array
//   // if it exists add amount
//   // if it doesn't exist create new object and set the total to that amount

//   if (data_grouped[data[i].category]) {
//     // category total in data grouped += expense amount in data
//     data_grouped[data[i].category] += data[i].amount;
//   } else {
//     // category name in data grouped object = expense amount
//     data_grouped[data[i].category] = data[i].amount;
//   }
// }

// let data_grouped_array = Object.entries(data_grouped).map((e) => ({
//   category: e[0],
//   amount: e[1],
// }));

// pie chart
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

  $("#piechart").empty();

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

  // console.log(pie);
  // return pie;
}

// pieChart(data);




// Vue.js
// const URL = this.prodURL ? this.prodURL : this.devURL;

// const expenses = 
//       fetch(`${URL}/budgets/1/expenses`, {
//         method: "GET",
//         headers: {
//           Authorization: `bearer ${login.token}`,
//         },
//       })
//         .then((response) => response.json())

// console.log("Check expenses", expenses)

new Vue({
  el: '#app',
  data() {
    return {
      headers: [{
          text: 'Date',
          value: 'date'
        },
        {
          text: 'Amount',
          value: 'amount'
        },
        {
          text: 'Category',
          value: 'category'
        }
      ],
      // expenses: expenses,
      methods : {
        const URL = this.prodURL ? this.prodURL : this.devURL;

      const expenses = 
      fetch(`${URL}/budgets/1/expenses`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${login.token}`,
        },
      })
        .then((response) => response.json())

      console.log("Check expenses", expenses)

      },

      expenses: expenses,
          
    }
  }
})

// lecture code example
const app = new Vue({
  el: "#app",
  data: {
    searchQuery: "",
    gridColumns: ["name", "power"],
    gridData: [
      { name: "Chuck Norris", power: Infinity },
      { name: "Bruce Lee", power: 9000 },
      { name: "Jackie Chan", power: 7000 },
      { name: "Jet Li", power: 8000 }
    ]
  },

  // data() {
  //   return {
  //     headers: [{
  //         text: 'Date',
  //         value: 'date'
  //       },
  //       {
  //         text: 'Amount',
  //         value: 'amount'
  //       },
  //       {
  //         text: 'Category',
  //         value: 'category'
  //       }
  //     ],
  //     expenses: expenses,
  //   }
  // },
  methods: {
    const URL = this.prodURL ? this.prodURL : this.devURL;

      const expenses = 
      fetch(`${URL}/budgets/1/expenses`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${login.token}`,
        },
      })
        .then((response) => response.json())

      toggleShow: function(){this.show = !this.show},
      addOne: function(){this.nums.push(this.nums.length + 1)},
      reset: function(){
          console.log(this.name)
          console.log(this.age)
          this.name = "";
          this.age = 0;
      },
      edit: function(event){
          const id = event.target.idy
          console.log(id)
          // fetch request
          // refetch the data
      }
  },
  beforeCreate: function(){
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
          this.posts = data
      })
  }
})

// bootstrap the demo
var demo = new Vue({
  el: "#demo",
  data: {
    searchQuery: "",
    gridColumns: ["name", "power"],
    gridData: [
      { name: "Chuck Norris", power: Infinity },
      { name: "Bruce Lee", power: 9000 },
      { name: "Jackie Chan", power: 7000 },
      { name: "Jet Li", power: 8000 }
    ]
  }
});


// test 3
data() {
  return {
      data: null
  };
},

mounted() {
  this.getData();

},

methods: {
  getData() {
      // vue-resource example
      this.$http.get('data.json', {responseType: 'json'}).then(response => {
          return response.json();
      }).then(jsonData => {
          this.data = JSON.parse(jsonData);
      }).catch(e => {
          console.log('Error', e);
      });
  }
}

// test 4
const app = new Vue({
  el: '#app',
  data: {
       variable1: 'value',
       variable2: 'value2'
       },
  methods: {
       function1: function (param) {
            console.log(param)
            },
       function2: function (param) {
            this.variable1 = param
            }
       }
  })

// test 5 
// const URL = /// logic to set URL
const URL = this.prodURL ? this.prodURL : this.devURL;

new Vue({
  el: '#app',
  data: {
      headers: [
        {
          text: 'Date',
          value: 'date'
        },
        {
          text: 'Amount',
          value: 'amount'
        },
        {
          text: 'Category',
          value: 'category'
        }
      ],
      expenses: null
    },
    methods : {
      getExpenses: function () { 
        fetch(`${URL}/budgets/1/expenses`, {
            method: "GET",
            headers: {
                Authorization: `bearer ${login.token}`,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Check expenses: ', data)
            this.expenses = data
            })
      }          
    },
    beforeMount: function () {
        this.getExpenses()
        }
    })

    

            
