from fastmcp import FastMCP
from tabpy.tabpy_tools.client import Client
from typing import Dict, Any, Optional
import logging
import sys

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('infographic_mcp.log')
    ]
)
logger = logging.getLogger('InfoGraphicMCP')

# Initialize FastMCP
mcp = FastMCP(
    title="InfoGraphicMCP",
    description="A FastMCP server for TabPy interaction",
    version="1.0.0",
    port=8000
)

# Initialize TabPy client
tabpy = Client('http://tabpy:9004')

@mcp.tool()
def list_endpoints() -> Dict[str, Any]:
    """List all available TabPy endpoints"""
    logger.info("Listing all TabPy endpoints")
    result = tabpy.list_endpoints()
    logger.info(f"Found {len(result)} endpoints")
    return result

@mcp.tool()
def query_endpoint(name: str, data: Dict[str, Any]) -> Any:
    """Query a TabPy endpoint with data
    
    Args:
        name: Name of the endpoint to call
        data: Data to pass to the endpoint
    """
    logger.info(f"Querying endpoint '{name}' with data: {data}")
    result = tabpy.query(name, data)
    logger.info(f"Query result: {result}")
    return result

@mcp.tool()
def evaluate_script(script: str, data: Dict[str, Any]) -> Any:
    """Evaluate a Python script with data
    
    Args:
        script: Python script to evaluate
        data: Data to pass to the script
    """
    logger.info(f"Evaluating script with data: {data}")
    result = tabpy.evaluate(script, data)
    logger.info(f"Evaluation result: {result}")
    return result

@mcp.tool()
def deploy_endpoint(name: str, script: str, description: Optional[str] = None) -> Dict[str, Any]:
    """Deploy a new endpoint to TabPy
    
    Args:
        name: Name of the endpoint
        script: Python script to deploy
        description: Optional description of the endpoint
    """
    logger.info(f"Deploying endpoint '{name}'")
    result = tabpy.deploy(name, script, description)
    logger.info(f"Deployment result: {result}")
    return result

@mcp.tool()
def get_endpoint_info(name: str) -> Dict[str, Any]:
    """Get information about a specific endpoint
    
    Args:
        name: Name of the endpoint
    """
    logger.info(f"Getting info for endpoint '{name}'")
    result = tabpy.get_endpoint_description(name)
    logger.info(f"Endpoint info: {result}")
    return result

@mcp.tool()
def remove_endpoint(name: str) -> Dict[str, Any]:
    """Remove an endpoint from TabPy
    
    Args:
        name: Name of the endpoint to remove
    """
    logger.info(f"Removing endpoint '{name}'")
    result = tabpy.remove(name)
    logger.info(f"Removal result: {result}")
    return result


if __name__ == "__main__":
    mcp.run(transport="sse")


