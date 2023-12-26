import store from "../store";
import {listDataReducer} from "../Reducer/ListDataReducer"

const {dispatch} = store

export function listDataAction(data) {
    //console.log('listDataAction Action Data',data);
    dispatch(listDataReducer(data))
}