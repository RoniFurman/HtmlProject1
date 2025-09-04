# Django REST Blog API

This project implements a blog system with user registration, JWT authentication, article and comment management, and search/filtering.

## Features

- User registration and JWT authentication
- CRUD for articles and comments
- Article search and filtering
- PostgreSQL database
- Uses: django-filter, django-cors-headers, drf-simplejwt, python-dotenv, python-decouple

## Setup

1. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
2. Set up PostgreSQL and configure `.env` with your database credentials.
3. Run migrations:
   ```sh
   python manage.py migrate
   ```
4. Start the server:
   ```sh
   python manage.py runserver
   ```

## Author

Roni Furman
