import { getEmployeeDirectory, getEmployees, updateEmployee } from "@/api/hr.http"
import { Employee, EmployeeDirectory } from "@/types/hr"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const hrkey = ['employees'] as const
const directoryKey = ["employeeDirectory"] as const;


//관리자 인사관리 조회
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

//사내주소록 조회
export const useGetEmployeeDirectory = () => {
  return useQuery<EmployeeDirectory[]>({
    queryKey: directoryKey,
    queryFn: getEmployeeDirectory,
  });
};
