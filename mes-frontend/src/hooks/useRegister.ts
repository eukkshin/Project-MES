import { getUserProfile, registerMember } from "@/api/auth.http"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useRegisterMember = ()=>{
    
    return useMutation({
        mutationFn: registerMember,
    })
}

export const useGetUserProfile = ()=>{

    return useQuery({
        queryKey:['profile'],
        queryFn:getUserProfile
    })
}