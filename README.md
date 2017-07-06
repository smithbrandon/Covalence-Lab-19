# Project 2: Angular Blog
## Due: TBA
##### Covalence
###### Full Stack: Summer 2017

## Info
* You will be creating a blog site using Angular, Express, and MySQL
* You will be writing an express server and API code, so you will need to install express, body-parser, and mysql into your package.json file
* You will be using factories, $resource, and html5Mode

## Objectives - Server Code
* Write code to respond to the following API endpoints, with the specified behavior:
    * Collection `/api/posts`
        * POST: Should store the blog post with the composing user's id and the category id set. Should respond with the id of the inserted blog post and status 201
    * Detail: `/api/posts/:id`
        * PUT: Should allow updating the title, content, and categoryid of a blog post. Should respond with no data, just code 204

## Objectives - Front-End
* Each of those factories should return a $resource for interacting with the entities they are named after. Only Post needs to support updating.
* Your Angular blog should consist of the following routes:
    * `/compose`
        * Contains an input field for title
        * Contains a select box for selecting the category from a list of all the categories
        * Contains a select box for selecting the user from a list of all the users
        * Contains a textarea for typing the content of the blog post
        * Contains a button for saving the blog post
        * Navigates back to the list of posts when successfully saved
    * `/:id/update`
        * Contains an input field for changing the title
        * Contains a select box for changing the category
        * Contains a textarea for changing the content
        * Contains a button that causes the post to be updated
        * The fields above should be initially set to the current values from the blog post we're editing
        * Navigates back to the single post view when the update is successful
    * `/:id`
        * Should have an edit button that navigates to the update page

## Hints/Reminders:
* Time management is key to completing this project. There's a lot going on here, but you've done it all already. Don't wait to the last minute.
* Remember that we rarely create/access/update DOM elements ourselves from code. Use data-binding as much as possible.

## Extending
* Finished early and want a challenge?
    * Add views, API routes, and stored procedures for creating, updating, and deleting categories and users