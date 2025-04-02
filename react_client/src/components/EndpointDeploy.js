import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';

const MCP_URL = 'http://localhost:8000';

function EndpointDeploy() {
  const [name, setName] = useState('');
  const [script, setScript] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDeploy = async () => {
    if (!name || !script) {
      setError('Name and script are required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await axios.post(`${MCP_URL}/mcp/deploy_endpoint`, {
        name,
        script,
        description: description || undefined,
      });

      setSuccess(true);
      setName('');
      setScript('');
      setDescription('');
    } catch (error) {
      console.error('Error deploying endpoint:', error);
      setError('Failed to deploy endpoint. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Deploy TabPy Endpoint
      </Typography>

      <TextField
        fullWidth
        label="Endpoint Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />

      <TextField
        fullWidth
        multiline
        rows={8}
        variant="outlined"
        label="Python Script"
        value={script}
        onChange={(e) => setScript(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />

      <TextField
        fullWidth
        label="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleDeploy}
        disabled={loading}
        style={{ marginBottom: '1rem' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Deploy Endpoint'}
      </Button>

      {error && (
        <Typography color="error" style={{ marginBottom: '1rem' }}>
          {error}
        </Typography>
      )}

      {success && (
        <Typography color="primary" style={{ marginBottom: '1rem' }}>
          Endpoint deployed successfully!
        </Typography>
      )}
    </Paper>
  );
}

export default EndpointDeploy;
