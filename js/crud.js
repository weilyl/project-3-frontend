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
      // console.log(this.budName);
      // console.log(this.budAmount);
      const newBudget = JSON.stringify({
        name: "Your Budget", // post-MVP : this.budName
        amount: 1000000000, // post-MVP: this.budAmount
        user_id: login.user_id, // post- MVP can use login.user_id == data.data.user_id as condition
      });
      // fetch request from budgets#create route
      // console.log(newBudget);
      console.log(login.token);
      fetch(`${URL}/budgets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // only if logged in
          Authorization: `bearer ${login.token}`,
        },
        body: newBudget,
      }).then((response) => response.json())
          .then(data => {
        console.log(data.data);
        console.log(data.data.id);
        this.budget_id = data.data.id;
        console.log("this is your new budget id ", this.budget_id);
        heading.heading = true;
        this.budName = "";
        this.budAmount = null;
        expense.showExpense();
      });
    },
    //Show the budget
    showOneBudget: function () {
      const URL = this.prodURL ? this.prodURL : this.devURL;
      fetch(`${URL}/budgets/${this.budget_id}`, {
        method: "get",
        headers: {
          Authorization: `bearer ${login.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //this.budget = data;
          // console.log(this.budget);
          // idea: make into dashboard header with related expenses
          // underneath "login.loginUN's this.budName budget: this.budAmount"
          // target an html tag with ID or class
          // post-post-MVP
        });
    },
    //Update/edit the budget
    updateBudget: function (event) { //post- post MVP
      const editBudget = {
        name: this.updatedBudName,
        amount: this.updatedBudAmount, // v-model="updatedBudName", etc
      };
      const budget_id = event.target.id;
      console.log(editBudget);
      fetch(`${URL}/budgets/${this.budget_id}`, {
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
    deleteBudget: function () { // Post post MVP
      fetch(`${URL}/budgets/${this.budget_id}`, {
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

      fetch(`${URL}/budgets/${budget.budget_id}/expenses`, {
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
      console.log("ARE YOU AT SHOW EXPENSE YET")
      fetch(`${URL}/budgets/${budget.budget_id}/expenses`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${login.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          tabulate(data.data, ["date", "amount", "category"]);
          pieMaker(data.data);
        });
    },
    //Show Expense by Category
    showExpenseByCategory: function () {
      const URL = this.prodURL ? this.prodURL : this.devURL;
      fetch(`${URL}/budgets/${budget.budget_id}/expenses/category/${this.category}`, {
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
    updateExpense: function () {
      const URL = this.prodURL ? this.prodURL : this.devURL;

      const editExpense = JSON.stringify({
        category: this.updatedExpCategory,
        date: this.updatedExpDate,
        amount: this.updatedExpAmount,
      });
      console.log(
        this.updatedExpAmount,
        this.updatedExpCategory,
        this.updatedExpDate
      );
      fetch(`${URL}/budgets/${budget.budget_id}/expenses/${event.target.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${login.token}`,
        },
        body: editExpense,
      })
        .then((response) => response.json())
        .then((data) => {
          this.showExpense();
        });
    },
    //Delete the budget
    deleteExpense: function () {
      const URL = this.prodURL ? this.prodURL : this.devURL;
      fetch(`${URL}/budgets/${budget.budget_id}/expenses/${event.target.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${login.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.showExpense();
        });
    },
  },
});

// getExpenses();

// post-MVP for budgets
// make empty array of all budgets
// tie budgets to user
// search array of budgets for one budget in order to select ID
// show all budgets to select from them
