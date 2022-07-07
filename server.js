import express from 'express';

const app = express();

const PORT = 3000;

app.use('/', (req, res) => {
    res.send('hello word');
})

app.listen(PORT, () => {
    console.log('server started');
})