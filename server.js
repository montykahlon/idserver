// Importing required modules
import express from 'express';
import logger from './logger.js';
import { v4 as uuidv4 } from 'uuid';
import { addWaiting, searchWaiting } from "./db.js"; // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
// Creating the Express app
const app = express();
// Define a route at '/hello'
app.get('/id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    searchWaiting().then(x => {
        if (x === null) {
            //! new game without a player waiting
            const _id = uuidv4()
            addWaiting({ _id: _id })
                .then((e) => {
                    res.status(200).send(`${_id}`);
                })
                .catch((y) => {
                    logger.info(`the following error occured at addwaiting ${y}`) 
                })
        } else {
            const _id = x._id
            res.status(200).send(_id);
        }
    }).catch((y) => { logger.info(`the following error occured at search waiting ${y}`) })
});
// Define a default route to handle other requests
app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

// Set the server to listen on port 8080
const port = 5000;
const host = '0.0.0.0';
app.listen(port, host, () => {
    logger.info(`Server is listening on port ${port}`);
}); 
