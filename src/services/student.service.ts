import { api } from "../lib/api";

export const viewProfile = async () => {
    const res = await api.get("/student/profile");
    return res.data;
}

export const uploadResume = async (file: File) => {
    const formData = new FormData();
    formData.append("resume" , file);
    const res = await api.post("/student/upload-resume",formData,{
        headers:{
            "Content-Type":"multipart/form-data",
        },
    });
    return res.data;
}

const updateProfile = async (data : { name: string; cgpa: number; dept: string; institute: string }) => {
    const res = await api.patch("/student/editProfile",data);
    return res.data;
}