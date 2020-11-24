# Talent

Logo thingy maybe

## Description

#### Purpose
Talent is a event management platform designed for the easy collation and synthesis of show, venue, producer, ticket and performing artist information. It aims to bring all these sources of information together into an intuitive and easy to navigate interface. The goal of Talent is to simplify and standardize the sharing and flow of information between all producers and performing artists, ensuring the most relevant data is displayed in easy to navigate ways.

#### Features
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

__STRETCH FEATURES__

- Producers can attach ticket sales to shows.
- The application will SMS artists an hour before their show begins.

- Artists can log into the portal using a created login.
- Artists can access companies they have shows with.
- Artists can see what shows they have upcoming and past shows.
- Artists can look at ticket sales for upcoming and past shows.
- Artists can access producer information for the company.

#### Target Audience
Talent is designed to be used by event producers/organisers to better share data between themselves and artists. While artists are integral to the platform in its current iteration, and they certainly have access to information also in the expanded version of the platform, the platform itself was designed with the producers in mind first and foremost. It was also developed in conjunction with two producers running Adelaide Fringe shows for 2021.

#### Tech Stack
- Node.js: Node was used as the server side, out of browser JS environment.
- Express: Express was used as the server framework, which React used as a backend API
- React: React was used as the front end application, sending queries to the express server in order to render dynamically and populate data.
- MongoDB: MongoDB was used as the database that communicated with express. There was no overt advantage in using a non-relational over a relational database in this application other than potential speed improvements.
- Bootstrap: Bootstrap was used to style the React front end components