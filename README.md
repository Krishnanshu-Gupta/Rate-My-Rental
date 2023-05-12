###### For Server (Backend)
1. Open backend in one termind (cd server)
2. Create a new file called .env
3. Paste this in the .env file with the MondoDB connection string URI:
     REACT_APP_MONGO_URI="MondoDB connection string URI goes here"
4. npm install
5. npm start

###### For Client (Frontend)
1. npm start


###### 1.  Create two Folders

    Server (This contains all the back-end part)
  
    Client (This contains all the front-end part)
  
###### 2.  Getting MongoDB Connection

    Open Connect and click on - Connect your Application
    
  ![image](https://user-images.githubusercontent.com/76637730/174515425-a6b7db82-5cd3-4cc3-9b27-ecad8e395983.png)
  
    Copy and Add your connection string into your application code
    
  ![image](https://user-images.githubusercontent.com/76637730/174516230-232c6be6-d00b-4067-b15e-1f9cf9c57784.png)

  
###### 3.  SERVER

    1. npm init -y
        this creates package.json file
        
    2. npm install express mongoose cors nodemon
        this installs these packages
        
    3. Create index.js file, this will contain all connection information
    
    4. Create user.js in models folder this will create or fetch user
    
    5. User thunderclient a visual studio extension for verifying connection right from visual studio
  
###### 4.  CLIENT

    1. npx create-react-app .
        Just like regular react project use this to create default react files
  
### Screenshots

![image](https://user-images.githubusercontent.com/76637730/174518969-fca0e177-0261-430a-bb22-590b41b5c4e2.png)
