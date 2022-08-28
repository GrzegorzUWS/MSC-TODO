<template>
  <div v-if="currentTodo" class="edit-form">
    <h4>ToDo</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTodo.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTodo.description"
        />
      </div>
    </form>
    
    <button class="badge badge-danger mr-2"
      @click="deleteTodo"
    >
      Delete
    </button>
    <button type="submit" class="badge badge-success"
      @click="updateTodo"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on chosen Todo...</p>
  </div>
</template>
<script>
import TodoService from "../services/TodoService";
export default {
  name: "todo",
  data() {
    return {
      currentTodo: null,
      message: ''
    };
  },
  methods: {
    getTodo(id) {
      TodoService.get(id)
        .then(response => {
          this.currentTodo = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
   
    updateTodo() {
      TodoService.update(this.currentTodo.id, this.currentTodo)
        .then(response => {
          console.log(response.data);
          this.message = ' ToDo was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteTodo() {
      TodoService.delete(this.currentTodo.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "todos" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTodo(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  text-align: left;
}
</style>