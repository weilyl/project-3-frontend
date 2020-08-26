const budget = new Vue({
    el: "#budget",
    data: {
        loggedin: true,
        budName: "",
        budAmount: null,
        devURL: "http://localhost:3000",
        prodURL: "https://squilliamp3.netlify.app",
        URL: this.prodURL ? this.prodURL : this.devURL,
        budget: null,
        //token: null
    },
    methods: {
        //Create a budget
        budgetCreate: function() {
            //const URL = this.prodURL ? this.prodURL : this.devURL;
            const newBudget = {name: this.budName, amount: this.budAmount};
            console.log("hello");
            fetch(`${URL}/budgets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: newBudget
            })
                .then((response) => response.json())
            .then((data) => {
                this.budget = data.budget;
                // this.token = data.token;
                // this.loggedin = true;
                // this.loginPW = ""
                // this.loginUN = ""
            });
        },
        //Show the budget
        showBudget: function() {
            //const URL2 = this.prodURL ? this.prodURL : this.devURL;
            fetch(`${URL}/budgets`) 
            .then((response) => response.json())
            .then((data) => {
                this.budget = data.budget;
                console.log(this.budget)
            })
        },
        //Update/edit the budget
        updateBudget: function() {
            const editBudget = {
                name: this.budName, amount: this.budAmount
            }
            fetch(`${URL}/budgets/:budget_id`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: editBudget
            })
    },
        //Delete the budget
        deleteBudget: function() {
            fetch(`${URL}/budgets/:budgets_id`, {
                method: "DELETE"
            }) 
        }
//         handleLogout:function () {
//             this.loggedin = false;
//             this.user = null;
//             this.token = null;
//         },
//         handleSignup: function () {
//             const URL = this.prodURL ? this.prodURL : this.devURL;
//             console.log(URL);
//             const user = JSON.stringify({
//                 username: this.createUN,
//                 password: this.createPW,
//             });
//             console.log(user);

//             fetch(`${URL}/users`, {
//                 method: "post",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: user
//             })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data)
//                 if(data.error) {
//                     alert("sign up unsuccessful");
//                 } else {
//                     alert("signup successful")
//                 }
//             });
//         }
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