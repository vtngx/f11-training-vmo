# **NODEJS - RESTFUL API**
*20210907 | Day 2 Topics | Nguyen Hoang Viet*

## `nvm` - Node Version Manager
* Install `nvm`
  ```shell
  wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.38.0/install.sh | bash
  ```

* `nvm` usage
  ```js
  // full list of available versions
  nvm ls-remote

  // list installed node version
  nvm ls

  // show current node version
  nvm current

  // install specific version of node
  nvm install 14.17.6

  // install latest version of patch
  nvm install 14.17

  // install the latest LTS version
  nvm install --lts

  // uninstall version of node
  nvm uninstall 14.17.6

  // switch version of node
  nvm switch 14.17.6

  // use the latest LTS version
  nvm use --lts

  // run js file using node 14.17.0
  nvm run 14.17.0 app.js
  ```

## NodeJS Project

### 1. Create NodeJS Project
- `npm init`: initialize a NodeJS Project
- `package.json`:
  - document of info about the NodeJS Project (name, ver, dependencies,...)
    ```js
    {
      name,          // name of project
      version,       // version of project
      description,   // description of project
      author,        // author of project
      dependencies,  // information of packages used in project
      {
        "express": "~4.7.2", // name & version of package
        ...
      }
    }
    ```
  - Versions notation: 
    - `"*"`: auto install latest version
    - `"~1.1.1`: version from 1.1.0 to 1.1.9
    - `"!1.1.5"`: version from 1.1.5 to 1.1.9
    - `">1.1.1"`: version > 1.1.1
  - Run `npm install` would automatically install all packages listed in `package.json` file

### 2. Built-in Modules
```js
assert	        //  Provides a set of assertion tests
buffer	        //  To handle binary data
child_process   //  To run a child process
cluster	        //  To split a single Node process into multiple processes
crypto	        //  To handle OpenSSL cryptographic functions
dgram	          //  Provides implementation of UDP datagram sockets
dns	            //  To do DNS lookups and name resolution functions
events	        //  To handle events
fs	            //  To handle the file system
http	          //  To make Node.js act as an HTTP server
https	          //  To make Node.js act as an HTTPS server.
net	            //  To create servers and clients
os	            //  Provides information about the operation system
path	          //  To handle file paths
querystring	    //  To handle URL query strings
readline	      //  To handle readable streams one line at the time
stream	        //  To handle streaming data
string_decoder	//  To decode buffer objects into strings
timers	        //  To execute a function after a given number of milliseconds
tls	            //  To implement TLS and SSL protocols
tty	            //  Provides classes used by a text terminal
url	            //  To parse URL strings
util	          //  To access utility functions
v8	            //  To access information about V8 (the JavaScript engine)
vm	            //  To compile JavaScript code in a virtual machine
zlib	          //  To compress or decompress files
```

### 4. CORS (*Cross-Origin-Resources-Sharing*)
Allow resources sharing between different domains.

## Restful API
### 1. HTTP methods
  - `GET`: used to retrieve data from the server
  - `POST`: used to send data to server
  - `PUT/PATCH`: modifies resource 
    - `PUT`: overwrites the entiry is exists, creates a new resouce if it doesn't exist
    - `PATCH`: only applies a partial update the the resource
  - `DELETE`: removes target resource given by a URI
### 2. Restful Routes
  - `GET /users`: Get all users
  - `GET /users/:id`: Get 1 user
  - `POST /users`: Create user
  - `PUT /users/:id`: Update user
  - `DELETE /users/:id`: Delete user
- Status codes
  - Types:
    - `1xx`: Informational
    - `2xx`: Success
    - `3xx`: Redirection
    - `4xx`: Client Error
    - `5xx`: Server Error
  - Common codes:
    - `200`: OK
    - `201`: Created
    - `204`: No Content
    - `400`: Bad Request
    - `401`: Unauthorized
    - `403`: Forbidden
    - `405`: Method Not Allowed
    - `412`: Precondition Falied
    - `500`: Internal Server Error