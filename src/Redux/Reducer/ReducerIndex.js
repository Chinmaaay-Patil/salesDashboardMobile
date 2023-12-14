import { combineReducers } from "redux";
import mobileNumberStateReducer from "./MobileNumberReducer";
const dataReducers = combineReducers({
    mobileNumberStateReducer
})

export default dataReducers;