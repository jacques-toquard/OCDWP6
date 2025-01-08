## Backend
### Clone the backend repo into the backend folder:
```zsh
git clone git@github.com:jacques-toquard/OCDWP6.git backend
```
### Install dependencies:
```zsh
cd backend
(nvm install 22)
nvm use 22
npm install
```
### Run the backend:
```zsh
npm start
(nvm run dev) // for watch behavior with nodemon
```
### Use PORT 8000 for the backend:
```zsh
export OCDWP6_PORT=8000
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
(nvm install 19)
nvm use 19
npm install
npm start
```
