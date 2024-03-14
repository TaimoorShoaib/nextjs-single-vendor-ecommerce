"use client"
import Link from "next/link"
import { useRouter } from 'next/navigation';
export default function Protected({isAuth,children}){
    const router = useRouter()
   if(isAuth){
    return children
   }else{
    router.push('/login');
    return null;
   }
}