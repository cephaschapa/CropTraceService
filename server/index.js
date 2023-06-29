import express from 'express';
const app = express()
const PORT = 3001;

app.get('/app', (req, res) => {
    res.send({
        data: 'success'
    })
})

app.listen(PORT, () => {
    console.log('Server listening on 3001')
})