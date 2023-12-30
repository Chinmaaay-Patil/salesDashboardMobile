import { createSlice } from "@reduxjs/toolkit"

const init_state = {
    dashBoardCardData: [],
    dashBoardGraphData1: [],
    dashBoardGraphData2: [],
    newLeadArray: [],
    quotationArray: [],
    demoArray: [],
    closeLeadArray: [],
    salesPersonList:[],
    versionList:[],
    stateIDList:[],
    sourceLeadNameList:[],
    sourcePersonNameList:[],
    filterDataArray:[]
}

export const dashBoardStateSlice = createSlice({
    name: 'dashBoardStateReducer',
    initialState: init_state,
    reducers: {
        dashBoardReducer: (state, data) => {
            //console.log("data.payload.data", data.payload.data)

            // For Card data
            const tempdashBoardCardData = data.payload.data.table;
            const newLeadFilterArray = data.payload.data.table.filter((item) => item.leadStatus == "New Lead")
            const closeLeadFilterArray = data.payload.data.table.filter((item) => item.leadStatus == "Closed Leads")
            const quotationLeadFilterArray = data.payload.data.table.filter((item) => item.leadStatus == "Quotation")
            const demoFilterArray = data.payload.data.table.filter((item) => item.leadStatus == "Demo")

            //For Pie Chart
            const tempdashBoardGraphData1 = data.payload.data.table1;
            const pieData = [
                {
                    value: data.payload.data?.table1[0]?.count ? data.payload.data.table1[0].count : 0, color: '#987BDD', gradientCenterColor: '#CDBDF1',
                    //focused: true,
                },
                { value: data.payload.data?.table1[0]?.projectedAmount ? data.payload.data.table1[0].projectedAmount : 0, color: '#3763CC', gradientCenterColor: '#94C3FF' },
            ];
            const total = pieData.reduce((acc, curr) => acc + curr.value, 0);
            const pieDataInPercentage = pieData.map(data => ({
                ...data,
                value: total !== 0 ? parseFloat(((data.value / total) * 100).toFixed(2))  : 0 // Calculate percentage as a number
            }));

            //For Bar chart
            const tempdashBoardGraphData2 = data.payload.data.table2;
            const stackData = data.payload.data.table2.map(person => {
                const count = person.count !== null && person.count !== undefined && person.count !== '' ? person.count : 0;
                const projectedAmount = person.projectedAmount !== null && person.projectedAmount !== undefined && person.projectedAmount !== '' ? person.projectedAmount : 0;
                const salesPersonName = person.salesPersonName || 'Unknown';

                return {
                    stacks: [
                        { value: count, color: '#F26462' },
                        { value: projectedAmount, color: '#F5915A', marginBottom: 2 },
                    ],
                    label: salesPersonName,
                };
            });
            
            return {
                ...state,
                dashBoardCardData: tempdashBoardCardData.length > 0 ? tempdashBoardCardData : [],
                dashBoardGraphData1: tempdashBoardGraphData1.length > 0 ? tempdashBoardGraphData1 : [],
                dashBoardGraphData2: tempdashBoardGraphData2.length > 0 ? tempdashBoardGraphData2 : [],
                newLeadArray: newLeadFilterArray.length > 0 ? newLeadFilterArray : [],
                closeLeadArray: closeLeadFilterArray.length > 0 ? closeLeadFilterArray : [],
                quotationArray: quotationLeadFilterArray.length > 0 ? quotationLeadFilterArray : [],
                demoArray: demoFilterArray.length > 0 ? demoFilterArray : demoFilterArray,
                pieData: pieDataInPercentage ? pieDataInPercentage : [],
                stackData: stackData ? stackData : []
            }
        },
        salesPersonListReducer: (state,data) =>{
            //console.log("data sales person list reducer",JSON.stringify(data))
            return{
                ...state,
                salesPersonList:data.payload.data
            }
        },
        versionListReducer: (state,data) =>{
            //console.log("data versionListReducer list reducer",JSON.stringify(data))
            return{
                ...state,
                versionList:data.payload.data
            }
        },
        stateIDListReducer: (state,data) =>{
            //console.log("data stateIDListReducer list reducer",JSON.stringify(data))
            return{
                ...state,
                stateIDList:data.payload.data
            }
        },
        sourecLeadListReducer: (state,data) =>{
            //console.log("data sourecLeadListReducer list reducer",JSON.stringify(data))
            return{
                ...state,
                sourceLeadNameList:data.payload.data
            }
        },
        sourecPersonListReducer: (state,data) =>{
            //console.log("data sourecPersonListReducer list reducer",JSON.stringify(data))
            return{
                ...state,
                sourcePersonNameList:data.payload.data
            }
        },
        addfilterInfoReducer: (state,data) =>{
            //console.log("datadata data",data.payload)
            return {
                ...state,
                filterDataArray: data.payload,

            }
        }
    }
})

export const { dashBoardReducer ,salesPersonListReducer,versionListReducer,stateIDListReducer,sourecLeadListReducer,sourecPersonListReducer,addfilterInfoReducer} = dashBoardStateSlice.actions
export default dashBoardStateSlice.reducer