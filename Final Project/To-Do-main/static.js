const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server Established at PORT : ${PORT}`);
});