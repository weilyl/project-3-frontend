const testdata = [
  { id: 1, date: "2013-01-01", amount: 45, category: "food" },
  { id: 2, date: "2013-02-01", amount: 50, category: "food" },
  { id: 3, date: "2013-03-01", amount: 55, category: "food" },
  { id: 4, date: "2013-04-01", amount: 50, category: "food" },
  { id: 5, date: "2013-05-01", amount: 45, category: "transportation" },
  { id: 6, date: "2013-06-01", amount: 50, category: "transportation" },
  { id: 7, date: "2013-07-01", amount: 50, category: "transportation" },
  { id: 8, date: "2013-08-01", amount: 52, category: "transportation" },
];

const assignID = () => {
  d3.select(".update-expense")
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

// tabulate(testdata, ["date", "amount", "category"]); // 3 column table
