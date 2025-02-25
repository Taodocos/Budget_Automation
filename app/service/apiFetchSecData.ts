// pages/api/getFormatsByBranch.js

import type { NextApiRequest, NextApiResponse } from 'next'; 
import apiServices from '../ExportApi'; 


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { branch_code, parent_code } = req.body;

        try {
            const payload = { branch_code, parent_code }; 
            console.log("Payload being sent to external API:", JSON.stringify(payload, null, 2));
            
      
            const response = await apiServices.post('/getformats_by_branch', payload);

            if (response.status !== 200) {
                return res.status(response.status).json({ error: 'Failed to fetch data from external API' });
            }

            
            const data = response.data; 
            console.log("Original API Response:", data);

            if (data && data.data) { 
              
                return res.status(200).json(data.data); 
            } else {
                console.log("No data returned for the given branch code.");
                return res.status(404).json({ error: "No data found" }); 
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            return res.status(500).json({ error: 'Internal Server Error' }); // Handle errors
        }
    } else {
       
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}