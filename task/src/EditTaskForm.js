import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class EditTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      edit_task: '',
    };
  }

  editTask = () => {
    let { edit_task } = this.state;
    if (!edit_task.trim()) {
      alert('Task name is required.');
      return;
    }

    // Perform the logic to edit the task (similar to TodoList.js)

    // After editing the task, navigate back to the task list
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div>
          <h2>Edit Task</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            autoComplete="off"
            value={this.state.edit_task}
            onChange={(e) => this.setState({ edit_task: e.target.value })}
            placeholder="Write the description"
          />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.edit_task === ''}
            onClick={this.editTask}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(EditTaskForm);
