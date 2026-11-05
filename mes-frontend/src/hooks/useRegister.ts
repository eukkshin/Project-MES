import { registerMember } from "@/api/auth.http"
import { useMutation } from "@tanstack/react-query"

export const useRegisterMember = ()=>{
    
    return useMutation({
        mutationFn: registerMember,
    })
}