import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import './TodoList.css';

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todo_array: JSON.parse(localStorage.getItem('tasks')) || [],
      task: '',
      edit_task: '',
    };
  }

  onChangeTask = (e) => {
    this.setState({
      task: e.target.value,
    });
  };

  addTask = () => {
    let { todo_array, task } = this.state;
    if (!task.trim()) {
      alert('Task name is required.');
      return;
    }
    let obj = {
      id: todo_array.length === 0 ? 1 : todo_array[todo_array.length - 1].id + 1,
      name: task,
      is_editing: false,
      is_done: false,
    };
    todo_array.push(obj);
    this.setState(
      {
        todo_array: todo_array,
        task: '',
      },
      () => {
        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(todo_array));
      }
    );
  };

  edit = (object) => {
    let { todo_array } = this.state;
    let i = todo_array.findIndex((task) => task.id === object.id);
    todo_array[i].is_editing = !todo_array[i].is_editing;

    todo_array.map((task) => {
      return (task.is_editing = task.id !== object.id ? false : task.is_editing);
    });

    this.setState({
      todo_array: todo_array,
      edit_task: object.name,
    });
  };

  editTask = (task) => {
    this.setState({
      edit_task: task,
    });
  };

  saveEditTask = (object) => {
    let { todo_array, edit_task } = this.state;
    let i = todo_array.findIndex((task) => task.id === object.id);
    todo_array[i].name = edit_task;

    this.setState(
      {
        todo_array: todo_array,
        edit_task: '',
      },
      () => {
        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(todo_array));
        this.edit(object);
      }
    );
  };

  delete = (object) => {
    let { todo_array } = this.state;
    let i = todo_array.findIndex((task) => task.id === object.id);
    todo_array.splice(i, 1);
    this.setState(
      {
        todo_array: todo_array,
      },
      () => {
        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(todo_array));
      }
    );
  };

  done = (object) => {
    let { todo_array } = this.state;
    let i = todo_array.findIndex((task) => task.id === object.id);
    todo_array[i].is_done = true;
    this.setState(
      {
        todo_array: todo_array,
      },
      () => {
        // Save tasks to local storage
        localStorage.setItem('tasks', JSON.stringify(todo_array));
      }
    );
  };

  render() {
    return (
      <div className="container">
        <div>
          <h2 className="title">Awesome ToDo List</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            autoComplete="off"
            value={this.state.task}
            onChange={this.onChangeTask}
            placeholder="Write the description"
            className="taskInput"
          />
          <Button
            className="button_style addBtn"
            variant="contained"
            size="small"
            disabled={this.state.task === ''}
            onClick={this.addTask}
          >
            Add Task
          </Button>
        </div>

        {this.state.todo_array.length > 0 ? (
          <div>
            <table className="centerTable">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Action</th>
                </tr>
              </thead>
              {this.state.todo_array.map((object, i) => {
                return (
                  <tbody key={object.id}>
                    <tr>
                      <td className={object.is_done ? 'completedTask' : ''}>
                        {object.is_editing ? (
                          <TextField
                            id="standard-basic"
                            value={this.state.edit_task}
                            onChange={(e) => this.editTask(e.target.value)}
                          />
                        ) : object.is_done ? (
                          <s>{object.name}</s>
                        ) : (
                          <span>{object.name}</span>
                        )}
                      </td>
                      <td>
                        {object.is_editing ? (
                          <div>
                            <Button
                              className="button_style saveBtn"
                              size="small"
                              disabled={this.state.edit_task === ''}
                              onClick={() => this.saveEditTask(object)}
                            >
                              Save
                            </Button>
                            <Button
                              className="button_style cancelBtn"
                              size="small"
                              onClick={() => this.edit(object)}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Button
                              className="button_style editBtn"
                              size="small"
                              onClick={() => this.edit(object)}
                            >
                              Edit
                            </Button>
                            <Button
                              className={`button_style doneBtn ${
                                object.is_done ? 'disabled' : ''
                              }`}
                              size="small"
                              onClick={() => this.done(object)}
                            >
                              Done
                            </Button>
                            <Button
                              className="button_style deleteBtn"
                              size="small"
                              onClick={() => this.delete(object)}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        ) : (
          <h2>Add tasks to your bucket list !!</h2>
        )}
      </div>
    );
  }
}
