'use client';

import {create} from 'zustand'

export type UserRole = "ADMIN" | "EMPLOYEE";

interface AuthState {
    token: string | null;
    username: string | null;
    empId: string | null;
    role: UserRole | null;
    isAuth: boolean;
    isInitialized: boolean; // 인증 초기화 여부

    login:(token:string, username:string, role: UserRole, empId:string)=> void;
    logout: ()=>void;
    initializeAuth: () => void; 
}

// JWT 만료 여부 확인
const isTokenExpired = (token:string): boolean=> {
    try{
        const payload = token.split('.')[1];

        if(!payload) return true;

         // Base64 URL 형식을 일반 Base64 형식으로 변환
        const base64 = payload
        .replace(/-/g, "+")
        .replace(/_/g, "/");

        const decoded = JSON.parse(
        atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="))
        );
        if(typeof decoded.exp !== 'number') return true;

        return decoded.exp * 1000 <= Date.now();
    }catch {
        return true;
    }
}


export const useAuthStore = create<AuthState>((set)=>({
    token: null,
    username: null,
    empId:null,
    role:null,
    isAuth: false,
    isInitialized: false,

    //로그인
    login: (token, username, role,empId)=>{
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem("role", role);
        localStorage.setItem("empId", empId);

        set({
            token, 
            username, 
            role,  
            empId,
            isAuth:true, 
            isInitialized: true,
        })
    },
    //로그아웃
    logout: ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem("role");
        localStorage.removeItem("empId");

        set({
            token:null,
            username:null,
            role: null,
            empId:null,
            isAuth:false,
            isInitialized: true,
        })
    },

      // 새로고침 후 인증 상태 복원
    initializeAuth: ()=> {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const savedRole = localStorage.getItem("role");
        const empId= localStorage.getItem("empId");

        const role :UserRole | null = 
            savedRole === 'ADMIN' || savedRole === 'EMPLOYEE'
            ? savedRole
            : null;

         // 토큰이 없거나 만료되었거나 사용자 권한 정보가 없는 경우
        if (!token || isTokenExpired(token) || !role || !empId) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            localStorage.removeItem('empId');
            
            set({
                token:null, 
                username:null, 
                role:null,
                empId:null,
                isAuth: false, 
                isInitialized:true,
            });
            return;
        }

        // 유효한 토큰이 존재하는 경우
        set({
            token,
            username,
            role,
            empId,
            isAuth: true,
            isInitialized: true,
        });
    },
}))