'use client';
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
    tableFeatures, 
    useTable, 
    rowPaginationFeature, 
    createPaginatedRowModel,
    type ColumnDef
} from '@tanstack/react-table';
import { 
    FaAngleLeft,
    FaAngleRight,
    FaAnglesLeft,
    FaAnglesRight,
    FaArrowRotateRight,
    FaChevronLeft,
    FaChevronRight,
    FaEnvelope,
    FaFolderOpen,
    FaMagnifyingGlass, 
    FaRegEnvelope, 
    FaRegMessage, 
    FaRegPenToSquare, 
    FaRotate, 
    FaUserShield 
} from "react-icons/fa6";
import * as S from "@/assets/css/admin/Hr.styles";
import CommonError from "@/components/common/CommonError";
import { useGetEmployeeDirectory } from "@/hooks/useHr";
import EqualizerLoader from "@/ui/feedback/EqualizerLoading";
import { DEPARTMENT_OPTIONS, type EmployeeDirectory } from "@/types/hr";
import Pagination from "@/components/common/pagination/Pagination";
import MessageModal from "@/components/modal/MessageModal";

const DIRECTORY_STATUS_OPTIONS = [
  { value: "ALL", label: "전체 상태" },
  { value: "active", label: "재직" },
  { value: "leave", label: "휴직" },
];

//컬럼정의
const features = tableFeatures({
    rowPaginationFeature,
    paginatedRowModel: createPaginatedRowModel(),
});

export default function EmployeeDirectoryPage(){

    const { data:employees=[], isLoading, isFetching, isError, error, refetch } = useGetEmployeeDirectory();

    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee]= useState<EmployeeDirectory|null>(null);

    const columns: ColumnDef<typeof features, EmployeeDirectory>[]= [
        {
            accessorKey: "name",
            header: "이름",
            cell: ({row})=>{
                const employee = row.original;
                return(
                    <S.HREmployeeIdentity>
                        <S.HRAvatar $role={employee.role}>
                            {employee.role === "ADMIN" ? (
                            <FaUserShield />
                            ) : (
                            employee.name.charAt(0)
                            )}
                        </S.HRAvatar>
                        <strong>{employee.name}</strong> 
                    </S.HREmployeeIdentity>
                );
            }
        },
        {
            accessorKey:'id',
            header: "사번",
        },
        {
            accessorKey: "department",
            header: "부서",
        },
        {
            accessorKey: "position",
            header: "직급",
            cell: ({ getValue }) => getValue() ?? "-",
        },
        {
            accessorKey: "email",
            header: "이메일",
            cell: ({ getValue }) => {
            const email = getValue<string | null>();

            return email ? (
                <S.HREmailLink href={`mailto:${email}`}>
                    <FaEnvelope />
                    {email}
                </S.HREmailLink>
            ) : (
                "-"
            );
        }},
        {
            accessorKey: "status",
            header: "상태",
            cell: ({ getValue }) => {
            const status = getValue<"active" | "leave">();

            return (
                <S.HRStatusBadge $status={status}>
                {status === "active" ? "재직" : "휴직"}
                </S.HRStatusBadge>
            );
            },
        },
        {
            id: "message",
            header: "쪽지",
            cell: ({ row }) => (
            <S.HRMessageButton
                type="button"
                title={`${row.original.name}님에게 쪽지 보내기`}
                aria-label={`${row.original.name}님에게 쪽지 보내기`}
                onClick={()=>{
                    setSelectedEmployee(row.original);
                    setIsMessageOpen(true);
                }}
            >
                <FaRegEnvelope />
            </S.HRMessageButton>
            ),
        },
    ];
        
    const filteredEmployees = useMemo(()=>{
        const keyword= searchTerm.trim().toLowerCase();

        return employees.filter( employee=> {
            const matchSearch =
            keyword === ''||
            employee.name.toLowerCase().includes(keyword) ||
            employee.id.toLowerCase().includes(keyword) ||
            employee.department.toLowerCase().includes(keyword) ||
            employee.email?.toLowerCase().includes(keyword) 

            const matchDepartment=
                departmentFilter === 'ALL' ||
                employee.department === departmentFilter;

            const matchStatus =
                statusFilter === 'ALL' || 
                employee.status === statusFilter;
            
                return matchSearch && matchDepartment && matchStatus
        } )

    } , [employees, searchTerm, departmentFilter, statusFilter] )
 
    const table = useTable({
        features,
        columns,
        data: filteredEmployees,

        initialState:{
            pagination:{
                pageIndex:0,
                pageSize:10,
            }
        }
    });

    const pageIndex = table.state.pagination.pageIndex;
    const totalPages = table.getPageCount();

    useEffect(()=>{
        table.setPageIndex(0)
    },[searchTerm, departmentFilter, statusFilter])

    const handleRefresh=()=>{
        setSearchTerm("");
        setDepartmentFilter("ALL");
        setStatusFilter("ALL");
    }

    if(isLoading){
        return <EqualizerLoader message="직원 정보를 불러오는 중... 잠시만 기다려주세요"/>
    }
    if(isError){
        const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;

        return(
            <CommonError 
            message={errorMessage || '직원 정보를 불러오지 못했습니다.'}
            reset={refetch}
            />
        );
    }
    
    return(
        <>
        <S.PageContainer>
            <S.PageHeader>
                <S.PageHeading>
                    <S.Eyebrow>EMPLOYEE DIRECTORY</S.Eyebrow>
                    <S.PageTitle>직원 찾기</S.PageTitle>
                    <S.PageDescription>
                    함께 일하는 동료들의 정보를 확인하고 연락해 보세요.
                    </S.PageDescription>
                </S.PageHeading>

                 <S.RefreshButton
                    type="button"
                    onClick={() => void refetch()}
                    disabled={isFetching}
                >
                    <FaArrowRotateRight />
                    {isFetching ? "조회 중..." : "새로고침"}
                </S.RefreshButton>
            </S.PageHeader>
            <S.Panel>
                <S.HRPanelHeader>
                    <S.HRPanelTitle>
                    <h2>전체 직원 목록</h2>
                    <p>동료들의 연락처와 재직 정보를 확인할 수 있습니다.</p>
                    </S.HRPanelTitle>

                    <S.HRItemCount>
                        {filteredEmployees.length}명
                    </S.HRItemCount>
                </S.HRPanelHeader>

                <S.HRToolbar>
                    <S.HRSearchWrapper>
                        <FaMagnifyingGlass />
                        <S.HRSearchInput
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="이름, 사번, 부서, 이메일 검색"
                        />
                    </S.HRSearchWrapper>
        
                    <S.HRFilterGroup>
                        <S.HRFilterSelect
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                        >
                            <option value="ALL">전체 부서</option>
                            {DEPARTMENT_OPTIONS.map((department) => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                            ))}
                        </S.HRFilterSelect>
            
                        <S.HRFilterSelect
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                        {DIRECTORY_STATUS_OPTIONS.map(opt=> (
                            <option value={opt.value} key={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                        </S.HRFilterSelect>
        
                        <S.ResetButton
                            type="button"
                            onClick={handleRefresh}
                            title="검색 및 필터 초기화"
                        >
                            <FaRotate />
                        </S.ResetButton>
                    </S.HRFilterGroup>
                </S.HRToolbar>
                
                {/*TanStack Table */}
                <S.HRTableWrapper>
                    <S.HRTable>
                        <thead>
                            {table.getHeaderGroups().map((headerGroup)=>(
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header=>(
                                        <th key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <table.FlexRender header={header}/>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row)=>(
                                <tr key={row.id}>
                                    {row.getAllCells().map((cell)=> (
                                        <td key={cell.id}>
                                            <table.FlexRender cell={cell}/>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ):(
                        <tr>
                            <td colSpan={columns.length}>
                                <S.HREmptyState>
                                    <FaFolderOpen/>
                                    <strong>검색 결과가 없습니다.</strong>
                                    <p>검색어나 필터 조건을 변경해 보세요.</p>
                                </S.HREmptyState>
                            </td>
                        </tr>
                        )}
                        </tbody>
                    </S.HRTable>
                </S.HRTableWrapper>

                <Pagination
                pageIndex={pageIndex}
                totalPages={totalPages}
                onPageChange={table.setPageIndex}
                />
            </S.Panel>
        </S.PageContainer>
        
        {isMessageOpen && selectedEmployee && (
            <MessageModal
            receiver={selectedEmployee}
            onClose={()=>{
                setIsMessageOpen(false);
                setSelectedEmployee(null);
            }}
            />
        )}
        </>
    )
}