// app/api/login/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import AdminapiServices from '@/app/ExportAdminAPI';

export async function POST(request: Request) {
    try {
        const body = await request.json(); // Parse the JSON body
        const { username, password } = body; 

        console.log("Login attempt:", { username, password }); 

        // Send login request to the ASP.NET API
        const apiResponse = await AdminapiServices.post('/auth/login', { username, password });

       
        if (apiResponse.data.success) {
            return NextResponse.json({ message: "Login successful!",

                userId: apiResponse.data.userId , 
                branch_code:apiResponse.data.branch_code,
                branch_name:apiResponse.data.branch_name,
                region:apiResponse.data.region,
                district_code:apiResponse.data.district_code , 
                IsHr:apiResponse.data.IsHr , 
                IsCoo:apiResponse.data.IsCoo,
                IsDis:apiResponse.data.IsDis,
                IsBus:apiResponse.data.IsBus,
                IsBan:apiResponse.data.IsBan
                },
                  
                   { status: 200 });
                   
        } 
        
        else {
            return NextResponse.json({ message: apiResponse.data.message || "Invalid credentials" }, { status: 401 });
        }
    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json({ message: "Failed to process request" }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: "GET method not allowed for this route" }, { status: 405 });
}