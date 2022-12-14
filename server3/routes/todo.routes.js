

module.exports = app => {
  
    const todos = require("../controllers/todo.controller.js");
    var router = require("express").Router();

    // Create a new Todo
    router.post("/", todos.create);

    // Retrieve all Todos
    router.get("/", todos.findAll);

    //Create new multiple data with faker
    router.get("/add/:count?", todos.multipleData);

  

    // Retrieve a single Todo with id
    router.get("/:id", todos.findOne);

    // Update a Todo with id
    router.put("/:id", todos.update);

    // Delete a Todo with id
    router.delete("/:id", todos.delete);

    // Create a new Todo
    router.delete("/", todos.deleteAll);


    
    app.use('/api/todos', router);
  };