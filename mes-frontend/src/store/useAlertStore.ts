import {create} from 'zustand';

type AlertType = "success" | "error" | "info";

interface ModalState {
    isOpen: boolean;
    title?: string;
    message: string;
    type: AlertType;
    onConfirm?: ()=>void;

    showAlert:(message:string, type?:AlertType, title?:string, onConfirm?:()=>void)=>void
    hideAlert:()=>void;
}

export const useAlertStore= create<ModalState>((set)=>({
    //초기값
    isOpen: false,
    title: undefined,
    message: "",
    type: 'info',
    onConfirm: undefined,

    showAlert: ( message, type='info',title, onConfirm)=>
        set({
            isOpen:true,
            message,
            type,
            title,
            onConfirm,
        }),
    hideAlert: ()=> set({isOpen:false}
    )
}))