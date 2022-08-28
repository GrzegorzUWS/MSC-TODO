import { Component, ChangeEvent } from "react";
import TodoService from "../services/todo.service";
import { Link } from "react-router-dom";
import ITodo from '../model/todo.model';
import { wait } from "@testing-library/user-event/dist/utils";
type Props = {};
type State = {
  todos: Array<ITodo>,
  currentTodo: ITodo | null,
  currentIndex: number,
  searchTitle: string
};
export default class TodosList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTodos = this.retrieveTodos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTodo = this.setActiveTodo.bind(this);
    this.removeAllTodos = this.removeAllTodos.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.add10 = this.add10.bind(this);
    this.add100 = this.add100.bind(this);
    this.add1000 = this.add1000.bind(this);
    this.add3000 = this.add3000.bind(this);
    this.state = {
      todos: [],
      currentTodo: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }
  componentDidMount() {
    this.retrieveTodos();
  }
  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }
  retrieveTodos() {
    TodoService.getAll()
      .then((response: any) => {
        this.setState({
          todos: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
   refreshList() {
    this.retrieveTodos();
    this.setState({
      currentTodo: null,
      currentIndex: -1
    });
  }
  setActiveTodo(todo: ITodo, index: number) {
    this.setState({
      currentTodo: todo,
      currentIndex: index
    });
  }
  removeAllTodos() {
    TodoService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  add10() {
    TodoService.add10()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  add100() {
    TodoService.add100()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  add1000() {
    TodoService.add1000()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  add3000() {
    TodoService.add3000()
      .then( (response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  searchTitle() {
    this.setState({
      currentTodo: null,
      currentIndex: -1
    });
    TodoService.findByTitle(this.state.searchTitle)
      .then((response: any) => {
        this.setState({
          todos: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const {  todos, currentTodo, currentIndex } = this.state;
    return (
      <div className="list row">
           <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTodos}
          >
            Remove All
          </button>
          <button
            className="m-3 btn btn-sm btn-warning"
            onClick={this.add10}
          >
            Add 10
          </button>
          <button
            className="m-3 btn btn-sm btn-warning"
            onClick={this.add100}
          >
            Add 100
          </button>
          <button
            className="m-3 btn btn-sm btn-warning"
            onClick={this.add1000}
          >
            Add 1000
          </button>
          <button
            className="m-3 btn btn-sm btn-warning"
            onClick={this.add3000}
          >
            Add 3000
          </button>
      
        <div className="col-md-6">
          <h4>ToDos List</h4>
          <ul className="list-group main-window">
            {todos &&
              todos.map((todo: ITodo, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTodo(todo, index)}
                  key={index}
                >
                  {todo.title}
                </li>
              ))}
          </ul>
       
        </div>
        <div className="col-md-6">
          {currentTodo ? (
            <div>
              <h4>Todo</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTodo.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTodo.description}
              </div>
              
              <Link
                to={"/todos/" + currentTodo.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on chosen Todo...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}