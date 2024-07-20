import React, { useEffect, useState } from "react";
import FormComp from "./FormComp";
import axios from "axios";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false); // Manage modal visibility

  const BASE_URL = `https://crudcrud.com/api/${process.env.REACT_APP_API_KEY}`;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createData = async (newData) => {
    try {
      const response = await axios.post(`${BASE_URL}/user`, newData);
      setData([...data, response.data]); // Add new data to state
    } catch (error) {
      console.error('Error creating data', error);
    }
  };

  const updateData = async (id, updatedData) => {
    try {
      const { _id, ...cleanedData } = updatedData; // Exclude _id from update payload
      await axios.put(`${BASE_URL}/user/${id}`, cleanedData);
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error('Error updating data', error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/user/${id}`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  const handleEdit = (item) => {
    setFormData(item); // Set form data with item details
    setEditingId(item._id); // Set editing ID
    setShowModal(true); // Show modal for editing
  };

  return (
    <div className="container">
      <h1>CRUD Operations Example</h1>
      <FormComp
        formData={formData}
        setFormData={setFormData}
        createData={createData}
        updateData={updateData}
        editingId={editingId}
        setEditingId={setEditingId}
        showModal={showModal} // Pass showModal state
        setShowModal={setShowModal} // Pass setShowModal function
      />
      <h2>Data List</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.dob}</td>
                  <td>
                    <button onClick={() => handleEdit(item)} className="btn btn-primary btn-sm">Edit</button>
                    <button onClick={() => deleteData(item._id)} className="btn btn-danger btn-sm ms-2">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
