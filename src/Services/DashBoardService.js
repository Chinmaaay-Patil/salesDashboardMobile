import { get } from "../CommonFunctions/CommonFunction";
import { dashBoardAction } from "../Redux/Action/DashBoardAction";

export async function DashBoardCardData(data) {
    //console.log("data",data)
    const url = 'https://salesapi.elabassist.com/SalesDashboard';
    const apiUrl = `${url}?FromDate=${encodeURIComponent(data.fromDate)}&ToDate=${encodeURIComponent(data.toDate)}&SalesPersonID=${data.salesPersonID}`;

    try {
        const response = await get(apiUrl);
        //console.log("res====", response)
        if (response.isRequestSuccessFull) {
            await dashBoardAction(response.response)
            return response;
        }else{
            return response
        }
    } catch (error) {
        console.error("Dashboard error:", error);
        // Handle errors here
        //throw error;
        return error
    }
}