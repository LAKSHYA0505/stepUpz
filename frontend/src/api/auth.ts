import type { SignInRequest } from '@/types/auth';
import axios from 'axios';

const api= axios.create({
    baseURL: 'http://localhost:8081',
});

// api.interceptors.request.use((config) => {
//     if(config.url?.startsWith("/api/v1/auth")){
//         return config;
//     }

//     const userSession = localStorage.get('userSession');
//     if(userSession){
//         const {token} = JSON.parse(userSession);
//     }
// });
export const signIn = (signInRequest: SignInRequest) => 
    api.post("/api/v1/auth/signin", signInRequest);
