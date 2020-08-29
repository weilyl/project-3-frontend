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
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          this.user = data.user;
          this.token = data.token;
          this.loggedin = true;
          budget.loggedin = true;
          expense.loggedin = true;
          this.loginPW = "";
          this.loginUN = "";
          if (data.error) {
            alert("log in unsuccessful");
          } else {
            alert("log in successful");
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
          console.log(data);
          if (data.error) {
            alert("sign up unsuccessful");
          } else {
            alert("signup successful");
            this.loggedin = true;
            budget.createBudget(data);
          }
        });
    },
  },
});

const heading = new Vue({
  el: "#heading",
  data: {
    heading: `${login.loginUN}'s ${budget.budName} Budget`,
  },
});
