<template>
  <div class="list row">
<button class="m-3 btn btn-sm btn-danger" @click="removeAllTodos">
        Remove All
      </button>
       <button class="m-3 btn btn-sm btn-warning" @click="add10">
        Add 10
      </button>
       <button class="m-3 btn btn-sm btn-warning" @click="add100">
        Add 100
      </button>
       <button class="m-3 btn btn-sm btn-warning" @click="add1000">
        Add 1000
      </button>
       <button class="m-3 btn btn-sm btn-warning" @click="add3000">
        Add 3000
      </button>
    <div class="col-md-6 mt-5">
      <h4>ToDos List</h4>
      <ul class="list-group main-window">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(todo, index) in todos"
          :key="index"
          @click="setActiveTodo(todo, index)"
        >
          {{ todo.title }}
        </li>
      </ul>
      
    </div>
    <div class="col-md-6 mt-5">
      <div v-if="currentTodo">
        <h4>Todo</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTodo.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentTodo.description }}
        </div>
        <router-link :to="'/todos/' + currentTodo.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on chosen Todo...</p>
      </div>
    </div>
  </div>
</template>
<script>
import TodoService from "../services/TodoService";
export default {
  name: "todos-list",
  data() {
    return {
      todos: [],
      currentTodo: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveTodos() {
      TodoService.getAll()
        .then(response => {
          this.todos = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    add10() {
      TodoService.add10()
        .then(response => {
         this.refreshList();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    add100() {
      TodoService.add100()
        .then(response => {
          this.refreshList();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    add1000() {
      TodoService.add1000()
        .then(response => {
          this.refreshList();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    add3000() {
      TodoService.add3000()
        .then(response => {
          this.refreshList();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveTodos();
      this.currentTodo = null;
      this.currentIndex = -1;
    },
    setActiveTodo(todo, index) {
      this.currentTodo = todo;
      this.currentIndex = todo ? index : -1;
    },
    removeAllTodos() {
      TodoService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      TodoService.findByTitle(this.title)
        .then(response => {
          this.todos = response.data;
          this.setActiveTodo(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveTodos();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.main-window {
  height: 800px;
  overflow: scroll;
}
</style>