import { createSlice } from "@reduxjs/toolkit"

const init_state = {
        mobileNumber:""
 }

export const mobileNumberStateSlice = createSlice({
    name: 'mobileNumberStateReducer',
    initialState: init_state,
    reducers: {
        mobileNumberReducer: (state, data) => {
            console.log("data.payload.data",typeof data.payload.mobileNumber)
            //state.mobileNumber = data.payload.mobileNumber
            const temp = data.payload.mobileNumber
            return {
                ...state,
                mobileNumber : temp
            }
        }
    }
})

export const {mobileNumberReducer} = mobileNumberStateSlice.actions
export default mobileNumberStateSlice.reducer