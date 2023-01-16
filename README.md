# Anvw

a kind of google drive but self hosted.

# How it works ?

the program takes all the files in a local path and makes them sort of accessible through http requests.


## requeriments
* mysql / mariadb
* nodejs

# how to use it ?
welp the project is more of a learning project and is not made by any means to user usage, but if still want to give it a shot then follow these steps:

- install all dependences 
- create a .env file in the root path of the project with the follow:

  * db_path // the path which stores all your files
  * project_path // the root directory of the repo 
  * database //database name in mysql or mariadb
  * project_port //the port that the router will listen at
  * db_usser // mysql/mariadb user
  * db_pass // mysql/mariadb password of the usser
  * db_host // the db adress, usually "localhost"
- run ```npm run tsc``` and then finally ```node /path_to_repo/dist/index.js```

you should be able to get in http://localhost:project_port/

# Main goals or prupose of this project

learn the basics of express and mysql and have fun :D
