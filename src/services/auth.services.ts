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
    const res = await api.post("/company/login",data);
    return res.data;
};

export const loginAdmin = async (data:{
    email : String;
    password : String;
}) => {
    const res = await api.post("/admin/login",data);
    return res.data;
};

export const signupStudent = async (data:{
    name: String;
    email: String;
    password: String;
    cgpa: Number;
    dept: String;
    institute: String;
}) => {
    const res = await api.post("/auth/signup",data);
    return res.data;
}

export const signupCompany = async (data:{
    name: String;
    email: String;
    password: String;
    location: String;
    description: String;
}) => {
    const res = await api.post("/company/signup",data);
    return res.data;
}