# Talent

![Talent Logo](docs/talentlogo2.png)

## Description

__Purpose__

Talent is a event management platform designed for the easy collation and synthesis of show, venue, producer, ticket and performing artist information. It aims to bring all these sources of information together into an intuitive and easy to navigate interface. The goal of Talent is to simplify and standardize the sharing and flow of information between all producers and performing artists, ensuring the most relevant data is displayed in easy to navigate ways.

__Features__

-  Producers can sign up to the platform.


-  New producers can create a "company" database entry for a particular event/organisation/period of time.
-  Producers can create and add, or add existing producers to a company.
-  Producers can create and add, or add existing artists to a company.
-  If a producer or artist profile is newly created, a login is generated for the new profile.
-  Producers can create/edit venue profiles.
-  Producers can create/edit shows using existing artists and venues belonging to the company.
-  Created shows will be displayed in a calendar format on the company landing page.
-  Producers can look at lists of Artists, Venues and Shows.
-  Shows are listed by their upcoming date and separated into past and future.
-  All Artists, Venues, Shows and Producers have their own information display page. 
-  Venues will have an a map displaying their location if one is assigned.

- Artists can log into the portal using a created login.
- Artists can access companies they have shows with.
- Artists can see what shows they have upcoming and past shows.
- Artists can look at ticket sales for upcoming and past shows.
- Artists can access producer information for the company.

__STRETCH FEATURES__

- The application will SMS artists an hour before their show begins.
- Producers can send emails from the application using mailto and mailgun
- Producers can enter their Red61 login details which will give them the ability to;
  - Populate the database with venues and shows
  - Create a door list for a particular show



__Target Audience__

Talent is designed to be used by event producers/organisers to better share data between themselves and artists. While artists are integral to the platform in its current iteration, and they certainly have access to information also in the expanded version of the platform, the platform itself was designed with the producers in mind first and foremost. It was also developed in conjunction with two producers running Adelaide Fringe shows for 2021.

__Tech Stack__

- Node.js: Node was used as the server side, out of browser JS environment.


- Express: Express was used as the server framework, which React used as a backend API
- Mongoose: Used to interface with MongoDB within express.
- React: React was used as the front end application, sending queries to the express server in order to render dynamically and populate data.
- MongoDB: MongoDB was used as the database that communicated with  Mongoose, and therefore express. There was no overt advantage in using a non-relational over a relational database in this application other than potential speed improvements.
- Bootstrap: Bootstrap was used to style the React front end components

----------------------------

__User Stories__

We went through three iterations of user stories, trying to work out how to best represent use cases for the application. In conjunction to this, we were also trying to better wrap our minds around the concept of user stories to fully understand their usefulness in implementing the application.

In this first iteration below, you can see that we leant heavily towards the technical aspects of the actual application. After some research and deliberation, we decided that this approach was missing the mark in terms of what was being asked of us, and what we were looking for.

We embraced a persona approach but misunderstood the persona to mean a "class" of user, in this case the Artist and the Producer

__First Iteration__

As a persona I want to (action) so that I can (result).

As a producer I want to be able to create and sign in with my own unique profile so I have my own unique identity on the platform.

As a producer I want to be able to create companies that represent separate events or production companies I work for/with.

As a producer I want to see multiple visual representations of upcoming and past shows so I can better manage those shows.

As a producer I want easy and intuitive access to artists and venue profiles so that I can quickly find needed information.

???As a producer I want to be able to view all my shows and access the data relevant to those shows in a list view.???

As a producer I want to be able to message all or some Artists performing in a particular company about a universally relevant update to ease logistics around communication.

----------------------------

Fairly quickly we decided this was not going to work for us. The next step was to look into abstraction of the user stories. Instead of thinking of the tiny unit based technical requirements, we tried to zoom out to user "epics", from which we could then zoom into the specifics while still having an underpinning core idea behind each story.

While this approach is quite nuanced and allows you to look at almost every aspect of your application, we were still getting bogged down in the person idea and the actual writing of stories. We started making a list of producer wants, without whys, then began an artist list and scrapped the idea.

__Second Iteration__

EPICS

As a producer I want to easily view all information relevant to shows I’m running so I can more easily organise those shows.

Calendar
As a producer I want to be able to be able to 

Information about all shows, artists and venues
Mobile/tablet/desktop responsiveness
Ability to create/invite new/existing producers
Ability to create/add new/existing artists
Intuitive, easy to use applications
Displays all relevant & important data (or links to) depending on context (which list am in? What page am i on?)
Ability to communicate with artists, all or some, email and SMS
Quick, painless, mass data entry
Review ticket sale data

As an artist I want

An easy to use application
See all upcoming and 

----------------------------

On our third and final iteration of user stories, we fully embraced the user persona idea. This meant creating two personas each, for both the producer an artist that illustrated 4 different approaches to the application. This allowed use to look at the same functionality through different lenses. We used general terminology and tried to empathise with each persona, ensuring we attached not just a what but also a why to each aspect.

__Third Iteration__

__Producer__

App dependant (Name: Cali)
Uses the application for almost all of their production administration. Consistently interacts with the platform, tweaking information to best help them stay on top of their workload. Wants to access the application quickly and easily from a range of devices and easily get a broad overview of information. Wants the ability to drill down into specific data points and communicate via the application


Non app dependant (Name: Tim)
Uses their own organisational system outside of the application. Only uses the application to compliment their own system, or maybe look up a data point on the go. Wants the ability to easily find a particular data point without having to dig too much. 

__As Cali:__

-  I want to be able to add all my artists, shows and venues to the platform to better manage my company.

-  As a Cali, I want data entry to be en masse and easy so I can spend less time doing data entry.

-  I want the application to display and function well on all screen sizes so I can easily use the application from anywhere.

-  I want to be able to change the details for the shows and venues I’ve created so I can stay on top of changes. 

-  I want to be able to add other producers to the application to collaborate with so I can easily share information and collaborate.

-  I want to be able to add artists to the application so they can access their show times and ticket sale information.

-  I want to be able to easily send emails to all or some of the artists and producers so I can save time creating emails

-  I want the shows to be displayed in an intuitive calendar so I can better picture my workload.

-  I want to be able to access information from the calendar so I don’t have to waste time navigating through the website to find what I want.

-  I want the application to make it easy to create artist logins that I can give out to artists so they can also use the platform to coordinate with me. 

-  I want the application to show me the information in more than just a calendar format, so I can explore the data more easily if I’m looking for something specific.

-  I want the application to visually differentiate different shows, artists and venues so it’s easier for me to visualise the data in different ways (maybe too technical)

-  I want the ability to set up automated SMS notifications for particular artists so I’m more confident in them actually turning up for a show (this is actually a big point for them xD)
(but also tricky)



__As Tim:__

-  I want to be able to see our calendar for upcoming events so I can be aware of upcoming shows.

-  I want to be able to easily log in with my work email and password on my mobile and tablet when I am outside of the office so I can work on the go.

-  I want to be able to easily navigate to an artists profile in order to find their contact details so I can send them a message.

-  I want to be able to view an artist's upcoming performances in an easy to understand calendar so I can coordinate with relevant people.

-  I want to be able to see key venue information provided to me by the event company so I can plan my shows.

-  I want to be able to download key show information into a CSV format so i can manage the information manually.

-  I want to be able to share links to different artist profiles with my team so we can all view the same information.

-  I want to be able to easily send SMS reminders to the artists from the app so I ensure artists get to their shows on time.

-  I want to be able to save the app to my phone or tablet so I can always easily find the key information I need. (PWA?)


__Artist__

Creative chaos (Name: Moonbeam)
A creative force that struggles to integrate organised structure into the way they express their art. Low tolerance for complex, nuanced application. Wants the application to work for them. The easier and more straightforward, the better.
Professional performer (Name: Gary)
Wants access to all the information relevant to them and their performance. Will use the platform to its full potential, exploring exactly what it can offer to them. Proactive in finding the information they want/need

__As Moonbeam:__

-  I want the application to be as easy to use as possible so I don’t have to spend too long interacting with it.

-  I want the application to show me first and foremost when and where I’m performing so I don’t have to waste time on the computer.

-  I want to be able to access the application from my phone or tablet so I don’t need to travel with a computer

-  I want the application to remind me about my performance time and venue so I have more time for my “creative process”

-  I want the ticket sales emailed to me so I don’t have to log into the application to get that info.

-  I want the ability to hide the names on the tickets so I don’t know if a reviewer is coming in.

-  I want the login process to be super easy and for my account to exist already so I don’t have to spend time signing up.

-  I want to be able to access information about the venues for my shows so I can get in contact with them directly if I want.

-  I want to see an easy to understand calendar with my upcoming shows so that I can prepare for my shows and arrive on time.

-  I want to be able to save the app to my phone, so I can easily access important show information.

-  I want to be able to send messages to the event producers, so that they can fulfill the requests for my upcoming shows.



__As Gary:__

-  I want to be able to mark dates on the calendar as available or unavailable so that producers know my availability.

-  I want to be able to download and print my upcoming dates in an easy to read format so that I can carry the information with me.

-  I want to receive email updates when shows are added to my calendar or when they are edited or deleted so that I stay up to date with changes to my shows.

-  I want to be able to accept or reject proposed dates and times for shows based on my availability so that I don’t have to manually contact the producers.


----------------------------

__Talent Data Flow Diagram__

![Talent Data Flow Diagram](docs/talent_dfd.png)

---------------------------

__Talent Application Architecture Diagram__

![Talent Application Architecture Diagram](docs/talent_app_arch.png)

----------------------------

__Trello Screen Shots__

Trello was used as a work tracking platform from the outset of the project. As we neared completion, we ended up populating a second Trello board for the next phase of the project. Both Trello boards are accessible here:

- Part A: https://trello.com/b/2P0YWFXL/talent
- Part B: https://trello.com/b/qExm8rzv/talent-pt-2

__27/11/20__

![Trello screenshot from 27/11/20](docs/trello271120.png)

__4/12/20__

![Trello screenshot from 4/12/20](docs/trello041220.png)

__8/12/20__

![Trello screenshot from 8/12/20](docs/trello081220.png)

---------------------------

__Wireframes__

We did all our first wireframes using Whimsical, which allowed us to quickly mock up a relatively full, rough application wireframe. We used Whimsical due to its fast, user friendly UI that allowed us to work quickly and dynamically with our ideas. This allowed us to be more agile in our approach to designing the web application.

![Whimsical wireframes for talent](docs/wireframes_v1.png)

Once we were happy with our initial wireframes, we moved onto Figma and created a full prototype for mobile with full styling and colour scheme. This allowed us to come back around to our client and show them a working prototype which we received feedback on. In the last week of documentation we went through the wire frames a final time to finalise the design and flow. 

![Figma wireframes for talent](docs/wireframes_v2.png)

You can access the full Figma file for our wireframe design here:
-  https://www.figma.com/file/T5HOM9IrUyHqvRUAxnjtAf/Talent-App-Coder-Final-Project?node-id=3%3A0

And get access to just the prototype here:
-  https://www.figma.com/proto/T5HOM9IrUyHqvRUAxnjtAf/Talent-App-Coder-Final-Project?node-id=76%3A52&scaling=scale-down


----------------------------

# Talent Implementation and Final Product

The actual implemented version of Talent ended up differing in a few ways than was outlined in the previous documentation. This was mainly due to time and knowledge constraints, as well as needing to rework the authentication system a few times before we found something that worked. 

MVP Features that were eventually culled from the project were:

-  Producers can add existing producers to a company.
-  Producers can add existing artists to a company.
-  Venues will have an a map displaying their location if one is assigned.
-  Artists can look at ticket sales for upcoming and past shows.
-  Artists can access producer information for the company.

Unfortunately, we were not able to implement any of the stretch features into the application.

## Local installation

Talent can be cloned from this repo and run on your local machine, as long as a few conditions are met.
Before trying to run this, you will need to have MongoDB installed on you local machine. You can find details of how to do this here :
https://docs.mongodb.com/manual/installation/

-  First, clone the entire repo onto you local machine

-  Second, open up two terminal windows. One of these windows will run the server, the other will run the client. 

__SERVER__

- In the first terminal window, from the root of the cloned directory, navigate to the server file
  ```
  cd src/server
  ```

-  From here, you will need to run ```npm i``` to install the required dependencies.
-  you will need to create a .env file in the server directory and input your local mongoDB connection string. You can find out what this string is by running the mongo shell in another terminal and checking what the connection string is on line 2.
-  once you have created a .env file, input 
  ```
  LOCAL_DB_URI=*your mongo db address*/talent_app
  NODE_ENV=development
  JWT_SECRET=*secret of your choice*
  ```
- If your connection string is different to "mongodb://127.0.0.1:27017/", you will need to open the server.js file in your code editor and change line 25 to reflect this change.
- From here, you should be able to run ```npm start``` on the src/server terminal. The server should run on port 3010 and will tell you if it has successfully connected to the database or not. 

__CLIENT__

-  In the second terminal window, you should similarly navigate to the client
  ```
  cd src/client
  ```

-  From here, you will need to run ```npm i``` to install the required dependencies.
-  You should be able to run ```npm start``, and react will start a local server and tell you what localhost port it is running on.

## Libraries

The following section describes the libraries that were used for both the server and client respectively

__Server__

-  Express: Express was used as the JS server framework on top of Node, to allow flexible, un-opinionated construction of the Talent back end.

-  Mocha / Chai / Chai-http: Mocha was used as the overarching testing framework used in conjunction with Node to test our express server. Chai was added as an assertion library to enhance testing capability. Chai-http was added on top of this to allow easy, straight forward end-to-end testing of the application
-  Bcrypt: Bcrypt was used explicitly in the encryption of passwords for the mongoose user model, which allowed one way encryption and comparison within the server.
-  Mongoose: Mongoose was used to interface with and translate information to and from the MongoDB NoSQL database into and out of the Express server.
-  Body-parser: body parser was used to populate the req.body object of all incoming reqs for parsing of encoded form data.
-  CORS: The cors package was used initially to ensure no connections were blocked to the server, before finally creating a whitelist that will only accept requests from the netlify front end client. 
-  Dotenv: Dotenv was used to help define and access environment variables in the development environment.
-  jsonwebtoken: This package was integral in creating and signing json web tokens that are send and stored on the client side. This was an important part of the authentication system used by Talent.
-  moment: moment was used to translate all submitted times into utc before being stored in the database. In this way, the database always runs on one "timezone" and the client is responsible for translating these utc times to the local timezone.
-  passport: passport was used as the authentication library and framework for our express server.
-  passport-jwt: This library was integral to the extraction and authentication of jwt tokens and setting up of authentication middleware for the express server. This allows the server to recognize whether a request has a valid token attached to the request and what information this token contains.
-  passport-local: This library adds a lot of functionality and middleware to registering and logging in users to the server. Usually this is used hand in hand with sessions, but with the JWT it was simply being used to help create and login users in a passport opinionated way before sending back a valid JWT.
-  nyc: nyc was used to help analyze the code coverage of the back end integration tests.

__Client__

-  React: The overall front-end framework used to create a dynamic, fast, component based front end


-  Axios: Axios was used as a http client for making async requests to the express server.
-  Bootstrap: Bootstrap was added to the project to help us quickly and easily style the application.
-  Formik: Formik was used in an attempt to streamline the use of forms in react. It handles much of the state automatically, however was trickier to use in conjunction with react-bootstrap and some of the funny ways I was implementing forms.
-  Yup: Yup was used as a validation library in conjunction with Formik to provide easy validation for our form fields. 
-  Moment: Moment was implemented in ensuring that there was localisation of time for all values that were passed to the calendar, as well as data that was being sent to and coming from the server. It was also used to ensure easy comparison and sorting of dates within the application.
-  Node-sass: Was added to the project to allow us to easily use SASS language in the stylesheets of the application.
-  React-big-calendar: This component allowed us to implement an easy to use and customise calendar for the homepage of the application
-  react-bootstrap: This component library helps streamline many of the bootstrap classes into easy to use react components that can be imported. 
-  react-datetime-picker: This component allowed easy selection of date and time within our formik forms for show start and end times.
-  react-dom: This library was used to easily implement the needed code to make our application a "one page app", mounting and unmounting components according to the URL.
-  react-icons: This library was used to access a large range of icons, easily importable as components.

## Testing

The testing for talent was done in two parts. The back end was tested using chai-http, with end-to-end style integration tests that tested each route as well as breakpoints for input specific routes. In conjunction with nyc, we were able to reach 90% code coverage.

The front end react application took much longer than expected, so testing was done manually using a table that tested the key CRUD features of the application in order to ensure functionality. This was done informally many times before being formally done, noting any last minute changes in styling and flow that needed to be implemented before the project was handed over to the client.

These manual tests were done for both the production environment, and on the final day of development, the production environment.





