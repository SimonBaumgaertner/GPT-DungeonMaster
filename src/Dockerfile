FROM python:3.9

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update && apt-get install -y nodejs

# Install dependencies
WORKDIR /hexhelper-app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
WORKDIR /hexhelper-app/frontend
RUN npm install

# Set up CMD
WORKDIR /hexhelper-app/frontend
EXPOSE 8080
CMD ["bash", "-c", "npm run start & cd ../backend && python hex_test_main.py"]

#  docker build -t python-hexhelper .
#  docker run -p 8080:8080 -p 8000:8000  python-hexhelper
