### Polls

```console
curl -X GET http://127.0.0.1:8080/polls | jq

curl -X PUT \
    -H "Content-Type: application/json" \
    -d '{"pollId":"24afb74f-d4bd-4c02-9837-479deb81ba79","multipleChoice":false,"options":[],"votes":[],"title":"Szavazás","description":"leírás"}' \
    http://127.0.0.1:8080/polls | jq

curl -X GET http://127.0.0.1:8080/polls | jq

curl -X GET http://127.0.0.1:8080/polls/24afb74f-d4bd-4c02-9837-479deb81ba79 | jq

curl -X DELETE http://127.0.0.1:8080/polls/24afb74f-d4bd-4c02-9837-479deb81ba79

curl -X GET http://127.0.0.1:8080/polls/24afb74f-d4bd-4c02-9837-479deb81ba79 | jq
```

### Options

```console
curl -X PUT \
    -H "Content-Type: application/json" \
    -d '{"optionId":"da48ddfe-58ba-4c95-99f3-a50a0b034e16","price": 2000,"poll":"24afb74f-d4bd-4c02-9837-479deb81ba79","votes": [],"title":"Opció 1","description":"leírás"}' \
    http://127.0.0.1:8080/options | jq

curl -X GET http://127.0.0.1:8080/options/da48ddfe-58ba-4c95-99f3-a50a0b034e16 | jq

curl -X DELETE http://127.0.0.1:8080/options/da48ddfe-58ba-4c95-99f3-a50a0b034e16
```

### Votes

```console
curl -X PUT \
    -H "Content-Type: application/json" \
    -d '{"voteId":"82b44cd8-01c3-4a7f-a267-3f6a917da5f8","poll":"24afb74f-d4bd-4c02-9837-479deb81ba79","option":"da48ddfe-58ba-4c95-99f3-a50a0b034e16"}' \
    -b username=Zoli \
    http://127.0.0.1:8080/votes | jq

curl -X GET http://127.0.0.1:8080/votes/82b44cd8-01c3-4a7f-a267-3f6a917da5f8 | jq

curl -X DELETE http://127.0.0.1:8080/votes/82b44cd8-01c3-4a7f-a267-3f6a917da5f8
```
