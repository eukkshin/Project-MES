import { getEmployees, updateEmployee } from "@/api/hr.http"
import { Employee } from "@/types/hr"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const hrkey = ['employees'] as const

export const useGetEmployees = ()=>{
    return(
        useQuery<Employee[]>({
            queryKey:hrkey,
            queryFn: getEmployees,
        })
    )
}

export const useUpdateEmployee = ()=>{
    const queryClient = useQueryClient();
    return(
        useMutation({
            mutationFn: updateEmployee,
            onSuccess: ()=>{
                queryClient.invalidateQueries({
                    queryKey:hrkey,
                })
            }

        })
    )
}