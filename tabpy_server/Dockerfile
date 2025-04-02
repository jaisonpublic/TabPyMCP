FROM python:3.8-slim

WORKDIR /app

# Create necessary directories and files
RUN mkdir -p /tmp/query_objects /tmp/tabpy-state /app/static && \
    touch /app/pwd.txt

# Install TabPy and required packages
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install tabpy && \
    pip install -r requirements.txt

# Copy configuration and initialization files
COPY tabpy-server-config.conf .
COPY init_endpoints.py .

# Create startup script
RUN echo '#!/bin/bash\nsleep 5 && python init_endpoints.py &\ntabpy --config tabpy-server-config.conf --disable-auth-warning' > /start.sh && \
    chmod +x /start.sh

EXPOSE 9004

CMD ["/bin/bash", "/start.sh"]
