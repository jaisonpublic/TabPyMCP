import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, CircularProgress } from '@material-ui/core';
import axios from 'axios';

const MCP_URL = 'http://localhost:8000';

function EndpointList() {
  const [endpoints, setEndpoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEndpoints();
  }, []);

  const fetchEndpoints = async () => {
    try {
      const response = await axios.post(`${MCP_URL}/mcp/list_endpoints`);
      setEndpoints(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching endpoints:', error);
      setError('Failed to fetch endpoints. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Paper style={{ padding: '2rem', textAlign: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper style={{ padding: '2rem' }}>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        TabPy Endpoints
      </Typography>
      <List>
        {Object.entries(endpoints || {}).map(([name, info]) => (
          <ListItem key={name}>
            <ListItemText
              primary={name}
              secondary={
                <>
                  <Typography component="p">
                    Status: {info.status || 'Unknown'}
                  </Typography>
                  <Typography component="p">
                    Description: {info.description || 'No description available'}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default EndpointList;
