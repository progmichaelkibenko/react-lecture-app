import React from 'react';
import '../App.css';
import {connect} from 'react-redux'
import store from '../redux/store'

class StatusDashBoard extends React.Component {

    constructor(props){
        super(props);
        this.state = {tasks : props.tasks}
        store.subscribe(() => {
            let state = store.getState().tasksStore;
            this.setState({tasks : state.tasks})     
        })
    }

    render() {
        let tasksInfo = this.getTasksStatusInfo();
        return <div className="tasks_status_info">
            <p className="tasks_status_info_status_text">
                The list has <strong>{tasksInfo.done}</strong> done tasks
                and <strong>{tasksInfo.have_to_be_done}</strong> tasks that have to be done
            </p>
        </div>
    }

    componentWillUnmount(){
        store.unsubscribe();
    }

    componentWillReceiveProps(props){        
        this.setState({tasks : props.tasks});
    }

    getTasksStatusInfo(){
        let returnable = {
            done: 0,
            have_to_be_done : 0
        };

        for (let index = 0; index < this.state.tasks.length; index++) {
            const ele = this.state.tasks[index];
            if(ele.done){
                returnable.done++;
            }else{
                returnable.have_to_be_done++;
            }
        }

        return returnable;
    }
}

export default connect((state) => {    
    return {
        tasks : state.tasksStore.tasks
    }
}, dispatch => ({}))(StatusDashBoard)