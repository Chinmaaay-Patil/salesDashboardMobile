import store from "../store";
import {dashBoardReducer} from "../Reducer/DashBoardReducer"

const {dispatch} = store

export function dashBoardAction(data) {
    //console.log('dashBoardAction Action Data',data);
    dispatch(dashBoardReducer(data))
}