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
} from '@material-ui/core';
import axios from 'axios';

const INFOGRAPHIC_MCP_URL = 'http://localhost:8000';

function EndpointCall() {
  const [endpoints, setEndpoints] = useState({});
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [inputData, setInputData] = useState({
    data: '',
    labels: '',
    title: '',
  });
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchEndpoints();
  }, []);

  const fetchEndpoints = async () => {
    try {
      const response = await axios.get(`${INFOGRAPHIC_MCP_URL}/endpoints`);
      setEndpoints(response.data);
    } catch (error) {
      console.error('Error fetching endpoints:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        data: inputData.data.split(',').map(Number),
        labels: inputData.labels.split(','),
        title: inputData.title,
      };

      const response = await axios.post(
        `${INFOGRAPHIC_MCP_URL}/endpoints/${selectedEndpoint}`,
        data
      );
      setResult(response.data);
    } catch (error) {
      console.error('Error calling endpoint:', error);
    }
  };

  return (
    <Paper style={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Call Endpoint
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth style={{ marginBottom: '1rem' }}>
          <InputLabel>Select Endpoint</InputLabel>
          <Select
            value={selectedEndpoint}
            onChange={(e) => setSelectedEndpoint(e.target.value)}
          >
            {Object.keys(endpoints).map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Data (comma-separated)"
          value={inputData.data}
          onChange={(e) => setInputData({ ...inputData, data: e.target.value })}
          style={{ marginBottom: '1rem' }}
        />

        <TextField
          fullWidth
          label="Labels (comma-separated)"
          value={inputData.labels}
          onChange={(e) => setInputData({ ...inputData, labels: e.target.value })}
          style={{ marginBottom: '1rem' }}
        />

        <TextField
          fullWidth
          label="Title"
          value={inputData.title}
          onChange={(e) => setInputData({ ...inputData, title: e.target.value })}
          style={{ marginBottom: '1rem' }}
        />

        <Button type="submit" variant="contained" color="primary">
          Generate Chart
        </Button>
      </form>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <img src={`data:image/png;base64,${result}`} alt="Generated chart" />
        </div>
      )}
    </Paper>
  );
}

export default EndpointCall;
