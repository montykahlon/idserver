// Importing required modules
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { addWaiting, searchWaiting } from "./db.js"; // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
// Creating the Express app
const app = express();
// Define a route at '/hello'
app.get('/id', (req, res) => {
    console.log(`got req ${req}`)
    searchWaiting()().then(x => {
        console.log(x)
        if (x.value === null) {
            //! new game without a player waiting
            const _id = uuidv4()
            res.send(_id);
            addWaiting({ _id: _id })()
                .then((e) => {
                    console.log(_id)
                    res.send(_id);
                })
                .catch((y) => {
                    console.log(y)
                })
        } else {
            const { _id } = x.value
            res.send(_id);
        }
    }).catch((y) => { console.log(y) })
});
// Define a default route to handle other requests
app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

// Set the server to listen on port 8080
const port = 3001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
