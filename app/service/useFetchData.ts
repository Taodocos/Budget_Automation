
import { useEffect, useState } from "react";
import { fetchDataBackend, ReportFormData } from "./apiFetchEditData";

const useFetchData = (branchCode: string | null) => {
    const [data, setData] = useState<ReportFormData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!branchCode) return;

            try {
             
                const result = await fetchDataBackend(branchCode); 
                setData(result); 
            } catch (error) {
                setError('Error fetching data'); 
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [branchCode]);

    return { data, loading, error }; 
};

export default useFetchData;