FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/shared_lib/ ./shared_lib/
COPY backend/product_management_service/ ./product_management_service/

ENV PYTHONPATH=/app:/app/product_management_service/src

EXPOSE 5002

CMD ["python", "/app/product_management_service/src/app.py"]
