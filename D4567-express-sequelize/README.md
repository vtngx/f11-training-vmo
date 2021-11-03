# **VMO Training**: *RestAPI*
VMO Training Exercise for RestAPI using NodeJS, MySQL and Sequelize.

## Folders Structure
```
.
├── /src
|   ├── /_collections       # stores postman-collection files
|   ├── /_scripts           # stores scripts
|   ├── /configs            # stores configurations
|   ├── /controllers        # stores controllers
|   ├── /middlewares        # stores middlewares
|   ├── /models             # stores database models
|   ├── /routes             # stores routers
|   ├── /services           # stores services
|   ├── /utils              # stores utilities/helpers
|   └── index.js            # server file
├── .env.local              # template for .env file
├── package.json            # package file
└── README.md               # README file
```


## Setup
### Download from github
```shell
git clone git@github.com:quanghvvmo/f11-n12-learning.git
cd f11-n12-learning.git
git checkout vietnh
npm install
```

### Configuration
Copy the content of the file `.env.local` to your `.env` file, then add your own configurations.
```js
PORT=
USERNAME=
PASSWORD=
DB=
JWT_SECRET=
JWT_EXP=
JWT_COOKIE_EXP=
```

### Operations
```shell
npm start     # start sserver
npm run dev   # start server with nodemon
npm run test  # run tests
```

### Postman
Import the postman-collection file in `src/_collections` to your Postman.