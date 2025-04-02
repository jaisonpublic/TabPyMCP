# InfoGraphicMCP Project

A comprehensive data visualization system with multiple components:

## Components

1. **InfoGraphicMCP Server**: FASTMCP server with SSE support for managing TabPy endpoints
2. **TabPy Server**: Docker-based TabPy server for data visualization endpoints
3. **Streamlit Client**: Interactive web client for endpoint management and visualization
4. **React Client**: Modern web interface for endpoint management and visualization

## Project Structure

```
TabPyMCP/
├── docker-compose.yml
├── infographic_mcp/          # InfoGraphicMCP Server
├── tabpy_server/            # TabPy Server configuration
├── streamlit_client/        # Streamlit Client
├── react_client/           # React Client
└── tests/                  # Test cases
```

## Requirements

- Docker Desktop
- Python 3.8+
- Node.js 14+

## Quick Start

1. Clone the repository
2. Run `docker-compose up`
3. Access the services:
   - InfoGraphicMCP Server: http://localhost:8000
   - TabPy Server: http://localhost:9004
   - Streamlit Client: http://localhost:8501
   - React Client: http://localhost:3000

## Development

See individual component README files for development instructions.
