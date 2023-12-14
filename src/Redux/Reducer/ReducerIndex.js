import { combineReducers } from "redux";
import mobileNumberStateReducer from "./MobileNumberReducer";
import infoReducer from './AddNewInfoReducer'
const dataReducers = combineReducers({
    mobileNumberStateReducer,
    infoReducer
})

export default dataReducers;