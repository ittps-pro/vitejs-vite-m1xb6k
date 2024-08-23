import { useState, useEffect } from 'react';
import axios from 'axios';

function Form() {
  const [formData, setFormData] = useState({
    // ... (Initialize with empty values for Bitrix24 deal fields)
  });
  const [dealFields, setDealFields] = useState([]);

  useEffect(() => {
    const fetchDealFields = async () => {
      try {
        // Replace with your Bitrix24 API endpoint and access token
        const response = await axios.get(
          'https://your-bitrix24-domain.bitrix24.com/rest/1.0/crm.deal.list?fields=*',
          {
            headers: {
              Authorization: 'Bearer your-access-token',
            },
          }
        );
        setDealFields(response.data.result);
      } catch (error) {
        console.error('Error fetching deal fields:', error);
      }
    };

    fetchDealFields();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your Bitrix24 API endpoint for creating a deal
      const response = await axios.post(
        'https://your-bitrix24-domain.bitrix24.com/rest/1.0/crm.deal.add',
        formData,
        {
          headers: {
            Authorization: 'Bearer your-access-token',
          },
        }
      );
      console.log('Deal created successfully:', response.data);
    } catch (error) {
      console.error('Error creating deal:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      {dealFields.map((field) => (
        <div key={field.ID} className="mb-4">
          <label
            htmlFor={field.ID}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {field.NAME}
          </label>
          <input
            type="text" // Adjust input type based on field type
            name={field.ID}
            id={field.ID}
            value={formData[field.ID] || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
