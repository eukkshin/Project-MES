import { getEmployeeDirectory, getEmployees, getPendingUsers, rejectPendingUser, updateEmployee, updatePendingUser } from "@/api/hr.http"
import { ApproveUserRequest, Employee, EmployeeDirectory } from "@/types/hr"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const hrkey = ['employees'] as const
const directoryKey = ["employeeDirectory"] as const;
const pendingUsersKey = ["pendingUsers"] as const;

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

//가입 승인 대기 / 승인 / 반려
export const useGetPendingUsers = () => {
    return useQuery({
      queryKey: pendingUsersKey,
      queryFn: getPendingUsers,
    });
  };

  // 회원가입 승인 (자동 사번 발급 + Employee 생성)
  export const useApprovePendingUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ userId,payload }: {
        userId: number;
        payload: ApproveUserRequest;
      }) => updatePendingUser(userId, payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: pendingUsersKey });
        queryClient.invalidateQueries({ queryKey: hrkey });
        queryClient.invalidateQueries({ queryKey: directoryKey });
      },
    });
  };

  // 회원가입 반려
export const useRejectPendingUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => rejectPendingUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pendingUsersKey });
    },
  });
};


