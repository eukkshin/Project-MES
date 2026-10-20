import axios from 'axios';
// import { useAlertStore } from '@/store/useAlertStore';
/*import { api } from '@/utils/axios';

 axios.get 대신 api.get을 사용!
   -> 요청 보낼 때 자동으로 localStorage 토큰이 헤더에 쏙 들어감
   -> 1시간 지나서 401 에러 나면 알아서 로그아웃 처리됨
*/

export const api = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials:true,
})

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization']= `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

// 401은 로그인조차 안 했거나 세션이 만료된 상태
// 403은 로그인은 되어 있지만 권한(예: 관리자 권한 등)이 없는 상태

api.interceptors.response.use(
    response=> {
        //성공적인 응답이면 그대로 통과
        return response;
    },
    error =>{
        //401 (인증 실패/세션 만료) 또는 403 (권한 없음)
        if(error.response){  
            const status = error.response.status;
            const serverMessage = error.response.data?.message;

            if(status ===401 || status ===403){
                const message = serverMessage || (status===401
                ? '로그인 세션이 만료되었습니다. 다시 로그인해주세요.'
                : '접근 권한이 없습니다.');
                
                alert(message); //추후에 변경
                // useAlertStore.getState().showAlert(message);
                // 훅 대신 getState()를 사용해서 커스텀 알림 호출!
            }

            if(status ===401){ // 401(인증만료)때만 토큰 청소 및 로그인 페이지로 이동
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                delete axios.defaults.headers.common['Authorization'];
                // 로그인 페이지로 강제 이동
                window.location.href = '/';
            }
            if(status === 403){
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
)