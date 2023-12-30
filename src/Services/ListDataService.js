import { get } from "../CommonFunctions/CommonFunction";
import { listDataAction } from "../Redux/Action/ListDataAction";

export async function listData(data) {
    const url = `https://salesapi.elabassist.com/api/Dashboard/SalesList?FromDate=${encodeURIComponent(data.fromDate)}&ToDate=${encodeURIComponent(data.toDate)}&SalesPersonID=${data.salesPersonID}&VersionID=${data.versionID}&StateID=${data.stateID}`;

    try {
        const response = await get(url);
        //console.log("first listData", JSON.stringify(response))
        if (response.isRequestSuccessFull) {
            listDataAction(response.response)
            return response
        } else {
            return response
        }
    } catch (error) {
        console.error("Dashboard error:", error);
        // Handle errors here
        throw error;
    }
}