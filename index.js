import express from 'express';

const app= express();

app.use(express.json())

const users = [
    {id:1, name: 'Ashley Cole', age: 20, enroll: true},
    {id:2, name: 'Achley Cool', age: 20, enroll: false},
    {id:3, name: 'Ashly Cold', age: 20, enroll: false}
];

app.get( '/', (req, res) => {
    res.send('Node JS API');
});

app.get('/api/users', (req, res) => {
    res.send(users)
});

app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => (u.id === parseInt(req.params.id)));
    if (!user){ 
        return res.status(404).send('User not found')
    }else {
        res.send(user);
    }
});

app.post('/api/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };

    users.push(user)
    res.send(user)
});

app.delete('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).send('User not found');

    const index = users.indexOf(user);
    user.splice(index, 1)
    res.send(user)
    
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`))