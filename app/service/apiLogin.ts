import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import AdminapiServices from '../ExportAdminAPI';

// Define the expected request body type
export type LoginData = {
    username: string;
    password: string;
};

// Define the expected response type from the ASP.NET API
export type ApiResponse = {
    success: boolean;
    userId?: string;
    message?: string;
};

// Function to send login data to the ASP.NET API
const sendLoginData = async (data: LoginData): Promise<ApiResponse> => {
    try {
        const response = await AdminapiServices.post<ApiResponse>('/auth/login', data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response from API:', error.response?.data);
            throw new Error(error.response?.data.message || 'An error occurred while logging in.');
        } else {
            console.error('Unexpected error:', error);
            throw new Error('An internal error occurred. Please try again later.');
        }
    }
};

// API handler function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { username, password }: LoginData = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required.' });
        }

        console.log('Received login data:', { username, password });

        try {
            const apiResponse = await sendLoginData({ username, password });

            if (apiResponse.success) {
                return res.status(200).json({
                    success: true,
                    userId: apiResponse.userId
                });
            } else {
                return res.status(401).json({ success: false, message: apiResponse.message || 'Login failed.' });
            }
        } catch (error: unknown) {
            console.error('Error during login process:', error);
            if (error instanceof Error) {
                return res.status(500).json({ success: false, message: error.message });
            }
            return res.status(500).json({ success: false, message: 'An unknown error occurred.' });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method not allowed.' });
    }
};

export default handler;