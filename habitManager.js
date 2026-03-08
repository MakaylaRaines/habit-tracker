const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/habits.json");

// read habits from file
function getHabits() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// save habits back to file
function saveHabits(habits) {
  fs.writeFileSync(filePath, JSON.stringify(habits, null, 2));
}

// create new habit
function addHabit(name) {
  const habits = getHabits();

  const newHabit = {
    id: Date.now(),
    name: name,
    completed: false
  };

  habits.push(newHabit);
  saveHabits(habits);

  return newHabit;
}

// mark habit complete
function completeHabit(id) {
  const habits = getHabits();

  const habit = habits.find(h => h.id == id);
  if (habit) {
    habit.completed = true;
  }

  saveHabits(habits);
  return habit;
}

// delete habit
function deleteHabit(id) {
  let habits = getHabits();

  habits = habits.filter(h => h.id != id);
  saveHabits(habits);
}

module.exports = {
  getHabits,
  addHabit,
  completeHabit,
  deleteHabit
};