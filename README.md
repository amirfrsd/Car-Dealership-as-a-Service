# <div align="center">Car-Dealership-as-a-Service</div>

### <div align="center">Project for the Service Engineering course using Flask and ReactJS</div>

#### Objectives
Gain familiarity with the development of three-tier enterprise applications using Flask and React. This includes exposing the business layer using REST services and JSON. Learn the SQLAlchemy Object Relational Mapper.

#### Overview
In this project, students will develop a web application to manage a used car dealership network that only runs online. The dealership contains information of cars, owners and clients. This application should have three clearly distinct layers:
* A database to keep all the information (except image files, which might be stored on the server file system).
* A business layer that interacts with the database and provides a REST interface to the outer world.
* A presentation layer developed in React.
Next, we go through the requirements of this assignment.

#### Requirements
###### Users
1. As a new user, I want to create an account, and edit my personal information (at any moment). I can create two types of accounts: dealership owner and client.
2. As a user, I want to authenticate and start a session with my e-mail and password. I want to login in any of the dealerships online (only those I own, if I am a dealership owner).
3. As a user, I want to be able to logout from any location or screen.
4. As an unauthenticated user, I must only have access to the login/register screen.

###### Owners
5. As owner, I can create a new dealership and edit the dealership information, including contacts (at any moment). This is an entirely new shop online, without cars. I become the owner of the dealership.
6. As owner, I want to sort all my dealerships in ascending or descending order, and I want to look at their profiles.
7. As owner, I want to sort all dealerships in ascending or descending order, and I want to look at their data in detail.
8. As owner, I can swap from one dealership to another (I own), if I have more than one.
9. As owner, I want to list all the clients that are registered in the system sorted by their name, and I want to look at their profiles in detail.
10. As owner, I can add, delete or edit car information, including a picture of the car, which is stored outside the database, in an S3 bucket. If I enter a car in the system, I become the owner of the	car.
11. As owner, I want to list all the cars I own sorted by price, brand, or brand and model order and I want to look at their data in detail.
12. As owner, I can associate and dissociate any car I own to another dealership, even if I don’t own the dealership.

###### Clients
13. As a client I want to delete my account (thus erasing all traces of my existence from the system).
14. As a client, I want to search for all the cars.
15. As a client, I want to search for all the cars in my district.
16. As a client, I want to search for all the cars of a given brand.
17. As a client, I want to search for all the cars of a given brand and model.
18. As a client, I want to search for all the cars within a price range.
19. As a client, I want to search for all the cars within a given kilometer range.
20. As a client, I want to search for all the cars of a given fuel type.
21. As a client, I want to combine all the previous queries.
