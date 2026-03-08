const express = require("express");
const path = require("path");

const habitManager = require("./habitManager");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// get all habits
app.get("/api/habits", (req, res) => {
  res.json(habitManager.getHabits());
});

// add habit
app.post("/api/habits", (req, res) => {
  const habit = habitManager.addHabit(req.body.name);
  res.json(habit);
});

// complete habit
app.put("/api/habits/:id", (req, res) => {
  const habit = habitManager.completeHabit(req.params.id);
  res.json(habit);
});

// delete habit
app.delete("/api/habits/:id", (req, res) => {
  habitManager.deleteHabit(req.params.id);
  res.json({ message: "Habit deleted" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});