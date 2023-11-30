// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import TodoList from './TodoList';
// import AddTaskForm from './AddTaskForm';
// import EditTaskForm from './EditTaskForm';
// import './TodoList.css';

// const App = () => {
//   return (
//     <Router>
//       <Route path="/" exact component={TodoList} />
//       <Route path="/add" component={AddTaskForm} />
//       <Route path="/edit/:id" component={EditTaskForm} />
//     </Router>
//   );
// };

// ReactDOM.render(
//   <App />,
//   document.querySelector('#root')
// );

// import react and reactDOM library
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import './TodoList.css';

const App = () => {
  return (
    <TodoList />
  );
};

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
