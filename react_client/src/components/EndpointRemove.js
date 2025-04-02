import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';

const MCP_URL = 'http://localhost:8000';

function EndpointRemove() {
  const [endpoints, setEndpoints] = useState([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchEndpoints();
  }, []);

  const fetchEndpoints = async () => {
    try {
      const response = await axios.post(`${MCP_URL}/mcp/list_endpoints`);
      setEndpoints(Object.keys(response.data));
      setError(null);
    } catch (error) {
      console.error('Error fetching endpoints:', error);
      setError('Failed to fetch endpoints. Please try again later.');
    }
  };

  const handleRemove = async () => {
    if (!selectedEndpoint) {
      setError('Please select an endpoint');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await axios.post(`${MCP_URL}/mcp/remove_endpoint`, {
        name: selectedEndpoint,
      });

      setSuccess(true);
      setSelectedEndpoint('');
      fetchEndpoints(); // Refresh the list
    } catch (error) {
      console.error('Error removing endpoint:', error);
      setError('Failed to remove endpoint. Please try again later.');
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  return (
    <Paper style={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Remove TabPy Endpoint
      </Typography>

      <FormControl fullWidth style={{ marginBottom: '1rem' }}>
        <InputLabel>Select Endpoint to Remove</InputLabel>
        <Select
          value={selectedEndpoint}
          onChange={(e) => setSelectedEndpoint(e.target.value)}
        >
          {endpoints.map((endpoint) => (
            <MenuItem key={endpoint} value={endpoint}>
              {endpoint}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => setConfirmOpen(true)}
        disabled={!selectedEndpoint || loading}
        style={{ marginBottom: '1rem' }}
      >
        Remove Endpoint
      </Button>

      {error && (
        <Typography color="error" style={{ marginBottom: '1rem' }}>
          {error}
        </Typography>
      )}

      {success && (
        <Typography color="primary" style={{ marginBottom: '1rem' }}>
          Endpoint removed successfully!
        </Typography>
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove the endpoint "{selectedEndpoint}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleRemove}
            color="secondary"
            disabled={loading}
            variant="contained"
          >
            {loading ? <CircularProgress size={24} /> : 'Remove'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default EndpointRemove;
