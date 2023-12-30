import { get, post } from "../CommonFunctions/CommonFunction";
import { listDataAction } from "../Redux/Action/ListDataAction";

export async function dataEnter(data) {
    const url = "https://salesapi.elabassist.com/api/Dashboard/CreateSalesTrack";

    try {
        const response = await post(url,data);
        console.log("first dataEnter", JSON.stringify(response))
        if (response.isRequestSuccessFull) {
            //listDataAction(response.response)
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