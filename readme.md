# Waill Monorepo

## Description

Waill (Well AI) is a platform for retrieving information from documents using the OpenAI API. It uses a React Frontend, a FastAPI Backend, the OpenAI SDK, Auth0 for authentification, and a Relational Database (PostgreSQL) with sqlalchemy. 
![image](https://github.com/user-attachments/assets/b32406d1-8681-467b-811c-059eed536962)

![image](https://github.com/user-attachments/assets/4f16c7ae-c9fe-48ae-8aa3-3406d85f0594)

![image](https://github.com/user-attachments/assets/c1832c7a-52c7-4994-8c05-b1fc8988e654)

## Usage

To see a running, up-to-date version of this codebase visit https://waill.net. Please note that using all of waills features will require you to connect an OpenAI account with some budget to spend.

### Disclaimer

While the code stays as it is, everything around it are subject to change. This codebase is not actively maintained, which is why interfaces with OpenAI and other services might at some point no longer function as intended. The service can also not guarantee good answer results as that is up to the API and OpenAIs implementations. Repeated problems with the answer results are actually part of why this project is no longer pursued, so be aware of that in case these issues still percist when you are using the software.

## Overview

### Frontend

The React frontend (https://waill.net - hosted on vercel) contains two primary pages: 
- A landing page "/"
- The chat window "/chat", which orchestrates and displays data from the FastAPI Backend, such as sending messages to your "Well" to retrieve information from your documents.

### Backend

The FastAPI Backend (https://server.waill.net - hosted on render.com to support Background Tasks and async Rest API Features) contains multiple routes to:
- CRUD User Data, including encryption and decryption for sensitive data.
- CRUD Wells, including encryption and decryption for sensitive data.
- CRUD Messages, including asynchronously waiting for a response from the Backend and offering a poll endpoint to fetch the new message for the frontend.
- /ping as a health check route

Visit https://server.waill.net/docs to view the automatically generated OpenAPI documentation. (The render instance shuts off automatically, expect to wait for a cold start)
