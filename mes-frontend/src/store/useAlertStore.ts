import {create} from 'zustand';

type AlertType = "success" | "error" | "info";

interface ModalState {
    isOpen: boolean;
    message: string;
    type: AlertType;
    title?: string;
    onConfirm?: ()=>void;

    showAlert:(message:string, type?:AlertType, title?:string, onConfirm?:()=>void)=>void
    hideAlert:()=>void;
}

export const useAlertStore= create<ModalState>((set)=>({
    //초기값
    isOpen: false,
    message: "",
    type: 'info',
    title: undefined,
    onConfirm: undefined,

    showAlert: ( message, type='info',title, onConfirm)=>
        set({
            isOpen:true,
            message,
            type,
            title: title ?? undefined,
            onConfirm: onConfirm ?? undefined,
        }),
    hideAlert: ()=> 
        set({
            isOpen:false,
            title: undefined,
            onConfirm:undefined
        }
    )
}))