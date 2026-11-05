import { api } from "@/lib/axios";

export interface RegisterFormData  {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    companyName: string;
    position: string;
    tel: string;
    address: string;
    detailAddress: string;
    gender: string;
}

export type RegisterRequest = Omit<RegisterFormData, "repeatPassword">

//회원가입
export const registerMember = async(formData: RegisterRequest)=>{
    const response = await api.post('/api/auth/register', formData)
    return response.data;
}
//로그인
export const loginMember = async({email,password}:{email:string, password:string })=>{
    const response = await api.post('/api/auth/login', {email,password})
    return response.data;
}
//비밀번호찾기
export const changePassword = async({oldPassword,newPassword}:{oldPassword:string, newPassword:string })=>{
    const response = await api.post('/api/members/change-password', {oldPassword,newPassword})
    return response.data;
}