import React from 'react';
import '../App.css';
import Task from '../model/task'
import {connect} from 'react-redux'
import actionTypes from '../redux/tasksActionsList'

class NewTask extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            value: '',
            tasks : props.tasks
        };
        this.newTaskCallback = props.onTaskAdded;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return <div id="new_task_component">
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter a new Task:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="submit"></input>
            </form>
        </div>
    }

    handleSubmit(event) {
        if (!this.checkTaskContains(this.state.value)) {
            this.newTaskCallback(new Task(this.state.value, false));
            event.preventDefault();
        }else{
            alert('You already have this task');
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    checkTaskContains(task){
        for (let index = 0; index < this.state.tasks.length; index++) {
          const ele = this.state.tasks[index];
          if(task.description === ele.description){
            return true;
          }
        }
        return false;
    }
}


export default connect(state => ({tasks : state.tasksStore.tasks}), dispatch => ({
    onTaskAdded : (task) => {
        dispatch({type : actionTypes.add_task, payload : task})
    }
}))(NewTask)