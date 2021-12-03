# Live chat server side 

## CRUD

You can use api with postman or other.  
First log a user account or create a new user

Login -> POST http://localhost:3050/api/user-signin  
Create user -> POST http://localhost:3050/api/users

## CRUD USER

POST -> POST http://localhost:3050/api/user-signin  
POST -> POST http://localhost:3050/api/users

### you should log with ADMIN Token in bearer

PUT -> PUT http://localhost:3050/api/update-users  
DEL -> DELETE http://localhost:3050/api/delete-users

## CRUD ROOM

GET -> GET http://localhost:3050/api/rooms  
GET -> GET http://localhost:3050/api/room/:id

### you should log with ADMIN Token in bearer

POST -> POST http://localhost:3050/api/room  
PUT -> PUT http://localhost:3050/api/update-room  
DEL -> DELETE http://localhost:3050/api/delete-room

## CRUD MESSAGE

POST -> POST http://localhost:3050/api/message  
GET -> GET http://localhost:3050/api/message/:id

### you should log with ADMIN Token in bearer

PUT -> PUT http://localhost:3050/api/update-message  
DEL -> DELETE http://localhost:3050/api/delete-message

## Available Scripts

In the project directory, you can run:

### `cd /server && npm install`

Go to the server folder and install all dependencies required for run the project.

### `cd /server && npm start`

Go to the client folder.  
Run the app in the development mode.\  
Server launch in [http://localhost:3050].

### Add .env in root folder

```
URL_MONGO = mongodb://uognqwg552gzp5xunw78:CV0dS3PAtfTlmK5gB5Jl@bpaquvovn7cnuer-mongodb.services.clever-cloud.com:27017/bpaquvovn7cnuer
PORT = 3050
TOKEN_SECRET = 07ab1b42fbec24d09d02a15e716fbe001252b184ffecc74edf56ab2ffa8a4555a4a39cb33267cc5a3762892768ddc083ea4618f55345455ef0450efcacd27138
URL = /api/
```
