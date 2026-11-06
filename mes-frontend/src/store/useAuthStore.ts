'use client';

import {create} from 'zustand'

interface AuthState {
    token: string | null;
    isAuth: boolean;
    username: string | null;
    isInitialized: boolean; // 인증 초기화 여부

    login:(token:string, username:string)=> void;
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
    isAuth: false,
    username: null,
    isInitialized: false,

    //로그인
    login:(token, username)=>{
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        set({
            token, isAuth:true, username
        })
    },
    //로그아웃
    logout: ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        set({
            token:null,
            isAuth:false,
            username:null,
        })
    },

    // 인증 초기화
    initializeAuth: ()=> {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        // 토큰이 없거나 만료된 경우
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            
            set({
                token:null, 
                isAuth: false, 
                username:null, 
                isInitialized:true,
            });
            return;
        }

        //유효기간 남은 토큰
        set({
            token,
            isAuth: true,
            username,
            isInitialized: true,
            });
    },
}))