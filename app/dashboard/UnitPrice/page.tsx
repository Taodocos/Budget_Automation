'use client';
import { useEffect, useState } from "react";
import { sendDataBackend, FormData } from "@/app/service/apiAddUnitPrice"; // Ensure this import is correct
import { fetchSourcesById } from "@/app/service/apiFetchItem";

interface Item {
  itemCode: string; // Adjusting based on your API response
  itemName: string; // Adjusting based on your API response
}

const UnitPrice = () => {
  const [unitPrice, setUnitPrice] = useState('');
  const [items, setItems] = useState<Item[]>([]); 
  const [selectedItem, setSelectedItem] = useState<string>(''); 
  const [dataRows, setDataRows] = useState<{ id: string; item: string; unitPrice: string; }[]>([]); // State for grid rows

  const fetchSources = async () => {
    try {
      const data = await fetchSourcesById();
      if (data && data.length > 0) {
        setItems(data); // Set the fetched items to state
      } else {
        console.warn("No items found.");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchSources(); // Fetch items when component mounts
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a single FormData object
    const dataToSend: FormData = {
      item: selectedItem,
      unitPrice,
    };
    
    try {
      await sendDataBackend(dataToSend); // Send the data
      
      const newRow = {
        id: Date.now().toString(),
        item: selectedItem,
        unitPrice,
      };
      setDataRows([...dataRows, newRow]);
      setSelectedItem('');
      setUnitPrice('');
    } catch (error) {
      console.error("Error sending data:", error);
      window.alert("Error submitting data");
    }
  };
  const handleDelete = (rowId: string) => {
    setDataRows(dataRows.filter(row => row.id !== rowId));
  };

  return (
    <div className="flex flex-col items-start justify-start bg-gray-100 min-h-screen p-4">
      <form className="flex flex-wrap space-x-4 w-full max-w-4xl mb-4" onSubmit={handleSubmit}>
        <div className="flex-1">
          <label htmlFor="item" className="block text-sm font-medium text-gray-600">Item</label>
          <select
            id="item"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            required
            className="block w-full px-4 py-2 border border-gray-300 rounded text-black focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">Select an item</option>
            {items.map((item) => (
              <option key={item.itemCode} value={item.itemCode}>{item.itemName}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-600">Unit Price</label>
          <input
            type="text"
            id="unitPrice"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            required
            className="block w-full px-4 py-2 border border-gray-300 rounded text-black focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="self-start mb-4 px-4 py-2 font-semibold text-white bg-[#025AA2] rounded-md hover:bg-[#fedc61] focus:outline-none focus:ring focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      {/* Grid for displaying data rows */}
      <div className="w-full max-w-4xl">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <th className="border p-2">Item</th>
              <th className="border p-2">Unit Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row) => (
              <tr key={row.id} className="text-sm text-gray-700">
                <td className="border p-2">{row.item}</td>
                <td className="border p-2">{row.unitPrice}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnitPrice;