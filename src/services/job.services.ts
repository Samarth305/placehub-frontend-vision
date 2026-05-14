import {api} from "@/lib/api";

export const getJobs = async (params? : any) => {
    const res = await api.get("/jobs",{params});
    return res.data;
}

export const applyJobs = async (jobId : String) => {
    const res = await api.post(`/jobs/apply`,{jobId});
    return res.data;
}

export const getApplications = async () => {
    const res = await api.get("/jobs/my-applications");
    return res.data;
}

export const createJob = async (data:any) => {
    const res = await api.post("/company/jobs",data);
    return res.data;
}

export const jobOpeningsOfCompany = async () => {
    const res = await api.get("/company/viewJobs");
    return res.data;
}

export const updateApplicationStatus = async (
    applicationId: string,
    status: string
) => {
    const res = await api.patch(`/company/applications/${applicationId}/status`,{status});
    return res.data;
}

export const getApplicants = async (jobId:String) => {
    const res = await api.get(`/company/jobs/${jobId}/applicants`);
    return res.data;
}