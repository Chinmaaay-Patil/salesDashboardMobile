import store from "../store";
import {mobileNumberReducer} from "../Reducer/MobileNumberReducer"

const {dispatch} = store

export function mobileNumberAction(data) {
    //console.log('mobileNumberAction Action Data',data);
    dispatch(mobileNumberReducer(data))
}