# Swagger, NodeJS, and Postgresql

## What this project needs (for Ubuntu)

This guide will assume that you are running on Ubuntu. Below will be the steps to install everything you'll need  

Steps:
  1. Node installed
    ```
    sudo apt install node
    ```
  2. npm installed
    ```
    sudo apt install npm
    ```
  3. postgres installed
    ```
    sudo apt-get install postgresql-9.5 -y
    ```
    
## Configure this project

There are two ways to configure this project depending on how you want to run your node js server. The code above is already configured to my preference, you will need to change it to depending on your's. There are two ways to run it: either run it locally or on a dns/IP address. This guide will go over both of the steps.

### Locally 
1. You can set your port to whatever you wish in the **/bin/www** file on this line
    
    ```
    var port = normalizePort(process.env.PORT || '3000'); //<--- change this "3000" port if you want 
    ```
    
2. Next you will to go into **/app.js** file and change the port on the host to be the same as in the /bin/www file 

    ```
    var swaggerDefinition = {
      info: {
        title: 'Node Swagger API',
        version: '1.0.1',
        description: 'Demonstrating how to desribe a RESTful API with Swagger',
      },
      host: 'localhost:3000', //<--- Make sure the "3000" port here is the same as in /bin/www
      basePath: '/',
    };
    ```

3. In the **/public/api-docs/index.html** file you will need to change this line to:
    ```
    <script type="text/javascript">
      $(function () {
        var url = window.location.search.match(/url=([^&]+)/);
        if (url && url.length > 1) {
          url = decodeURIComponent(url[1]);
        } else {
          url = "http://localhost:3000/swagger.json"; // <--- this line should be like so 
        }
    ```

4. Finally you will need to change the Connectionstring in **queries.js**
    
    ```
    var connectionString = 'postgres://localhost:5432/airplanes'; //<--- do not change this port!! this is the default port your database is running on
    ```
    
### DNS/IP Address
1. You can set your port to whatever you wish in the **/bin/www** file on this line
    
    ```
    var port = normalizePort(process.env.PORT || '8080'); //<--- change this "8080" port if you want 
    ```

2. Next you will to go into **/app.js** file and change the host and port (just make the port consistant)

    ```
    var swaggerDefinition = {
      info: {
        title: 'Node Swagger API',
        version: '1.0.1',
        description: 'Demonstrating how to desribe a RESTful API with Swagger',
      },
      host: '<YOUR DNS URL OR IP GOES HERE>:8080', // <--- your dns url or IP address goes here and make sure the port is consistant
      basePath: '/',
    };
    ```
    
3. In the **/public/api-docs/index.html** file you will need to change this line to:
    ```
    <script type="text/javascript">
      $(function () {
        var url = window.location.search.match(/url=([^&]+)/);
        if (url && url.length > 1) {
          url = decodeURIComponent(url[1]);
        } else {
          url = "/swagger.json"; // <--- this line should be like so 
        }
    ```    
    
4. Finally you will need to change the Connectionstring in **queries.js** (Note: Postgresql will be running locally so do not change it to your dns url or IP addr)

    ```
    var connectionString = 'postgresql://postgres:SJ@localhost:5432/airplanes';
    ```
    connectionString convention is 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb' if you were wondering

## How to run the project

1. Navigate to your cloned repo 
    
    ```
    cd /<path to the repo>/Airplane-API
    ```

2. Install all the npm dependencies

    ```
    npm install
    ```

3. Since you installed postgres you should have admin access to the default user "postgres"

   Do: ``` sudo -su postgres ``` to log into as this user
   
4. Once back to this repo run the sql script to create a database

    ```
    psql -f airplanes.sql
    ```
    
5. Last step is to run the node server as the postgres user 
   ```npm start ```
   
   Next navigate to your webpage.
   
   For people who configured it to be local it should be:
     - ``` localhost:3000/swagger.json ``` to view the swagger json file and
     - ``` localhost:3000/api-docs ``` to view the documentation for the api calls
     
   For people who configured with IP or dns url it should be:
     - ``` < URL OR IP CONFIGURATION >:8080/swagger.json ``` to view the swagger json file and
     - ``` < URL OR IP CONFIGURATION >:8080/api-docs ``` to view the documentation for the api calls
     
## Walkthrough of the code

Since you now have this project up and running, this section is dedicated to providing documentation of how the code works. 

The file ```/bin/www``` is the node server. This is a simple server, however it does not handle any of the swagger-ui api. Swagger-ui is handled in the ```app.js``` file. Inside the file ```/bin/www``` you can see that it has a reference to ```app.js```. 

The file ```/routes/index``` is how we actually create the swagger json file used to create the api documentation and this file also provides the calls to functions that handle the api calls. 

To give more of an example we will do a simple trace over the code starting in the ```/routes/index```. 
Inside this file you will see more commented out code then actual code. This is not the case. Even though it appears to be documented out code it's actually how we create the swagger-ui json file.

```
/**
 * @swagger
 * definitions:
 *   Airplane:
 *     properties:
 *       name:
 *         type: string
 *       model:
 *         type: string
 *       serial_number:
 *         type: integer
 */
```

This piece of code defines the "Airplane" object. This object has 3 properties: 
- ```name``` which is of type string 
- ```model``` which is also of type string 
- ```serial_number``` which is of type int 

We will reference this type of object as to avoid extra steps.

Right below this code is:

```
/**
 * @swagger
 * /api/airplanes:
 *   get:
 *     tags:
 *       - Airplane
 *     description: Returns all airplanes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of all airplanes
 *         schema:
 *           $ref: '#/definitions/Airplane'
 */
router.get('/api/airplanes', db.getAllAirplanes);

```
Lets break this down in two pieces:

```
/**
 * @swagger
 * /api/airplanes:
 *   get:
 *     tags:
 *       - Airplane
 *     description: Returns all airplanes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of all airplanes
 *         schema:
 *           $ref: '#/definitions/Airplane'
 */
```

What this code above does is it creates the visual swagger-ui get api path of ```/api/airplanes``` and documents what repsonses you will retrieve such as a 200 reponse of the json format object "Airplane".

```
router.get('/api/airplanes', db.getAllAirplanes);
```

This code is what gets executed when you do ```localhost:3000/api/airplanes``` in the url. OR when you just click the ```"Try it out!"``` button. All this does is it routes your call to the file ```queries.js``` to handle this call. In this case ```db.getAllAirplanes``` will route you to ```queries.js``` file and into the function ```getALLAirplanes```.

So now moving on to the ```queries.js``` file. If you look near the top of the file you will be able to see this snippet of code:

```
function getAllAirplanes(req, res, next) {
  db.any('select * from aplanes')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL airplanes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
```

Lets break this down. 

```
function getAllAirplanes(req, res, next) {
```

This function takes in 3 parameters. The first one is ```req```. This is the required information that the client needs to include in this api call. Since this is just a general "get all the airplanes" type of api we don't require anything from the client. If you want to see a Use for this call look in the ```removeAirplane``` and ```updateAirplane``` to see this parameter being used.

The second parameter is ```res``` and this is the response type variable. Pretty self explanitory, we just take in the api call and we modify the status and send it back to the client.

The third parameter ```next``` we just use for error handling.


Next up is:

```
 db.any('select * from aplanes')
```
And all this is doing is its going into our database and into the table ```aplanes``` grabbing everything inside the table. We then take that data and send it back in a json with the response of 200 back to the user in this snippet of code:

```
.then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL airplanes'
        });
```

You might be wondering what:

```
    .catch(function (err) {
      return next(err);
    });
```

this part of the function is used for. All this is doing is its sending an error back to the user.

Congratulations you should now be very familiar with the ```/air/airplanes``` api call from frontend to backend. I'll now leave the trace of the other api calls up to you as an exercise if you so choose to do.



    
    
   
   
