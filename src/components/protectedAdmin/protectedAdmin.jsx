"use client"
import { useRouter } from 'next/navigation';
export default function Protected({isAdmin,children}){
    const router = useRouter()
   if(isAdmin){
    return children
   }else{
    router.push('/');
    return null;
   }
}