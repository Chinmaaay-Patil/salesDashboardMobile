import { get } from "../CommonFunctions/CommonFunction";
import { SourceLeadListAction, SourcePersonListAction, StateIDListAction, VersionListAction, dashBoardAction, salesPersonListAction } from "../Redux/Action/DashBoardAction";

export async function DashBoardData() {

    try {
        const response = await get('https://salesapi.elabassist.com/api/Dashboard');
        console.log("res====", response)
        if (response.isRequestSuccessFull) {
            //await dashBoardAction(response.response)
            return response;
        } else {
            return response
        }
    } catch (error) {
        console.error("Dashboard error:", error);
        // Handle errors here
        //throw error;
        return error
    }
}

export async function DashBoardCardData(data) {
    console.log("data", data)
    const url = 'https://salesapi.elabassist.com/api/Dashboard/GetSalesDashboard';
    const apiUrl = `${url}?FromDate=${encodeURIComponent(data.fromDate)}&ToDate=${encodeURIComponent(data.toDate)}&SalesPersonID=${data.salesPersonID}`;
    console.log("api ", apiUrl)
    try {
        const response = await get(apiUrl);
        console.log("res====", response)
        if (response.isRequestSuccessFull) {
            await dashBoardAction(response.response)
            return response;
        } else {
            return response
        }
    } catch (error) {
        console.error("Dashboard error:", error);
        // Handle errors here
        //throw error;
        return error
    }
}

export async function SalesPersonList() {
    const url = 'https://salesapi.elabassist.com/api/Dashboard/GetSalesPerson';

    try {
        const response = await get(url);
        //console.log("res SalesPersonList ", response)
        if (response.isRequestSuccessFull) {
            await salesPersonListAction(response.response)
            return response;
        } else {
            return response
        }
    } catch (error) {
        console.error("Dashboard error:", error);
        // Handle errors here
        //throw error;
        return error
    }
}

export async function VersionList() {
    const url = 'https://salesapi.elabassist.com/api/Dashboard/GetVersion';

    try {
        const response = await get(url);
        //console.log("res SalesPersonList ", response)
        if (response.isRequestSuccessFull) {
            await VersionListAction(response.response)
            return response;
        } else {
            return response
        }
    } catch (error) {
        console.error("Dashboard error:", error);
        // Handle errors here
        //throw error;
        return error
    }
}

export async function StateIDList() {
    const url = 'https://salesapi.elabassist.com/api/Dashboard/GetState';

    try {
        const response = await get(url);
        //console.log("res StateIDList ", response)
        if (response.isRequestSuccessFull) {
            await StateIDListAction(response.response)
            return response;
        } else {
            return response
        }
    } catch (error) {
        console.error("Dashboard error:", error);
        // Handle errors here
        //throw error;
        return error
    }
}

export async function SourceLeadNameList() {
    const url = 'https://salesapi.elabassist.com/api/Dashboard/GetSourceLead';

    try {
        const response = await get(url);
        //console.log("res StateIDList ", response)
        if (response.isRequestSuccessFull) {
            await SourceLeadListAction(response.response)
            return response;
        } else {
            return response
        }
    } catch (error) {
        console.error("Dashboard error:", error);
        // Handle errors here
        //throw error;
        return error
    }
}

export async function SourcePersonNameList() {
    const url = 'https://salesapi.elabassist.com/api/Dashboard/GetSourcePerson';

    try {
        const response = await get(url);
        //console.log("res StateIDList ", response)
        if (response.isRequestSuccessFull) {
            await SourcePersonListAction(response.response)
            return response;
        } else {
            return response
        }
    } catch (error) {
        console.error("Dashboard error:", error);
        // Handle errors here
        //throw error;
        return error
    }
}