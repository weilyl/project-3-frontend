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
        prodURL: "https://squilliamp3.herokuapp.com/",
        user: null,
        token: null
    },
    methods: {
        handleLogin: function() {
            const URL = this.prodURL ? this.prodURL : this.devURL;
            const user = {username: this.loginUN, password: this.loginPW};
            console.log("hello");
            fetch(`${URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user),
            })
                .then((response) => response.json())
            .then((data) => {
                this.user = data.user;
                this.token = data.token;
                this.loggedin = true;
                this.loginPW = ""
                this.loginUN = ""
            });
        },
        handleLogout:function () {
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
            console.log(user);

            fetch(`${URL}/users`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if(data.error) {
                    alert("sign up unsuccessful");
                } else {
                    alert("signup successful")
                }
            });
        }
    }
})