# <img src="Frontend\src\databaseWhite.png" width="25" height="25"> DATALINK

A prototype for an app that serves as a data-privacy information hub 

## Description

Created using [Create-React-app](https://create-react-app.dev/). Built using ReactJS, Express, NodeJS, and PostgresSQL

MY FIRST PROJECT!! Datalink is a full stack webapp, with hopes of being a one stop all for data privacy for organizations and individuals. Currently, it's pretty barebones, but looking forward to building!!

Features:
 - Cookie report -> Search a website and recieve a web tracking report regarding how safe its cookies are with your data

Future features:
 - Organizations:
     - Phising/scam email message board -> Warn others in your organization about suspicious emails
     - WebReport -> get a review of the most dangerous websites visited by users in your organization
     - Website check -> check that your organizations websites are protecting users data
 - Indivdual:
    - Cookie guard -> Set your cookie preferences once and have datalink automatically disable unnessecary or dangerous cookies on any website you vist
    - blogs -> blogs about best practices for protecting your identity online

## Getting Started

This project is currently very dependent on my local machine and not ready for outside use. In the future, I will migrate database, and backend to a Web Server.

## To-do:
 - Add ability to click on sites to get in-depth cookie report, rather than just one dimensional rating (build react page structure, and db query to get cookie info)
 - improve webscraping technique, (webdriver is slow, and not very dynamic), build feature to allow users to get cookie report on demand rather than only having access to sites that have been previously scraped
 - figure out how to prioritizes sql searches, all sites currently in form: `https://.*.[.com, .org, .edu, etc...]`, 
 need to prioritize searches in * region and if not enough results widen to the rest


## Help

I am extremely open to any suggestions or changes. I'm super new to development of any kind and welcome any help. Contact me at hemphilled@icloud.com

## Authors


 Ellington Hemphill  
