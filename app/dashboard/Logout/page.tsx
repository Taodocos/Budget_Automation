'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        
        sessionStorage.clear(); 
        
        router.push("/dashboard/Login");
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-16 space-y-8 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-center text-gray-700">Logging out...</h2>
                <p className="text-center text-gray-600">You are being logged out. Please wait...</p>
            </div>
        </div>
    );
};

export default Logout;