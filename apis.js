import axios from "axios";

export async function getVans() {
    try {
        const res = await axios.get("/api/vans");
        return res.data.vans; // Return the vans data
    } catch (error) {
        throw {
            message: "Failed to fetch vans", 
            statusText: error.response?.statusText || "Unknown Error",
            status: error.response?.status || 500,
        };
    }
}