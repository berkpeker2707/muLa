### muLa Project

###

### muLa Backend

###

### Start

User "nodemon server.js" to start the code.
Make sure you change db & api keys.

### Features

0. Config & Libraries
1. Register User (to MongoDB Atlas) & Account Activation (sending mail with mailgun Api)
2. Forgot Password and Reset Password (sending mail with mailgun Api)
3. Login User
4. Like, Unlike User & Match

---

0. To .gitignore we add /node_modules which are downloaded libraries & /config which is the directory we store our db connection configurations and keys.
   Under .env, we store our client url.
1. User registration is done with POST request under server.js file.
   Under /register POST request, we first check data conditions. We take data from body of our frontend, postman for testing, then check if user already registered. If user is new, we give token which has 20 minute expire time. By using mailgun api, we our token as an email link.
   Under /users POST request, we get our linked token from body, then verify and decode the token. We again, check if user exists or not, else we create a new user according to model and encrypt password.
2. Under /forgot-password PUT request, we get email from body, then check if user exists according to the email which is a unique field. Then we create new token according to reset password key, which has 20 minute expire time. We send our token as link with an email.
   Under /reset-Password PUT request, once User clicks the email, user has to enter new password, which later will be encrypted again. Then we reset the resetLink with an empty string for future resets.
3. First we check whether email and password are good for required conditions and validate. Then we pull entered fields from body. We check if user with entered email exists and match the password with database. If all satisfied, we return payload, and give user 1 year long token.
   Later we use auth for authenticated requests, which checks token and returns requests according to token.
4. Under like we first get logged user and targeted user according to their id. Then check if the user is already liked. If not save targeted user's id to logged user's liked field, and save logged user's id to targeted user's likedBy. Store id's in an array. If user has both fields equal, we store id to matched field.
