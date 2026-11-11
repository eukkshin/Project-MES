
import * as S from '@/assets/css/common/pagination/Pagination.styles'
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

interface PaginationProps {
    pageIndex: number;
    totalPages: number;
    onPageChange: (pageIndex:number)=> void;
}

export default function Pagination({
    pageIndex,
    totalPages,
    onPageChange,
}:PaginationProps){

    const pageGroupSize = 5;
    const pageGroup= Math.floor(pageIndex/pageGroupSize);
    const startPageIndex= pageGroup * pageGroupSize;

    const visiblePageCount = Math.min(pageGroupSize, totalPages - startPageIndex);

    if (totalPages <= 1) return null;

    return(
        <S.Pagination>
            <S.PageButton
                disabled={pageIndex === 0}
                onClick={() => onPageChange(0)}
                title="맨 처음으로"
            >
                <FaAnglesLeft />
            </S.PageButton>
            <S.PageButton
            disabled={pageIndex===0}
            onClick={()=>onPageChange(pageIndex-1)}
            >
                <FaAngleLeft/>
            </S.PageButton>

            <S.PageNumberGroup>
                {Array.from({ length: visiblePageCount}, (_, index)=>{
                    const pageNumber = startPageIndex+index;

                    return(
                        <S.PageNumberBtn
                        key={pageNumber}
                        $active={pageNumber === pageIndex}
                        onClick={()=>onPageChange(pageNumber)}
                        >
                            {pageNumber+1}
                        </S.PageNumberBtn>
                    )
                })}
            </S.PageNumberGroup>

            <S.PageButton
            disabled={pageIndex>=totalPages-1}
            onClick={()=>onPageChange(pageIndex+1)}
            >
                <FaAngleRight/>
            </S.PageButton>

            <S.PageButton
            disabled={pageIndex >= totalPages - 1}
            onClick={() => onPageChange(totalPages - 1)}
            title="맨 마지막으로"
            >
            <FaAnglesRight />
            </S.PageButton>
        </S.Pagination>
    )
}