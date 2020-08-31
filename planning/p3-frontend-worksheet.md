# Project Overview

## Project

Link to completed project [here](http://finance-tracker.surge.sh/)

Link to project frontend [here](https://github.com/weilyl/project-3-frontend)

Link to project backend [here](https://github.com/weilyl/project-3-backend)

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

| Day   | Deliverable                                                      | Status     |
| ----- | ---------------------------------------------------------------- | ---------- |
| Day 1 | Project Description                                              | Complete |
| Day 1 | Wireframes / Priority Matrix / Timeline `backend` and `frontend` | Complete |
| Day 2 | Working RestAPI                                                  | Complete |
| Day 3 | Core Application Structure (HTML, CSS, etc.)                     | Complete |
| Day 4 | MVP & Bug Fixes                                                  | Complete |
| Day 5 | Final Touches and Present                                        | Complete |

## Project Description

This finance tracker is a simple tool for users to visualize their spending history. 
The front-end will be built using HTML, CSS, Vue.js, Bootstrap, jQuery and D3.js. 
Our users value a minimal layout and functionality to achieve their goals faster.
Users will be able to make an account and sign in. 
Users will be able to store their expenses in a database. 
Users will be able to exclusively access their own expenses. 
Users will be able to see their expenses as a table and as a color-coded pie chart.
In future features, users will be able to: 
- log in using social media accounts
- select dates 
- select different types of charts 
- make multiple budgets, and
- sort expenses by category.

## Wireframes

- [Mobile-Homepage](https://res.cloudinary.com/wjclavell/image/upload/v1598145428/Project%203/Finance_Tracker_mobile_ymbohj.png)
- [Mobile-Login/Modal](https://res.cloudinary.com/wjclavell/image/upload/v1598156265/Project%203/Finance-Tracker_Login-Modal_mmfq5h.png)
- [Desktop](https://res.cloudinary.com/wjclavell/image/upload/v1598200003/Project%203/FinanceTracker_Desktop_h1dcx3.png)

## Time/Priority Matrix

[Here](https://res.cloudinary.com/dssciwyew/image/upload/v1598141818/Priority%20Matrix%20Frontend%20P3.png) is a full list of features that have been prioritized based on the `Time and Priority` Matix.

### MVP/PostMVP

The functionality will then be divided into two separate lists: MPV and PostMVP. 
The MVP list includes functionality that will be implemented upon project completion.

#### MVP

- Hamburger menu/Navigation Bar (mobile-first)
- Sign In Modal
- Log In Modal
- Input Expenses Modal
- Table Template
- Vue.js
- Total spending
- CSS (Bootstrap)
- D3.js Table
- D3.js Chart
- Footer

#### PostMVP

- About, Contact, etc. for the footer
- More charts (line graph, bar chart, pie chart)
- Filter by month, year, etc.
- Sort by category
- Logo
- User profile

## Functional Components

Based on the initial logic defined in the previous sections, try and breakdown the logic further into functional components, and by that we mean functions. Try and capture what logic would need to be defined if the game was broken down into the following categories.

Time frames are also key in the development cycle. You have limited time to code all phases of the game. Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe.

#### MVP

| Component                     | Priority | Estimated Time | Time Allotted | Actual Time |
| ----------------------------- | :------: | :------------: | :------------: | :---------: |
| Hamburger menu/Navbar (mobile-first)  |    H     |   1 hr      |     10 hrs       |     2 hrs     |
| Sign In Modal                 |    H     |     3 hrs      |      3 hrs       |     1.5 hrs   |
| Input Modal                   |    H     |     3 hrs      |      3 hrs       |     1.5 hrs   |
| Table Template                |    H     |     3 hrs      |      10 hrs      |     5 hrs     |
| Vue.js                        |    M     |     3 hrs      |      5 hrs       |     5 hrs     |
| Average and totals            |    H     |     3 hrs      |      1hr       |     1 hr     |
| CSS (Bootstrap & D3.js)       |    H     |      3hrs      |      17 hrs      |     8hrs     |
| D3.js Chart & Table           |    H     |     2 hrs      |      10 hrs       |     10hrs     |
| Total                         |    H     |     23 hrs     |      59 hrs      |    34 hrs     |

#### PostMVP

| Component                                      | Priority | Estimated Time | Time Invested | Actual Time |
| ---------------------------------------------- | :------: | :------------: | :------------: | :---------: |
| About, Contact, etc. for the footer            |    L     |     2 hrs      |      8 hrs     |     12 hrs  |
| More charts (line graph, bar chart)           |    L     |     4 hrs      |      -hr       |     -hr     |
| Filter by month, year, etc.                    |    H     |     4 hrs      |      -hr       |     -hr     |
| Sort by category                               |    H     |     4 hrs      |      -hr       |     -hr     |
| Choose specific category/date to look at       |    H     |     4 hrs      |      -hr       |     -hr     |
| Logo                                           |    L     |    2.5 hrs     |      1 hr       |     1 hr     |
| Landing page                                        |    L     |    3 hrs     |      1 hr       |     2 hr     |
| Animations                                           |    L     |    2 hrs     |      1 hr       |     1 hr     |
| Refactoring                                     | L | 10 hrs | -hrs | - hrs|
| Total                                          |    M     |     35.5 hrs    |      11 hrs      |     16 hrs     |

## Additional Libraries

- Vue.js (DOM manipulation, fetch requests from the backend, display)
- Bootstrap (design, light responsiveness, display)
- D3.js (data visualization, creating responsive table & pie chart)
- jQuery (Bootstrap functionality)

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description

```
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
    }
```

```
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

```

## Issues and Resolutions

Use this section to list of all major issues encountered and their resolution.

**ERROR**: BootstrapVue library had difficulty importing properly 
**RESOLUTION**: Kept jQuery library for MVP, will refactor to write Bootstrap functionality in vanilla JS

**ERROR**: Cannot use vanilla JS files in a project also using Vue.js
**RESOLUTION**: kept jQuery library for MVP, will refactor to try vanilla JS as Vue.js methods

**ERROR**: generating tables & charts in D3.js from fetch data  
**RESOLUTION**: DOM manipulation with D3.js

**ERROR**: Display buttons on login & signup
**RESOLUTION**: use v-if in HTML

**ERROR**: Have users be automatically logged in once signed up
**RESOLUTION**: call handleLogin in handleSignup

**ERROR**: Generate a budget under the hood upon signup
**RESOLUTION**: call createBudget function in handleSignup

**ERROR**: Display the user-specific budget & expenses upon signup
**RESOLUTION**: create a Vue method to get budget by user ID

**ERROR**: Resizing D3 svg responsively
**RESOLUTION**: use viewBox attribute

**ERROR**: Font Awesome icons not displaying on table buttons (attempt at fitting table to mobile view)
**RESOLUTION**: `<i>` and `<button>` don't work well together (EITHER `<i>` with `<a>` OR `<span>` with `<button>`), so horizontal scroll bar added to table


**ERROR**: Mixed content warning for D3.js libraries
**RESOLUTION**: Deployed front-end on `surge.sh` instead of `Netlify` or `github.io`
