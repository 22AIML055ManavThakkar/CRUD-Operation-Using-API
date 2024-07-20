import React from 'react';
import "./App.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FormComp = ({ formData, setFormData, createData, updateData, editingId, setEditingId, showModal, setShowModal }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateData(editingId, formData);
    } else {
      if (formData?.name && formData?.email && formData?.phone) {
        if (formData?.phone.length !== 10) {
          alert('Phone number must be 10 digits');
          return;
        }
        await createData(formData);
      }
    }
    setFormData({ name: '', email: '', phone: '', dob: '' });
    setEditingId(null);
    setShowModal(false); // Close modal after submit
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '', dob: '' });
    setEditingId(null);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        {editingId ? 'Edit' : 'Create'} User
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit User' : 'Create User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
            /><br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            /><br />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              required
            /><br />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            /><br />
            <Button variant="primary" type="submit">{editingId ? 'Update' : 'Create'}</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FormComp;
