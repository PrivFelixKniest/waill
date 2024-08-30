# Waill Monorepo

## Description

Waill (Well AI) is a platform for retrieving information from documents using the OpenAI API. It uses a React Frontend, a FastAPI Backend, the OpenAI SDK, Auth0 for authentification, and a Relational Database (PostgreSQL) with sqlalchemy. 

## Usage

To see a running, up-to-date version of this codebase visit https://waill.net. Please note that using all of waills features will require you to connect an OpenAI account with some budget to spend.

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
