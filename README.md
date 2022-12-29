# OpenAI POC

Proof of concept to test OpenAI beta APIs:
https://beta.openai.com/docs/introduction/overview

## Backend

Micronaut-based API, using [openai-java](https://github.com/TheoKanning/openai-java)  by Theo Kanning

For more examples:
* https://github.com/openai/openai-cookbook
* https://beta.openai.com/examples

### Config

Create a `application-local.yml` in `src/main/resources` with the following content:

```
openai:
  api-token: 'sk-d....' # Your API Token created on https://beta.openai.com
  completion-model: 'text-davinci-003' # text-davinci-003, text-curie-001, text-babbage-001, text-ada-001
  moderation-model: 'text-moderation-stable' # text-moderation-stable, text-moderation-latest
```

### Run

```
cd backend
./gradlew runLocal
```

Server will run on http://localhost:8080

## Frontend

Angular-based web frontend.

### Run

```
cd frontend
npm i
ng serve
```

Open your browser on http://localhost:4200