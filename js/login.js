const login = new Vue({
  el: "#login",
  data: {
    loggedin: false,
    JWT: "",
    createUN: "",
    createPW: "",
    loginUN: "",
    loginPW: "",
    devURL: "http://localhost:3000",
    prodURL: "https://squilliamp3.herokuapp.com",
    user: null,
    token: null,
  },
  methods: {
    handleLogin: function (event) {
      event.preventDefault();
      const URL = this.prodURL ? this.prodURL : this.devURL;
      const user = { username: this.loginUN, password: this.loginPW };
      fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert("log in unsuccessful");
          } else {
            alert("log in successful");
            this.user = data.user;
            this.token = data.token;
            this.loggedin = true;
            budget.loggedin = true;
            expense.loggedin = true;
            expense.heading = `${login.user.username}'s Budget`;
            this.loginPW = "";
            this.loginUN = "";
            budget.userBudget();
          }
        });
    },
    handleLogout: function () {
      this.loggedin = false;
      this.user = null;
      this.token = null;
    },
    handleSignup: function () {
      const URL = this.prodURL ? this.prodURL : this.devURL;
      const user = JSON.stringify({
        username: this.createUN,
        password: this.createPW,
      });
      fetch(`${URL}/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert("sign up unsuccessful");
          } else {
            alert("signup successful");
            this.user = data.user;
            this.token = data.token;
            this.loggedin = true;
            budget.loggedin = true;
            expense.loggedin = true;
            expense.heading = `${login.user.username}'s Budget`;
            this.loginPW = "";
            this.loginUN = "";
            budget.createBudget(data);
            budget.userBudget();
          }
        });
    },
  },
});
