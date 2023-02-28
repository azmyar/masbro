# Masbro.
A React based social networking app to connect its users and allow them to share their thoughts with their bro(s) and best bro(s).
# Installation
## Prerequisites
1. [Node and npm](https://nodejs.org/en/download/) are installed. Here are the versions I'll be using:

    ```shell
    $ node --version
    v18.14.0

    $ npm --version
    8.1.2
    ```
2. Internet connection.
## Procedure

### 1. Download this repository as zip then extract it to your local
    You should have a folder called `ristek-masbro-main` stored in your local.

### 2. Install required dependencies
#### 1. `Frontend` side
        Open terminal in `ristek-masbro-main`, then execute this code

        ```shell
        $ cd client
        $ npm i axios react-scripts react-router-dom
        ```
#### 2. `Backend` side
        Open terminal in `ristek-masbro-main`, then execute this code

        ```shell
        $ cd server
        $ npm i bcrypt body-parser cors dotenv express joi joi-password-complexity jsonwebtoken mongoose nodemon
        ```
### 3. Initialization
#### 1. `Frontend` side
        Open terminal in `ristek-masbro-main`, then execute this code

        ```shell
        $ cd client
        $ npm start
        ```
#### 2. `Backend` side
        Open terminal in `ristek-masbro-main`, then execute this code

        ```shell
        $ cd server
        $ npm start
        ```
# Architecture
```markdown
Stacks

- MongoDB (as Database)
- ExpressJS (Backend)
- ReactJS (Frontend)
- NodeJS (Backend)
```