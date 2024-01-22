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

// Endpoint #2: Keeps requesting hash from Endpoint #1 until a valid hash is received
//Develop an endpoint #2, where it will be keep requesting a hash string from endpoint #1, and endpoint #2 shall only return a success response body when last 1 character of the hash is a number and it is an odd number
app.get('/endpoint2', (req, res) => {
    function requestHash() {
        setTimeout(() => {
            const randomHash = generateRandomHash();
            const lastChar = randomHash.charAt(randomHash.length - 1);
            
            // Check if the last character is a number and an odd number
            //Checks whether a value is NaN (not a number) and converts the last character of the `randomHash` string into an integer
            //It checks if the last character of `randomHash` is a number and an odd number; if true, it responds with success, otherwise, it retries to get a valid hash.
            if (!isNaN(lastChar) && parseInt(lastChar) % 2 !== 0) {
                res.json({ success: true, hash: randomHash });
            } else {
                requestHash(); // Retry until a valid hash is received
            }
        }, 1000);
    }

    requestHash();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
