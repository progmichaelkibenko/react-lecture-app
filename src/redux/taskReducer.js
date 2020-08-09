import actions from './tasksActionsList'
import Task from '../model/task'
const initialTasks = [new Task('Buy Milk', true), new Task('Buy Bread', false), new Task('SOME 3', true)];
export default function tasksReducer(state = {tasks : initialTasks}, action){
    if(action.type === actions.add_task){
        return {
            tasks : [
                ...state.tasks,
                action.payload
            ]
        }
    }else if(action.type === actions.remove_task){
        let task = action.payload;
        let tasks = state.tasks.filter(function (item) {
            return item !== task
        })
        return {
            tasks
        }
    }else if(action.type === actions.task_edited){
        let task = action.payload.task;
        let beforeTask = action.payload.beforeTask;
        let tasks = state.tasks;
        const index = tasks.indexOf(beforeTask);
        tasks[index] = task;
        return {
            tasks
        }    
    } else if (action.type === actions.task_done) {
        let task = action.payload;
        let tasks = state.tasks;
        let index = tasks.indexOf(task);
        tasks[index].done = task.done;
        return {
            tasks
        }
    }    
    return state;
}