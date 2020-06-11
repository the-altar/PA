module.exports = function(app){
    app.get('/game', (req, res) => {
        return res.sendFile('index.html', { root: './public/game' });
    })
    app.get('/game/lobby', (req, res) => {
        return res.sendFile('index.html', { root: './public/game' });
    })
    app.get('/game/ingame', (req, res) => {
        return res.sendFile('index.html', { root: './public/game' });
    })
}