'use client';

import {create} from 'zustand'

interface AuthState {
    token: string | null;
    isAuth: boolean;
    username: string | null;

    login:(token:string, username:string)=> void;
    logout: ()=>void;
    initializeAuth: () => void; // 추가
}

export const useAuthStore = create<AuthState>((set)=>({
    token: null,
    isAuth: false,
    username: null,

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
    initializeAuth: ()=> {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        set({
            token, isAuth: !!token, username
        })
    },
}))