const handleLogin = async (username: string, password: string): Promise<void> => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();

        if (data.success) {
            // Store user ID and other details in sessionStorage
            sessionStorage.setItem("userId", data.userId.toString());
            sessionStorage.setItem("branch_code", data.branch_code);
            sessionStorage.setItem("district_code", data.district_code);
            // You can store more data as needed

            console.log("Login successful!", data);
        } else {
            console.error("Invalid credentials:", data.message);
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
};