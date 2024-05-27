const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const readData = (file) => {
    const data = fs.readFileSync(path.join(__dirname, file));
    return JSON.parse(data);
};

const writeData = (file, data) => {
    fs.writeFileSync(path.join(__dirname, file), JSON.stringify(data, null, 2));
};

app.get('/api/data', (req, res) => {
    const data = readData('data.json');
    res.json(data);
});

app.post('/api/data', (req, res) => {
    const data = readData('data.json');
    res.json(data);
});

app.post('/api/data/submit', (req, res) => {
    const newData = req.body;
    const data = readData('data.json');
    data.push(newData);
    writeData('data.json', data);
    res.json({ message: 'Data received' });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/data/format', (req, res) => {
    const data = readData('data.json');
    const acceptHeader = req.headers.accept;

    if (acceptHeader.includes('application/xml')) {
        res.type('application/xml');
        let xmlData = '<?xml version="1.0" encoding="UTF-8"?><data>';
        data.forEach(item => {
            xmlData += `<order><id>${item.id}</id><name>${item.name}</name></order>`;
        });
        xmlData += '</data>';
        res.send(xmlData);
    } else if (acceptHeader.includes('text/html')) {
        res.type('text/html');
        let htmlData = '<table><tr><th>ID</th><th>Name</th></tr>';
        data.forEach(item => {
            htmlData += `<tr><td>${item.id}</td><td>${item.name}</td></tr>`;
        });
        htmlData += '</table>';
        res.send(htmlData);
    } else {
        res.json(data);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
