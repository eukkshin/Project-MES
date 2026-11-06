'use client';

import {create} from 'zustand'

type UserRole = "ADMIN" | "EMPLOYEE";

interface AuthState {
    token: string | null;
    username: string | null;
    role: UserRole | null;
    isAuth: boolean;
    isInitialized: boolean; // 인증 초기화 여부

    login:(token:string, username:string, role: UserRole)=> void;
    logout: ()=>void;
    initializeAuth: () => void; // 추가
}

// JWT 만료 여부 확인
const isTokenExpired = (token:string): boolean=> {
    try{
        const payload = token.split('.')[1];

        if(!payload) return true;

        const decoded = JSON.parse(
            atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
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
    role:null,
    isAuth: false,
    isInitialized: false,

    //로그인
    login: (token, username, role)=>{
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem("role", role);

        set({
            token, isAuth:true, username, role
        })
    },
    //로그아웃
    logout: ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem("role");

        set({
            token:null,
            isAuth:false,
            username:null,
            role: null,
        })
    },

    // 인증 초기화
    initializeAuth: ()=> {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const savedRole = localStorage.getItem("role");

        const role = 
            savedRole === 'ADMIN' || savedRole === 'EMPLOYEE'
            ? savedRole
            : null;

        // 토큰이 없거나 만료된 경우
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            
            set({
                token:null, 
                isAuth: false, 
                username:null, 
                role:null,
                isInitialized:true,
            });
            return;
        }

        //유효기간 남은 토큰
        set({
            token,
            isAuth: true,
            role,
            username,
            isInitialized: true,
            });
    },
}))