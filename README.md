# github-graphql-react-apollo-redux-expressjs

### It's a mini platform that allow users to login using github account. After a successful login, the user can list his repositories. Once the user choose the repository he can explore its contents, start/unstar it and watch/unwatch it.

## 1. technologies
#### Backend side (we need it for login to send the token to client): nodejs, expressjs 
#### Client: react, apollo, redux, react-router, 

## 2. how to run
#### 2.1 Go to back then run 'npm install', then 'npm start'
#### 2.2 Go to client and run 'npm install', then 'npm run dev'
#### 2.3 navigate tp http://127.0.0.1:8080

## 3. Code Structure:
![alt text](screenshots/code_structure.png)

#### The express code is contained in 'back', 
#### react code contained in client:

## 4. Results:
### 4.1 Login page:

![alt text](screenshots/login.png)
#### After a successful authentication the user redirected to home.

### 4.1 Home page:

![alt text](screenshots/home.png)

#### it contains user info+img. the user choose the repository to explore.

### 4.1 Repository page:

![alt text](screenshots/repo.png)

#### user can explore the repository contents, start/unstar it and watch/unwatch it.

