const budget = new Vue({
  el: "#budget",
  data: {
    budName: "", // grab input for create budget
    budAmount: null, // grab input for create budget
    devURL: "http://localhost:3000",
    prodURL: "https://squilliamp3.herokuapp.com",
    budget: null, // ?
    budget_id: null,
    updatedBudName: "", // grab input for update budget
    updatedBudAmount: null, // grab input for create budget
    loggedin: false,
  },
  methods: {
    //Create a budget
    createBudget: function () {
      // object from input
      // HTML v-model="budName" & v-model="budAmount"
      const URL = this.prodURL ? this.prodURL : this.devURL;
      const newBudget = JSON.stringify({
        name: this.budName,
        amount: this.budAmount,
      });
      // fetch request from budgets#create route
      console.log(newBudget);
      fetch(`${URL}/budgets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // only if logged in
          Authorization: `bearer ${login.token}`,
        },
        body: newBudget,
      }).then((response) => {
        heading.loggedin = true;
        this.budName = "";
        this.budAmount = null;
        this.showOneBudget();
        expense.showExpense();
      });
    },
    //Show the budget
    showOneBudget: function () {
      const URL = this.prodURL ? this.prodURL : this.devURL;
      fetch(`${URL}/budgets/1`, {
        method: "get",
        headers: {
          Authorization: `bearer ${login.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.budget = data;
          console.log(this.budget);
          // idea: make into dashboard header with related expenses
          // underneath "login.loginUN's this.budName budget: this.budAmount"
          // target an html tag with ID or class
          //
        });
    },
    //Update/edit the budget
    updateBudget: function (event) {
      const editBudget = {
        name: this.updatedBudName,
        amount: this.updatedBudAmount, // v-model="updatedBudName", etc
      };
      const budget_id = event.target.id;
      console.log(editBudget);
      fetch(`${URL}/budgets/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${login.token}`,
        },
        body: JSON.stringify(editBudget),
      })
        .then((response) => response.json())
        .then((data) => {
          this.showOneBudget();
          console.log(data);
        });
    },
    //Delete the budget
    deleteBudget: function () {
      fetch(`${URL}/budgets/1`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${login.token}`,
        },
      });
    },
  },
});

const expense = new Vue({
  el: "#expense",
  data: {
    expCategory: "",
    expDate: "",
    expAmount: null,
    devURL: "http://localhost:3000",
    prodURL: "https://squilliamp3.herokuapp.com",
    expense: null,
    updatedExpCategory: "",
    updatedExpAmount: null,
    updatedExpDate: "",
    expense_id: null,
    loggedin: false,
    //token: null
  },
  methods: {
    //Add/create an expense
    createExpense: function () {
      const URL = this.prodURL ? this.prodURL : this.devURL;
      const newExpense = JSON.stringify({
        category: this.expCategory,
        date: this.expDate,
        amount: this.expAmount,
      });

      fetch(`${URL}/budgets/2/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${login.token}`,
        },
        body: newExpense,
      }).then((response) => {
        this.expCategory = "";
        this.expAmount = null;
        this.expDate = "";
        this.showExpense();
      });
    },
    //Show the budget
    showExpense: function () {
      const URL = this.prodURL ? this.prodURL : this.devURL;
      fetch(`${URL}/budgets/2/expenses`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${login.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("here's the fetch data ", data);
          tabulate(data, ["date", "amount", "category"]);
        });
    },
    //Show Expense by Category
    showExpenseByCategory: function () {
      const URL = this.prodURL ? this.prodURL : this.devURL;
      fetch(`${URL}/budgets/2/expenses/category/${this.category}`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${login.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.expense = data;
          console.log(this.expense);
        });
    },
    //Update/edit the budget
    updateExpense: function (event) {
      const URL = this.prodURL ? this.prodURL : this.devURL;
      const editExpense = {
        category: this.updatedExpCategory,
        date: this.updatedExpDate,
        amount: this.updatedExpAmount,
      };
      const expense_id = event.target.id;
      console.log(editExpense);
      fetch(`${URL}/budgets/2/expenses/${this.expense_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${login.token}`,
        },
        body: JSON.stringify(editExpense),
      })
        .then((response) => response.JSON())
        .then((data) => {
          this.showExpense();
          console.log(data);
        });
    },
    //Delete the budget
    deleteExpense: function () {
      const URL = this.prodURL ? this.prodURL : this.devURL;
      const expense_id = event.target.id;
      fetch(`${URL}/budgets/2/expenses/18`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${login.token}`,
        },
      })
          .then(response => console.log("hi"))
    },
  },
});
const getExpenses = function () {
  const response = fetch(
    "https://squilliamp3.herokuapp.com/budgets/1/expenses",
    {
      method: "GET",
      headers: {
        Authorization: `bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.oT7kSePnYs7eVIsRIzIi0UEC7XBclsrO3qrnXwic8Zg`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
};
getExpenses();

// post-MVP for budgets
// make empty array of all budgets
// tie budgets to user
// search array of budgets for one budget in order to select ID
// show all budgets to select from them
