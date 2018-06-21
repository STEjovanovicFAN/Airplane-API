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
    var port = normalizePort(process.env.PORT || '**YOUR PORT HERE**');
    ```
    
2. Next you will to go into **/app.js** file   


## How to run the project

1. Navigate to your cloned repo 
    ```
    cd /<path to the repo>/
