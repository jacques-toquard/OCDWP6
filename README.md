# OCDWP6
## Backend
### Clone the backend repo into the backend folder:
```zsh
git clone git@github.com:jacques-toquard/OCDWP6.git backend
```
### Use PORT 4000 for the backend (the frontend expects it):
```zsh
export OCDWP6_PORT=4000
```
### Create a JWT SECRET_KEY for the backend:
```zsh
export OCDWP6_SECRET_KEY=$(openssl rand -base64 64)
```
### Create a MONGODB_URI for the backend:
```zsh
export MONGODB_URI='mongodb://admin:password@localhost:27017/ocdwp6?authSource=admin'
```
### Install dependencies:
```zsh
cd backend
nvm install 22
nvm use 22
npm install
```
### Run the backend:
```zsh
npm start
nvm run dev # for watch behavior with nodemon
```
## Frontend (will use PORT 3000 without docker)
### Clone the frontend repo into the frontend folder:
```zsh
git clone git@github.com:OpenClassrooms-Student-Center/P7-Dev-Web-livres.git frontend
```
### Install dependencies:
#### Docker way :
**Note**: the start command fails to compile when running somehow
```zsh
cd frontend
docker build -t ocdwp6-frontend .
docker run -p 3000:3000 ocdwp6-frontend
```
#### NPM way:
```zsh
cd frontend
nvm install 19
nvm use 19
npm install
npm start
```
## MongoDB
### Run a MongoDB container:
#### Create a named volume:
```zsh
docker volume create mongodb_data
```
#### Run the container:
```zsh
docker run -d \
  --name mongodb \
  --restart unless-stopped \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  -e MONGO_INITDB_DATABASE=goFullStack \
  mongo:latest
```
#### Connection string:
```txt
mongodb://admin:password@localhost:27017/ocdwp6?authSource=admin
```
