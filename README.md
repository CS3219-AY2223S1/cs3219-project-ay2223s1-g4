# CS3219 Team 4 PeerPrep

## About

PeerPrep is a collaboration service for those in the tech domain to practice their technical and communication skills.

The following are the services present to support this application.

| No  | Service Name  | Description                                    | Default Port | Database Service |
| --- | ------------- | ---------------------------------------------- | ------------ | ---------------- |
| 1   | Frontend      | Serves the frontend pages for the application. | 3000         | NIL              |
| 2   | Matching      | Provides matching services for users.          | 8001         | MongoDB          |
| 3   | Collaboration | Provides collaboration service for users.      | 8002         | MongoDB          |
| 4   | Question      | Provides questions for collaboration practice. | 8003         | TBC              |
| 5   | PubSub        | Allows inter-service communication.            | 8004         | NIL              |
| 6   | User          | Allows update of user particulars .            | 8393         | NIL              |

Note that Auth0 is also used for authentication and its services are called upon for each service for security reasons.

## Frontend

1. Install npm packages using `npm i`.
2. Run Frontend using `npm start`.

## User Service

1. Install npm packages using `npm i`.
2. Run service using `npm start`

## Matching Service

1. Rename `.env.sample` file to `.env`.
2. Update relevant variables in the `.env` file.
3. Install npm packages using `npm i`.
4. Run service using `npm run dev`.

## Collaboration Service

1. Rename `.env.sample` file to `.env`.
2. Update relevant variables in the `.env` file.
3. Install npm packages using `npm i`.
4. Run service using `npm run dev`.

## Question Service

1. Rename `.env.sample` file to `.env`.
2. Update relevant variables in the `.env` file.
3. Install npm packages using `npm i`.
4. Run service using `npm run dev`.

## PubSub Service

1. Rename `.env.sample` file to `.env`.
2. Update relevant variables in the `.env` file.
3. Install npm packages using `npm i`.
4. Run service using `npm run dev`.
