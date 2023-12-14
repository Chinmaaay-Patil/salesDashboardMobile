import { createSlice } from "@reduxjs/toolkit"
import _ from "lodash";

const init_state = {
    infoArray: []
}

export const infoSlice = createSlice({
    name: 'infoReducer',
    initialState: init_state,
    reducers: {
        addNewInfoReducer: (state, data) => {
            console.log("data in info new reducer", JSON.stringify(data))
            const temp = _.cloneDeep(state.infoArray)
            temp.push(data.payload)
            console.log("temp----", temp)
            return {
                ...state,
                infoArray: temp,

            }
        }
    }
})

export const { addNewInfoReducer } = infoSlice.actions
export default infoSlice.reducer