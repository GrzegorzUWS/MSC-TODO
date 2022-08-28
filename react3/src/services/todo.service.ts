import http from "../http-common";
import ITodo from "../model/todo.model"
class TodoService {
  getAll() {
    return http.get<Array<ITodo>>("/todos");
  }
  get(id: string) {
    return http.get<ITodo>(`/todos/${id}`);
  }
  create(data: ITodo) {
    return http.post<ITodo>("/todos", data);
  }
  update(data: ITodo, id: any) {
    return http.put<any>(`/todos/${id}`, data);
  }
  add10() {
    return http.get<Array<ITodo>>("/todos/add/10");
  }
  add100() {
    return http.get<Array<ITodo>>("/todos/add/100");
  }
  add1000() {
    return http.get<Array<ITodo>>("/todos/add/1000");
  }
  add3000() {
    return http.get<Array<ITodo>>("/todos/add/3000");
  }
  delete(id: any) {
    return http.delete<any>(`/todos/${id}`);
  }
  deleteAll() {
    return http.delete<any>(`/todos`);
  }
  findByTitle(title: string) {
    return http.get<Array<ITodo>>(`/todos?title=${title}`);
  }
}
export default new TodoService();