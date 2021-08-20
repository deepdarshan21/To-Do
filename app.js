// todo list
const express = require("express");
const app = new express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
var tasks = [];
var workTasks = [];
var date, indianDate, day, kindOfDay, listTitle;

app.get("/", (req, res) => {
    // var date, indianDate, day, kindOfDay;
    date = new Date();
    day = date.getDay();
    if (day == 6 || day == 0) {
        kindOfDay = "Weekend 😃";
    } else {
        kindOfDay = "Weekday 😢";
    }
    // indianDate=`${date.getUTCDate()} ${date.getMonth} ${date.getFullYear()}`;
    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    indianDate = date.toLocaleDateString("en-US", options);
    listTitle = indianDate + " (" + kindOfDay + ")";
    res.render("list", {
        listTitle: listTitle,
        tasks: tasks,
    });
});
app.post("/", (req, res) => {
    var newTask;
    newTask = req.body.input;
    if (req.body.type == "Work") {
        workTasks.push(newTask);
        res.redirect("/work");
    } else {
        tasks.push(newTask);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    listTitle = "Work";
    res.render("list", { listTitle: listTitle, tasks: workTasks });
});

app.listen(port, () => {
    console.log(`visit at http://localhost:${port}`);
});
