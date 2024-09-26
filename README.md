# Rate-My-Rental
Community platform for renters to review their landlords/rental units by sharing their experiences for future renters.


###### Instructions to access website (frontend and backend)
1. First clone the repo with this command: `git clone https://github.com/CSC307Spring2023/Team6.git`
2. Execute this command in the terminal: `git pull`
3. Execute this command in the terminal (backend): `cd server` and in another terminal (frontend): `cd client`
4. In each folder: `npm install —force`
5. in the server folder, `npm start`
6. in the client folder, `npm start`

**Please be sure than server is run on port 3001 and client is run on port 3000**


**If you would like to access the database, install mongodb compass**

Install MongoDB Compass from here: `https://www.mongodb.com/try/download/compass`

7. Add `mongodb+srv://hdeif:ratemyrental@ratemyrental.ztzbmvq.mongodb.net/RateMyRentalDB?retryWrites=true&w=majority` as the connection URI. You will now be able to go through the database and see data being added.

Common Issues:

You may get an openssl issue due to being on a different version of npm. To solve this, paste this command before running npm start on the client:
`export NODE_OPTIONS=--openssl-legacy-provider`

If port 3001 is being used and was not properly terminated, please use this command to kill node: `sudo killall -9 node`

For a video walkthrough of running the application: https://drive.google.com/file/d/1ZT14Lyx5rlNqrz8lmabW7i2DnGNOr6hL/view?usp=sharing
