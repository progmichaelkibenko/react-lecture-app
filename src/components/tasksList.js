import React from 'react';
import '../App.css';
import TaskListItem from './taskListItem'
import {connect} from 'react-redux'
import actionsList from '../redux/tasksActionsList'

class TasksList extends React.Component{

    constructor(props){
        super(props);
        this.state = {tasks : props.tasks};
        this.onTaskEddited = props.onTaskEdited;
        this.onTaskDone = props.onTaskDone;
        this.onTaskDeleted = props.onTaskDeleted;
        this.onTaskDone = this.onTaskDone.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.onTaskEditCallback = this.onTaskEditCallback.bind(this);
    }
    
    render(){                
        return <div className="tasks_list_component">
            <ul className="tasks_list">
                {this.renderTasksElements()}
            </ul>
        </div>
    };

    componentWillReceiveProps(nextProp){
        this.setState({tasks : nextProp.tasks.slice()})
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    onTaskDone(task){
        if(task){
            this.onTaskDone(task);
        }
    }

    onDeleteTask(task){
        this.onTaskDeleted(task);
    }

    onTaskEditCallback(beforeTask, task) {
        let tasks = this.state.tasks;
        const index = tasks.indexOf(beforeTask);
        tasks[index] = task;
        this.onTaskEddited(beforeTask, tasks[index]);
    }

    renderTasksElements(){
        let tasksElements = [];
        for (let index = 0; index < this.state.tasks.length; index++) {
            const ele = this.state.tasks[index];
            tasksElements.push(
                <li className="task_item" key={ele.description}>
                    <TaskListItem taskEditSubmitCallback={this.onTaskEditCallback} onDeteleTaskCallback={this.onDeleteTask} onTaskDoneCallback={this.onTaskDone} task={ele} index={index + 1}></TaskListItem>
                </li>
            )
            
        }
        return tasksElements;
    }
};

export default connect(state => ({
    tasks : state.tasksStore.tasks
}), dispatch => ({
    onTaskEdited : (beforeTask, task) => {
        dispatch({ type : actionsList.task_edited, payload : {beforeTask, task}});
    },
    onTaskDeleted : (task) => {
        dispatch({ type : actionsList.remove_task, payload : task});
    },
    onTaskDone : (task) => {
        dispatch({ type : actionsList.task_done, payload : task});
    }
}))(TasksList)