import React from 'react';
import './App.css';
import TasksList from './components/tasksList';
import NewTask from './components/newtask'
import Task from './model/task'
import StatusDashBoard from './components/statusDashboard'
import TaskListItem from './components/taskListItem'

export default class App extends React.Component{
  tasks = [new Task('Buy Milk', true), new Task('Buy Bread', false), new Task('SOME 3', true)];
  constructor(props){
    super(props);
    this.state = {tasks : this.tasks.slice()};
  }

  render(){    
    return <div className="App">
      <StatusDashBoard></StatusDashBoard>
      <TasksList>
        <TaskListItem></TaskListItem>
      </TasksList>
      <NewTask></NewTask>
  </div>
  }

  // newTaskAdded(task){
  //   if(!this.checkTaskContains(task)){
  //     this.tasks.push(task)
  //     this.setState({tasks : this.tasks.slice()})
  //   }else{
  //     alert('You already have this task')
  //   }
  // }

  componentDidCatch(error, info) {
    console.log(error, info);
  }
}

