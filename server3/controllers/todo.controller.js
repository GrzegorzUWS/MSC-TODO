const db = require("../models");
const faker = require("faker");

const Todo = db.todos;


// Create and Save a new Todo
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Todo
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });
  // Save Todo in the database
  todo
    .save(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating a Todo.",
      });
    });
};

//Create multiple objects
exports.multipleData = (req, res) => {
  var total = req.params.count;

  for (i = 0; i < total; i++) {

    const todo = new Todo({
      title: faker.name.firstName(),
      description: faker.name.firstName(),
    });
    todo.save(todo).then((data) => {
      res.send(data);
    });
  }
};

// Retrieve all Todos from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  Todo.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ToDos.",
      });
    });
};

// Find a single Todo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Todo.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found ToDo with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving ToDo with id=" + id });
    });
};

// Update a Todo by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update ToDo with id=${id}. Maybe Todo was not found!`,
        });
      } else res.send({ message: "ToDo was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ToDo with id=" + id,
      });
    });
};

// Delete a Todo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete ToDo with id=${id}. Maybe Todo was not found!`,
        });
      } else {
        res.send({
          message: "ToDo was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ToDo with id=" + id,
      });
    });
};

// Delete all Todos from the database.
exports.deleteAll = (req, res) => {
  Todo.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} ToDos were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all ToDos.",
      });
    });
};
