import React, { useState } from 'react';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import axios from 'axios';

const INFOGRAPHIC_MCP_URL = 'http://localhost:8000';

function AddEndpoint() {
  const [formData, setFormData] = useState({
    name: '',
    script: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${INFOGRAPHIC_MCP_URL}/endpoints`, formData);
      alert('Endpoint added successfully!');
      setFormData({ name: '', script: '', description: '' });
    } catch (error) {
      console.error('Error adding endpoint:', error);
      alert('Error adding endpoint');
    }
  };

  return (
    <Paper style={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Add New Endpoint
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Endpoint Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{ marginBottom: '1rem' }}
        />

        <TextField
          fullWidth
          multiline
          rows={6}
          label="Python Script"
          value={formData.script}
          onChange={(e) => setFormData({ ...formData, script: e.target.value })}
          style={{ marginBottom: '1rem' }}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          style={{ marginBottom: '1rem' }}
        />

        <Button type="submit" variant="contained" color="primary">
          Add Endpoint
        </Button>
      </form>
    </Paper>
  );
}

export default AddEndpoint;
