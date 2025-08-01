# Qooper Survey API

A comprehensive survey management system built with NestJS, Fastify, and Prisma. This API allows users to create, manage, and respond to surveys with role-based access control.


## Tech Stack

- **Framework**: NestJS with Fastify adapter
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Deployment**: Heroku

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin/User)
- Secure password hashing with bcrypt
- Protected routes with guards

### Survey Management
- Create and manage survey forms
- Support for multiple question types (ShortText, Number)
- Form validation and error handling
- CRUD operations for forms and questions

### User Management
- User registration and login
- Role assignment (Admin/User)
- User profile management

### Response Collection
- Submit survey responses
- Track user responses
- Response validation

### Testing
- Unit tests with Jest
- End-to-end testing
- Test coverage reporting

## Architecture
```src/
├── modules/
│ ├── auth/ # Authentication & authorization
│ ├── form/ # Survey form management
│ ├── question/ # Question management
│ ├── response/ # Response handling
│ └── users/ # User management
├── prisma/ # Database schema & migrations
└── main.ts # Application entry point
```

## Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- PostgreSQL database
- Git

### Installation
1. **Clone the repository**

2. **Install dependencies**
```bash
$ npm install
```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

    Configure your `.env` file:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/qooper_survey"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3000
   HOS
   ```

4. **Database Setup**
```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run start:prod
   ```

The API will be available at `http://localhost:3000`
Interactive documentation at `http://localhost:3000/api`

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstname": "John",
  "lastname": "Doe"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```
### Survey Management

#### Create Form
```http
POST /form
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Customer Satisfaction Survey",
  "questions": [
    {
      "label": "How satisfied are you with our service?",
      "type": "Number"
    },
    {
      "label": "What improvements would you suggest?",
      "type": "ShortText"
    }
  ]
}
```

#### Get All Forms
```http
GET /form
Authorization: Bearer <jwt-token>
```

#### Get Form by ID
```http
GET /form/{id}
Authorization: Bearer <jwt-token>
```

### Response Management

#### Submit Response
```http
POST /response
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "formId": 1,
  "items": [
    {
      "questionId": 1,
      "answer": "5"
    },
    {
      "questionId": 2,
      "answer": "Great service!"
    }
  ]
}
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

### Heroku Deployment

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set DATABASE_URL="your-postgresql-url"
   heroku config:set JWT_SECRET="your-jwt-secret"
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

4. **Run migrations**
   ```bash
   heroku run npx prisma migrate deploy
   ```

## License

Nest is [MIT licensed](LICENSE).
