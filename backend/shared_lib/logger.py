import logging
import os
from datetime import datetime

def get_logger(service_name):
    # Create logs directory if it doesn't exist
    os.makedirs("logs", exist_ok=True)

    # Log file path with timestamp
    log_filename = f"logs/{service_name}_{datetime.now().strftime('%Y-%m-%d')}.log"

    # Create a logger
    logger = logging.getLogger(service_name)
    logger.setLevel(logging.DEBUG)

    # Avoid duplicate handlers
    if not logger.handlers:
        # File handler
        file_handler = logging.FileHandler(log_filename)
        file_handler.setLevel(logging.DEBUG)

        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)

        # Formatter
        formatter = logging.Formatter('%(asctime)s [%(levelname)s] %(name)s: %(message)s')
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)

        # Add handlers to logger
        logger.addHandler(file_handler)
        logger.addHandler(console_handler)

    return logger
