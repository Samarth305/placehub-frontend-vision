import {api} from "@/lib/api";

export const getJobs = async (params? : any) => {
    const res = await api.get("/jobs",{params});
    return res.data;
}

export const applyJobs = async (jobId : String) => {
    const res = await api.post(`/jobs/apply`,{jobId});
    return res.data;
}