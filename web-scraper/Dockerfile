# Use the official Selenium Chrome image as the base
FROM selenium/standalone-chrome:latest

# Set the working directory in the container
WORKDIR /usr/app/

# Switch to root user to install additional dependencies
USER root

# Set Selenium Manager to offline mode
ENV SELENIUM_MANAGER_OFFLINE=true

# Install cron and pip if not already installed
RUN apt-get update && \
    apt-get install -y cron python3-pip && \
    rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required Python packages
RUN pip3 install -r requirements.txt

# Copy the necessary files into the container
COPY indeed_job_listings.json .
COPY indeed_scrape.py .
COPY upload_files.py .
COPY scraper_config.txt .
COPY run_scraper.sh .
COPY scraper_cron /etc/cron.d/scraper_cron
COPY test_upload.py .
COPY test_indeed.py .
COPY test_data.json .
COPY test_scraper.py .

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/scraper_cron

# Apply cron job
RUN crontab /etc/cron.d/scraper_cron

# Create a log file to store the output from the cron job
RUN touch /var/log/cron.log

# Set the entrypoint to your Python script
ENTRYPOINT bash run_scraper.sh && cron -f && tail -f /var/log/cron.log

