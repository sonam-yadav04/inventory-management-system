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
COPY backend/login_service/ ./login_service/

ENV PYTHONPATH=/app:/app/login_service/src

EXPOSE 5000

CMD ["python", "/app/login_service/src/app.py"]
