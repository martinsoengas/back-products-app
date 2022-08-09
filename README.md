# Proyect in progress...

/login endpoint, 'user' validation and authentication in progress.

# Getting Started with this Products App (Back end)

This project was created ussing NodeJs and Express.\

This app is up and running on Heroku.

## Features of this app

This project has an several endpoints to products and product creation, so you can connect to the MongoDB database and send/receive the data requested.

## Setting up local environment

To start this app locally you have to first import the 'products' collection to your local mongo server or create an environmental variable with the Mongo URI using credentials to access the Mongo Atlas cloud database.\

Then you can run:

### `npm start`

Runs the app in the port 4000 (localhost:4000). You can change the port in the server.js file.

## Available endpoints

**/products** endpoint with a GET request returns all available products on the database in an array.\
**/products/:id** endpoint with a GET request returns the product by its 'id'.\
**/products/:id** endpoint with a PATCH request is used to send an update to the product selected by 'id'.\
**/products/:id** endpoint with a DELETE request is used to delete a product selected by 'id'.\
**/new-product**endpoint with a POST request is used to create a new product on the database.\

You can get more info [here](https://documenter.getpostman.com/view/12738432/VUjMoRBe)

## Libraries used

The app uses the Express framework, 'Mongoose' to create the Product schema and make the connection to the MongoDB, and 'Dotenv' to store the Mongo URI.

## Other tools used

I used Postman create documentation and to set up two different environments (dev and prod), and used variables to switch from testing local to remote endopints.
