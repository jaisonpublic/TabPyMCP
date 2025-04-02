import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';

const MCP_URL = 'http://localhost:8000';

function EndpointQuery() {
  const [endpoints, setEndpoints] = useState([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [data, setData] = useState('{}');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleQuery = async () => {
    if (!selectedEndpoint) {
      setError('Please select an endpoint');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const parsedData = JSON.parse(data);
      const response = await axios.post(`${MCP_URL}/mcp/query_endpoint`, {
        name: selectedEndpoint,
        data: parsedData,
      });

      setResult(response.data);
    } catch (error) {
      if (error instanceof SyntaxError) {
        setError('Invalid JSON data format');
      } else {
        console.error('Error querying endpoint:', error);
        setError('Failed to query endpoint. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Query TabPy Endpoint
      </Typography>

      <FormControl fullWidth style={{ marginBottom: '1rem' }}>
        <InputLabel>Select Endpoint</InputLabel>
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

      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="Data (JSON format)"
        value={data}
        onChange={(e) => setData(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleQuery}
        disabled={loading}
        style={{ marginBottom: '1rem' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Query Endpoint'}
      </Button>

      {error && (
        <Typography color="error" style={{ marginBottom: '1rem' }}>
          {error}
        </Typography>
      )}

      {result && (
        <div>
          <Typography variant="h6" gutterBottom>
            Result:
          </Typography>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </Paper>
  );
}

export default EndpointQuery;
