"use client"
import { useRouter } from 'next/navigation';
export default function Protected({isAuth,children}){
    const router = useRouter()
   if(isAuth){
    return children
   }else{
    router.push('/user/login');
    return null;
   }
}