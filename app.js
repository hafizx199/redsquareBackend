const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

// Function to generate a random SHA-256 hash
function generateRandomHash() {
    //Create random data 36 character and remove 2 first character
    const randomData = Math.random().toString(36).substring(2);

    //This part creates a hash object using the SHA-256 algorithm
    //The update(randomData) method incorporates the input data (randomData) into the hash
    //digest('hex') finalizes the hash, returning its hexadecimal string representation.
    return crypto.createHash('sha256').update(randomData).digest('hex');
}

// Endpoint #1: Returns a random hash string after 1 second
//Develop an endpoint #1, where it will be returning a random hash string using SHA-256 algorithmn. In every hash generation, it will always return a unique hash string and not repeatable. Endpoint #1 shall only return after 1 seconds.
app.get('/endpoint1', (req, res) => {
    setTimeout(() => {
        const randomHash = generateRandomHash();
        res.json({ hash: randomHash });
    }, 1000);
});