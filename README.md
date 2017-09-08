# 48d0887bbaf9f8cb4145b0a1fdb9d70e
ManageSocial Tech Task for ManageFlitter

**To try this app, you must set a Read/Write Twitter app [here](https://apps.twitter.com/).**

## Installation

```
npm install
```

## Build

```
gulp build
```

## Testing

```
npm test
```

## Env Variables

The environment in which this application is started **must** have the following variables:

- CONSUMER_KEY
- CONSUMER_SECRET

The values can be found at [https://apps.twitter.com/](https://apps.twitter.com/).

## Start the app

```
npm start
```

## Endpoints

- GET /oauth_request: returns a URL to visit to get a login PIN
- POST /connect: pass the previously obtained PIN as `verifier` as a JSON body to get the current user data.
```
curl -v -H "Content-Type: application/json" -X POST -d '{"verifier": "{PIN}"}' http://localhost:3000/connect
```
- GET /tweets: Returns the last *100* tweets from the logged in user (as JSON)
- POST /disconnect: Disconnect the current user
- POST /post: post a new tweet. Requires `status` as a JSON body representing the new tweet.
```
curl -v -H "Content-Type: application/json" -X POST -d '{"status": "Hello World"}' http://localhost:3000/post
```
