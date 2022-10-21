# CS3219 Team 4 PeerPrep

## About

PeerPrep is a collaboration service for those in the tech domain to practice their technical and communication skills.

The following are the services present to support this application.

| No  | Service Name  | Description                                               | Default Port | Database Service |
| --- | ------------- | --------------------------------------------------------- | ------------ | ---------------- |
| 1   | Frontend      | Serves the frontend pages for the application.            | 3000         | NIL              |
| 2   | Matching      | Provides matching services for users.                     | 8001         | MongoDB          |
| 3   | Room          | Provides room creation and maintenance service for users. | 8002         | MongoDB          |
| 4   | Question      | Provides questions for collaboration practice.            | 8003         | TBC              |
| 5   | PubSub        | Allows inter-service communication.                       | 8004         | NIL              |
| 6   | Collab        | Provides collaboration service for users.                 | 8005         | MongoDB          |
| 7   | User          | Allows update of user particulars.                        | 8393         | NIL              |

Note that Auth0 is also used for authentication and its services are called upon for each service for security reasons.

## Running whole application locally

1. Open 2 terminals
2. Run `./run-backend.sh` in one terminal and `./run-frontend.sh` in the other
3. For each script, to terminate the session, press `CRTL-C`

## Running individual service

### Frontend Service

1. Install npm packages using `npm i`.
2. Run Frontend using `npm start`.

### Backend Services

1. Rename `.env.example` file to `.env`.
2. Update relevant variables in the `.env` file.
3. Install npm packages using `./run.sh b`.
4. Run service using `./run.sh r`.

Note: For `question-service` under the backend side, explore its `README.md` to setup locally.

### TODO: Running with docker

1. Run `./run-docker.sh` to run all the services.
2. To kill services, run `./run-docker.sh k`.
