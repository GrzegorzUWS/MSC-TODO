import http from "../http-common";
class TodoService {
  getAll() {
    return http.get("/todos");
  }
  add10() {
    return http.get("/todos/add/10");
  }
  add100() {
    return http.get("/todos/add/100");
  }
  add1000() {
    return http.get("/todos/add/1000");
  }
  add3000() {
    return http.get("/todos/add/3000");
  }
  get(id) {
    return http.get(`/todos/${id}`);
  }
  create(data) {
    return http.post("/todos", data);
  }
  update(id, data) {
    return http.put(`/todos/${id}`, data);
  }
  delete(id) {
    return http.delete(`/todos/${id}`);
  }
  deleteAll() {
    return http.delete(`/todos`);
  }
  
}
export default new TodoService();