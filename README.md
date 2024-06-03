# csc301-assignment3

# About the App
This web app is intended to simplify the application process for the Formula Student Team "Technikum Mittweida Motorsprot" at the University of Applied Sciences Mittweida. For this purpose, a start page in the style of the newly created website is implemented, which redirects to an application form. From this page, the admin login data can be used to access the applications received.

# Use Web Application Locally
To use the web application locally, you need to start both client and server.
To start the client make sure that you are inside the client folder and type `npm run dev` inside your command line, which starts the application on localhost:[port].
To start the server make sure that you

# Implementation
- **React** has been the [most popular open-source JavaScript library](https://2022.stateofjs.com/en-US/libraries/front-end-frameworks/) that helps build the front end of web applications more easily and efficient. In addition to that it allows to [utilize components](https://medium.com/@reactmasters.in/advantages-and-disadvantages-of-react-js-e6c80b25763b) within the project, which creates a better overview during development. Because of this and because we dealt with React the most during the course CSC 301 at the University of the Sunshine Coast, this project is based on the React front-end library.
- **Vite** 
- **Bootstrap**
- **Node.js and Express.js**
- **PostgreSQL**


# Project Structure
The project is divided into two main folders, that represent the client and server. The client folder contains the react project, while the server folder contains the database and express server for database interaction. The most important files are described in the table below.

| Client/Server-Side | Folder     | File                   | Purpose                                                                                              |
|--------------------|------------|------------------------|------------------------------------------------------------------------------------------------------| 
| Client             | /          | index.html             | entry point of react project, references to main.jsx                                                 |
|                    | /          | main.jsx               | creates root and references App.jsx                                                                  |
|                    | /          | App.jsx                | contains link to components and renders them according to url using react router                     |
|                    | /          | .env                   | contains environmental variables of react project: server api and login credentials                  |
|                    | public/images |                     | contains logos                                                                                       |
|                    | src/helper |                        | contains files that provide additional general function/knowledge for project                        |
|                    | src/helper | BackgroundChanger.jsx  | changes colors depending on the url                                                                  |
|                    | src/helper | converter.js           | contains function to convert data to correct/needed format                                           |
|                    | src/helper | positions.js           | contains dictionary of possible team positions to choose from                                        |
|                    | src/pages  |                        | contains react components                                                                            |
|                    | src/pages  | ApplicationForm.jsx    | displays application form, handles input field validation, error messages and post request to server |
|                    | src/pages  | Footer.jsx             | contains web page footer with logo and web links                                                     |
|                    | src/pages  | IntranetApplication.jsx| displays received applications and handles delete of applications                                    |
|                    | src/pages  | IntranetNavbar.jsx     | contains an additional navbar for the internal web page view below the general navbar                |
|                    | src/pages  | IntranetOverview.jsx   | only acts as "Landing Page" of the internal web page view                                            |
|                    | src/pages  | LandingPage.jsx        | entry point of web page (= start page), contains button to get to application form                   |
|                    | src/pages  | LoginModal.jsx         | modal with form to log into web page internal view                                                   |
|                    | src/pages  | Navigation.jsx         | contains web page navigation bar                                                                     |
|                    | src/scss   |                        | contains stylesheets                                                                                 |
|                    | src/scss   | _footer.scss           | contains footer styles                                                                               |
|                    | src/scss   | _form.scss             | contains form styles (general form styles, application form styles, login form styles)               |
|                    | src/scss   | _intranet.scss         | contains styles for internal web page view                                                           |
|                    | src/scss   | _navigation.scss       | contains navigation bar styles                                                                       |
|                    | src/scss   | _start.scss            | contains specific styles for start page                                                              |
|                    | src/scss   | _variables.scss        | contains variables (colors, social media buttons, box-shadow, fonts, layout) for the web page        |
|                    | src/scss   | custom.scss            | main stylesheet, import other custom stylesheets                                                     |
| Server             | /          | .env                   | contains environmental variables for server/database: database credentials, server port              |
|                    | /          | converter.js           | contains functions to convert request data to correct/needed format to store into database           |
|                    | /          | db.js                  | PostgreSQL database with CRUD operations (create, read, delete)                                      |
|                    | /          | docker-compose.yaml    | builds two docker containers                                                                         |
|                    | /          | Dockerfile             | docker image for backend application                                                                 |
|                    | /          | server.js              | backend nodejs express server that interacts with react app and postgreSQL db, includes server side validation |
|                    | /          | test.rest              | includes test requests                                                                                         |

     