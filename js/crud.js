const budget = new Vue({
    el: "#budget",
    data: {
        budName: "", // grab input for create budget
        budAmount: null, // grab input for create budget
        devURL: "http://localhost:3000",
        prodURL: "https://squilliamp3.herokuapp.com",
        URL: this.prodURL ? this.prodURL : this.devURL,
        budget: null, // ?
        budget_id: null,
        updatedBudName: "", // grab input for update budget
        updatedBudAmount: null, // grab input for create budget
    },
    methods: {
        //Create a budget
        createBudget: function() {
            // object from input
            // HTML v-model="budName" & v-model="budAmount"
            const newBudget = JSON.stringify({name: this.budName, amount: this.budAmount});
            // fetch request from budgets#create route
            fetch(`${URL}/budgets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // only if logged in
                    Authorization: `bearer ${this.token}`,
                },
                body: newBudget
            })
                .then((response) => {
                    this.budName = "";
                    this.budAmount = null;
                    this.showOneBudget()
                });
        },
        //Show the budget
        showOneBudget: function() {
            //const URL2 = this.prodURL ? this.prodURL : this.devURL;
            fetch(`${URL}/budgets/${this.budget_id}`, {
                method: "get",
                headers: {
                    Authorization: `bearer ${login.token}`
                }
            })
            .then((response) => response.json())
            .then((data) => {
                this.budget = data;
                console.log(this.budget);
                // idea: make into dashboard header with related expenses
                // underneath "login.loginUN's this.budName budget: this.budAmount"
                // target an html tag with ID or class
                //
            })
        },
        //Update/edit the budget
        updateBudget: function(event) {
            const editBudget = {
                name: this.updatedBudName, amount: this.updatedBudAmount // v-model="updatedBudName", etc
            }
            const budget_id = event.target.id
            console.log(editBudget)
            fetch(`${URL}/budgets/${budget_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${login.token}`
                },
                body: JSON.stringify(editBudget)
            })
                .then(response => response.json())
                .then((data) => {
                    this.showOneBudget();
                    console.log(data);

                })
    },
        //Delete the budget
        deleteBudget: function() {
            fetch(`${URL}/budgets/${this.budget_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${login.token}`
                },
            }) 
        }
    }
})


const expense = new Vue({
    el: "#expense",
    data: {
        loggedin: true,
        expCategory: "",
        expDate: "",
        expAmount: null,
        devURL: "http://localhost:3000",
        prodURL: "https://squilliamp3.netlify.app",
        URL: this.prodURL ? this.prodURL : this.devURL,
        expense: null,
        //token: null
    },
    methods: {
        //Create a budget
        expenseCreate: function() {
            //const URL = this.prodURL ? this.prodURL : this.devURL;
            const newExpense = {category: this.expCategory, date: this.expDate, amount: this.expAmount};
            console.log("hello");
            fetch(`${URL}/budgets/:budget_id/expenses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: newExpense
            })
                .then((response) => response.json())
            .then((data) => {
                this.expense = data.expense;
                // this.token = data.token;
                // this.loggedin = true;
                // this.loginPW = ""
                // this.loginUN = ""
            });
        },
        //Show the budget
        showExpense: function() {
            //const URL2 = this.prodURL ? this.prodURL : this.devURL;
            fetch(`${URL}/budgets/:budget_id/expenses`) 
            .then((response) => response.json())
            .then((data) => {
                this.expense = data.expense;
                console.log(this.expense)
            })
        },
        //Update/edit the budget
        updateExpense: function() {
            const editExpense = {
                category: this.expCategory, date: this.expDate, amount: this.expAmount
            }
            fetch(`${URL}/budgets/:budget_id/expenses/:expense_id`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: editExpense
            })
    },
        //Delete the budget
        deleteExpense: function() {
            fetch(`${URL}/budgets/:budgets_id/expenses/:expense_id`, {
                method: "DELETE"
            }) 
        }
    }
})

// post-MVP for budgets
// make empty array of all budgets
// tie budgets to user
// search array of budgets for one budget in order to select ID
// show all budgets to select from them