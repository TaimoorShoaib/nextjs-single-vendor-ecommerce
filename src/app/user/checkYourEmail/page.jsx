"use client"
import { useEffect, useState } from "react";
import style from "./checkYourEmail.module.css";
import useAutoLogin from "../../../hooks/useAutoLogin";
import Loader from "../../../components/Loader/loader";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const VerificationCode = () => {
    const router = useRouter();
    const loading = useAutoLogin();
    const [isVerified, setIsVerified] = useState(false);
    const isVerifiedRedux = useSelector((state) => state.user.isVerified);

    useEffect(() => {
        setIsVerified(isVerifiedRedux);
    }, [isVerifiedRedux]); // Use isVerifiedRedux instead of isVerified

    useEffect(() => {
        if (isVerified) {
            router.push("/");
        }
    }, [isVerified, router]); // Add router to the dependency array

    const handleGmailLinkClick = () => {
        window.open("https://mail.google.com", "_blank");
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className={style.loginWrapper3}>
            <h2 className={style.h2}>Check Your Email for Verification Code</h2>
            <p className={style.p}>
                We've sent a verification code to your email. Please check your email
                inbox.
            </p>
            <p className={style.p}>
                If you can't find the email, please make sure to check your spam folder
                as well.
            </p>
            <p className={style.p}>
                Click <span className={style.span} onClick={handleGmailLinkClick}>here</span> to open Gmail in
                a new tab.
            </p>
        </div>
    );
};

export default VerificationCode;