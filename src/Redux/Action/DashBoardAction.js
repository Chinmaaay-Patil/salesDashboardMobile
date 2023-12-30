import store from "../store";
import {addfilterInfoReducer, dashBoardReducer,salesPersonListReducer, sourecLeadListReducer, sourecPersonListReducer, stateIDListReducer, versionListReducer} from "../Reducer/DashBoardReducer"

const {dispatch} = store

export function dashBoardAction(data) {
    //console.log('dashBoardAction Action Data',data);
    dispatch(dashBoardReducer(data))
}

export function salesPersonListAction(data) {
    //console.log('salesPersonListAction Action Data',data);
    dispatch(salesPersonListReducer(data))
}

export function VersionListAction(data) {
    //console.log('VersionListAction Action Data',data);
    dispatch(versionListReducer(data))
}

export function StateIDListAction(data) {
    //console.log('StateIDListAction Action Data',data);
    dispatch(stateIDListReducer(data))
}

export function SourceLeadListAction(data) {
    //console.log('SourceLeadListAction Action Data',data);
    dispatch(sourecLeadListReducer(data))
}

export function SourcePersonListAction(data) {
    //console.log('SourceLeadListAction Action Data',data);
    dispatch(sourecPersonListReducer(data))
}

export function addfilterInfoAction(data) {
    //console.log('addfilterInfoReducer Action Data',  data);
    dispatch(addfilterInfoReducer(data)) 
}