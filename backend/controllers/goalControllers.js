const asynHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

//@desc GET goals
//@route GET/api/goals
//@access Private

const getGoals = asynHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

//@desc POST goals
//@route POST/api/goal
//@access Private

const setGoal = asynHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field!");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

//@desc UPDATE goal
//@route UPDATE/api/goal/:id
//@access Private

const updateGoal = asynHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error();
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorised!");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//@desc DELETE goal
//@route DELETE/api/goal/:id
//@access Private

const deleteGoal = asynHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error();
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorised!");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
