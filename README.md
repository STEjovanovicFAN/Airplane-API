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

There are two ways to configure this project depending on how you want to run your node js server. The code above is already configured to my preference, you will need to change it to depend on your's. There are two ways to run it: either run it locally or on a dns address. This guide will go over both of the steps.

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

   Do: ``` sudo -i -u postgres ``` to log into as this user and navigate back to /< path to this repo >/Airplanes-API
   
4. Once back to this repo run the sql script to create a database

    ```
    psql -f airplanes.sql
    ```
    
5. Last step is to run the node server
   ```npm start ```
   
   Next navigate to your webpage.
   
   For people who configured it to be local it should be:
     - ``` localhost:3000/swagger.json ``` to view the swagger json file and
     - ``` localhost:3000/api-docs ``` to view the documentation for the api calls
     
   For people who configured with IP or dns url it should be:
     - ``` < URL OR IP CONFIGURATION >:8080/swagger.json ``` to view the swagger json file and
     - ``` < URL OR IP CONFIGURATION >:8080/api-docs ``` to view the documentation for the api calls
     
     
   
    
    
   
   
