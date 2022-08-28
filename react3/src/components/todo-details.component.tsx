import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import TodoService from "../services/todo.service";
import ITodo from "../model/todo.model";
interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}
type Props = RouteComponentProps<RouterProps>;
type State = {
  currentTodo: ITodo;
  message: string;
}
export default class TodoDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTodo = this.getTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.state = {
      currentTodo: {
        id: null,
        title: "",
        description: "",
      },
      message: "",
    };
  }
  componentDidMount() {
    this.getTodo(this.props.match.params.id);
  }
  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    this.setState(function (prevState) {
      return {
        currentTodo: {
          ...prevState.currentTodo,
          title: title,
        },
      };
    });
  }
  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;
    this.setState((prevState) => ({
      currentTodo: {
        ...prevState.currentTodo,
        description: description,
      },
    }));
  }
  getTodo(id: string) {
    TodoService.get(id)
      .then((response: any) => {
        this.setState({
          currentTodo: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  
   
  updateTodo() {
    TodoService.update(
      this.state.currentTodo,
      this.state.currentTodo.id
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "Todo was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  deleteTodo() {
    TodoService.delete(this.state.currentTodo.id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/todos");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const { currentTodo } = this.state;
    return (
      <div>
        {currentTodo ? (
          <div className="edit-form">
            <h4>ToDo</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTodo.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTodo.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              
            </form>
         
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTodo}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTodo}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on chosen Todo...</p>
          </div>
        )}
      </div>
    );
  }
}