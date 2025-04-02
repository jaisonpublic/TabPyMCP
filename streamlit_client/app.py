import streamlit as st
import requests
import json
import logging

#MCP_URL = "http://infographic_mcp:8000"
MCP_URL = "http://localhost:8000"

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger('StreamlitClient')

def call_mcp_tool(tool_name: str, data: dict = None) -> dict:
    try:
        data = data or {}
        logger.info(f"Calling MCP tool '{tool_name}' with data: {data}")
        response = requests.post(f"{MCP_URL}/mcp/{tool_name}", json=data)
        if response.ok:
            result = response.json()
            logger.info(f"MCP tool '{tool_name}' response: {result}")
            return result
        else:
            error_msg = f"Error calling {tool_name}: {response.text}"
            logger.error(error_msg)
            st.error(error_msg)
            return None
    except Exception as e:
        error_msg = f"Error: {str(e)}"
        logger.error(error_msg)
        st.error(error_msg)
        return None

st.title("InfoGraphicMCP - TabPy Manager")

# Sidebar for navigation
page = st.sidebar.selectbox(
    "Select Page", 
    ["List Endpoints", "Query Endpoint", "Deploy Endpoint", "Remove Endpoint", "Evaluate Script"]
)

if page == "List Endpoints":
    st.header("Available TabPy Endpoints")
    endpoints = call_mcp_tool("list_endpoints")
    if endpoints:
        st.json(endpoints)

elif page == "Query Endpoint":
    st.header("Query TabPy Endpoint")
    endpoints = call_mcp_tool("list_endpoints")
    
    if endpoints:
        endpoint_names = list(endpoints.keys())
        selected_endpoint = st.selectbox("Select Endpoint", endpoint_names)
        
        if selected_endpoint:
            # Get endpoint info
            info = call_mcp_tool("get_endpoint_info", {"name": selected_endpoint})
            if info:
                st.subheader("Endpoint Info")
                st.json(info)
                
                st.subheader("Query Endpoint")
                data = st.text_area("Enter data as JSON", "{}")
                
                if st.button("Execute Query"):
                    try:
                        data_dict = json.loads(data)
                        result = call_mcp_tool("query_endpoint", {
                            "name": selected_endpoint,
                            "data": data_dict
                        })
                        if result:
                            st.subheader("Result")
                            st.json(result)
                    except json.JSONDecodeError:
                        st.error("Invalid JSON data")

elif page == "Deploy Endpoint":
    st.header("Deploy New TabPy Endpoint")
    name = st.text_input("Endpoint Name")
    script = st.text_area("Python Script")
    description = st.text_input("Description (optional)")
    
    if st.button("Deploy Endpoint"):
        result = call_mcp_tool("deploy_endpoint", {
            "name": name,
            "script": script,
            "description": description
        })
        if result:
            st.success("Endpoint deployed successfully!")

elif page == "Remove Endpoint":
    st.header("Remove TabPy Endpoint")
    endpoints = call_mcp_tool("list_endpoints")
    
    if endpoints:
        endpoint_names = list(endpoints.keys())
        selected_endpoint = st.selectbox("Select Endpoint to Remove", endpoint_names)
        
        if st.button("Remove Endpoint"):
            result = call_mcp_tool("remove_endpoint", {"name": selected_endpoint})
            if result:
                st.success(f"Endpoint {selected_endpoint} removed successfully!")

elif page == "Evaluate Script":
    st.header("Evaluate Python Script")
    
    script = st.text_area(
        "Python Script",
        """# Example: Calculate mean of numbers
def process(data):
    numbers = data['numbers']
    return {'mean': sum(numbers) / len(numbers)}""",
        height=200
    )
    
    data = st.text_area(
        "Data (JSON format)",
        """{"numbers": [1, 2, 3, 4, 5]}""",
        height=100
    )
    
    if st.button("Evaluate"):
        try:
            data_dict = json.loads(data)
            result = call_mcp_tool("evaluate_script", {
                "script": script,
                "data": data_dict
            })
            if result:
                st.subheader("Result:")
                st.json(result)
        except json.JSONDecodeError:
            st.error("Invalid JSON data format")
