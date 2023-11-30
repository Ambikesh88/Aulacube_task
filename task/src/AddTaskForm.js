import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class AddTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      task: '',
    };
  }

  onChangeTask = (e) => {
    this.setState({
      task: e.target.value,
    });
  };

  addTask = () => {
    let { task } = this.state;
    if (!task.trim()) {
      alert('Task name is required.');
      return;
    }
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div>
          <h2>Add Task</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            autoComplete="off"
            value={this.state.task}
            onChange={this.onChangeTask}
            placeholder="Write the description"
          />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.task === ''}
            onClick={this.addTask}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(AddTaskForm);
