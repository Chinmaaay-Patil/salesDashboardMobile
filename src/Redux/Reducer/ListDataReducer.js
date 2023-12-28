import { createSlice } from "@reduxjs/toolkit"

const init_state = {
        listData:[]
 }

export const listDataStateSlice = createSlice({
    name: 'listDataStateReducer',
    initialState: init_state,
    reducers: {
        listDataReducer: (state, data) => {
            //console.log("data.payload.data",JSON.stringify(data.payload))
            const temp = data.payload.data
            return {
                ...state,
                listData : temp
            }
        }
    }
})

export const {listDataReducer} = listDataStateSlice.actions
export default listDataStateSlice.reducer