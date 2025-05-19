import axios from "axios";

export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans";
    try {
        const res = await axios.get(url);
        return res.data.vans;
        // return id ? res.data.van : res.data.vans; // Return the vans data
    } catch (error) {
        throw {
            message: "Failed to fetch vans", 
            statusText: error.response?.statusText || "Unknown Error",
            status: error.response?.status || 500,
        };
    }
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
    try {
        const res = await axios.get(url);
        // return id ? res.data.van : res.data.vans;
        return res.data.vans;
    } catch (error) {
        throw {
            message: "Failed to fetch vans",
            statusText: error.response?.statusText || "Unknown Error",
            status: error.response?.status || 500
        };
    }
}

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    try {
        const res = await axios.post("/api/login", creds, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error) {
        throw {
            message: error.response?.data?.message || "Login failed",
            statusText: error.response?.statusText || "Unknown Error",
            status: error.response?.status || 500
        };
    }
}