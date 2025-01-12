const express = require('express')
const app = express()

//Middlewares
app.use(express.json())
app.use(authenticate)

function authenticate(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(401).send('Unauthorized');
    }


    if (apiKeyDB.includes(apiKey)) {
        next()
    } else {
        return res.status(401).send('Unauthorized')
    }
}
const apiKeyDB = ["APIKEY1", "APIKEY2"]

app.get('/', authenticate, function (req, res) {
    res.send('Hello Edvin')
})

const cardMockDB = [{
    "id": 1,
    "activeUntil": new Date('2025-05-05'),
},
{
    "id": 2,
    "activeUntil": new Date('2019-05-05'),
}
]

app.get('/sl-access/:cardId', authenticate, function (req, res) {
    const cardId = req.params.cardId;
    const cardMatch = cardMockDB.filter(cardFromDB => cardFromDB.id == cardId)
    const cardActiveUntil = cardMatch[0].activeUntil;
    const isValid = cardActiveUntil > new Date;
    res.send(isValid);
})

const trainMockDB = [{
    "trainNumber": 14,
    "leavesAt": "10:03",
    "arrivesAt": "10:09"
}]


app.post('/sl-departures', authenticate, (req, res) => {
    if (req.body.from == "Tekniska högskolan" && req.body.to == "Tcentralen") {
        res.send(trainMockDB)
    } else
        res.send("invalid route")
})

app.listen(3000)