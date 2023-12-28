import { addNewInfoReducer } from "../Reducer/AddNewInfoReducer";
import store from "../store";

const {dispatch} = store

export function addnewInfo(data) {
    //console.log('addnewInfo Action Data',  data);
    dispatch(addNewInfoReducer(data)) 
}