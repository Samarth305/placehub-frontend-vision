import { api } from "@/lib/api";

export const getAdminStats = async () => {
    const response = await api.get("/admin/stats");
    return response.data;
};

export const getPendingCompanies = async () => {
    const response = await api.get("/admin/companies/pending");
    return response.data;
};

export const getAllCompanies = async (status?: string, search?: string) => {
    const response = await api.get("/admin/companies", {
        params: { status, search }
    });
    return response.data;
};

export const updateCompanyStatus = async (id: string, status: string) => {
    const response = await api.patch(`/admin/companies/${id}/updateCompanyStatus`, { status });
    return response.data;
};