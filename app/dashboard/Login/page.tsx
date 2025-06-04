'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true); 
        const loginData = { username, password };

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            console.log('Parsed Data:', data); 
    
            if (response.ok) {
                document.cookie = `userId=${data.userId}; path=/;`;
                console.log('Login successful:', data.message);
                console.log('User ID:', data.userId); 
                console.log('Branch Code:', data.branch_code); 
                
            
                sessionStorage.setItem('userId',data.userId);
                sessionStorage.setItem('branch_code', data.branch_code);
                sessionStorage.setItem('branch_name',data.branch_name);
                sessionStorage.setItem('region', data.region);
                sessionStorage.setItem('district_code',data.district_code);
                sessionStorage.setItem('IsHr',data.IsHr);
                sessionStorage.setItem('IsCoo',data.IsCoo);
                sessionStorage.setItem('IsDis',data.IsDis);
                sessionStorage.setItem('IsBus',data.IsBus);
                sessionStorage.setItem('IsBan',data.IsBan);
                sessionStorage.setItem('IsDig',data.IsDig);
                sessionStorage.setItem('IsStr',data.IsStr);
                sessionStorage.setItem('sessionId',data.sessionId);

    console.log("session", data.branch_code, data.district_code)
    
                // Redirect to dashboard or another page
                router.push('/dashboard');
            } else {
                alert(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error); 
            alert('An error occurred. Please try again later.');
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-96 bg-[#025AA2] text-white shadow-md flex flex-col items-center">
                <Image 
                    src="/pictures/amh.png" 
                    alt="Logo" 
                    width={240} // Set appropriate width
                    height={60} // Set appropriate height
                    className="p-4" 
                />
                <div className="p-4 font-bold text-xl">Amhara Bank S.C</div>
                <div className="p-2 text-x">Automate Plan and Budget</div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-lg p-16 space-y-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-4xl font-bold text-center text-gray-700">LOG IN</h2>

                        {loading && <p className="text-center text-blue-500">Loading...</p>} {/* Show loading when logging in */}
                    <form className="space-y-6" onSubmit={(e) => {
    e.preventDefault(); // Prevent default form submission
    handleLogin(); // Call handleLogin function
}}>
    <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
        <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="block w-full px-4 py-3 mt-1 border mb-4 p-2 border rounded text-black focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your username"
        />
    </div>
    <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full px-4 py-3 mt-1 border mb-4 p-2 border rounded text-black focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter your password"
        />
    </div>
    <button
        type="submit" // Set button type to 'submit'
        className="w-full px-4 py-3 font-semibold text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] focus:outline-none focus:ring focus:ring-blue-500"
    >
        Login
    </button>
</form>
                </div>
            </div>
        </div>
    );
};

export default Login;