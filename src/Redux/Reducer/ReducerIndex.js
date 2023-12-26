import { combineReducers } from "redux";
import mobileNumberStateReducer from "./MobileNumberReducer";
import infoReducer from './AddNewInfoReducer';
import DashBoardReducer from "./DashBoardReducer";
import listDataStateReducer from "./ListDataReducer"
const dataReducers = combineReducers({
    mobileNumberStateReducer,
    infoReducer,
    DashBoardReducer,
    listDataStateReducer
})

export default dataReducers;