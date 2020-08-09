import React from 'react';
import '../App.css';

export default class TaskListItem extends React.Component{
    editStatuses = {
        beforeEdit : 'beforeEdit',
        editClicked : 'editClicked',
        editInProgress : 'editInProgress',
    };

    constructor(props){
        super(props);
        this.state = {
            task : props.task,
            index : props.index
        };
        this.onTaskDoneCallback = props.onTaskDoneCallback;
        this.onTaskDone = this.onTaskDone.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.onDeteleTaskCallback = props.onDeteleTaskCallback;
        this.handleTaskEdit = this.handleTaskEdit.bind(this);
        this.editStatus = this.editStatuses.beforeEdit;
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.getEditButtonText = this.getEditButtonText.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.editSubmitted = props.taskEditSubmitCallback;
        this.beforeTask = null;
    }

    render(){
        return <div className="task_item_container">
                <p id="task_index"> {this.state.index}</p>
                <p id="task_description"> {this.getTaskDescriptionElement()}</p>
                <input type="checkbox"  onChange={this.onTaskDone} defaultChecked={this.state.task.done}/>
                <button onClick={this.handleTaskEdit}> {this.getEditButtonText()} </button>
                <button onClick={this.onDeleteTask}> Delete </button>
        </div>
    }

    getEditButtonText(){
        if(this.editStatus === this.editStatuses.editInProgress){
            return 'Click to save';
        }
        return 'Edit';
    }

    handleTextInputChange(event){
        let task = this.state.task;
        task.description = event.target.value;
        this.setState({task : task});
    }

    handleTaskEdit(){
        if(this.editStatus === this.editStatuses.beforeEdit){
            this.editStatus = this.editStatuses.editClicked;
            this.beforeTask = this.state.task;
        }else{
            this.editStatus = this.editStatuses.beforeEdit;
            this.editSubmitted(this.beforeTask ,this.state.task);
        }
        this.forceUpdate();
    }

    componentWillReceiveProps(props){
        this.setState({
            task : props.task,
            index : props.index
        });
    }

    onDeleteTask(){
        this.onDeteleTaskCallback(this.state.task);
    }

    onTaskDone(){
        let task = this.state.task;
        task.done = !task.done;
        this.setState({task : task});
        this.onTaskDoneCallback(this.state.task);
        this.forceUpdate();
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    handleDescriptionChange(){
        this.editSubmitted = true;
    }

    getTaskDescriptionElement(){
        let element;
        if(this.editStatus === this.editStatuses.editClicked || this.editStatus === this.editStatuses.editInProgress){
            element = <input type="text" onSubmit={this.handleDescriptionChange} onChange={this.handleTextInputChange} value={this.state.task.description}></input>
            this.editStatus = this.editStatuses.editInProgress;
        }else{
            if(this.state.task.done){
                element = <del>  
                    {this.state.task.description}
                </del>
            }else{
                element = <strong>  
                    {this.state.task.description}
                </strong>
            }
        }
        return element;
    }
}