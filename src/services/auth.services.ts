import { api } from "../lib/api";

export const loginStudent = async (data:{
    email:String;
    password:String;
})=> {
    const res = await api.post("/auth/login",data);
    return res.data;
};

export const loginCompany = async (data:{
    email : String;
    password : String;
}) => {
    const res = api.post("/company/login",data);
    return res.data;
};

export const loginAdmin = async (data:{
    email : String;
    password : String;
}) => {
    const res = api.post("/comapny/login",data);
    return res.data;
};