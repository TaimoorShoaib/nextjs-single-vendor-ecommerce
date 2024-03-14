"use client"
import { useRouter } from 'next/navigation';
export default function PublicStopAuth({isAuth,children}){
    const router = useRouter()
   if(!isAuth){
    return children
   }else{
    router.push('/');
    return null;
   }
}