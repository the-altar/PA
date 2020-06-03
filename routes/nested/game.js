module.exports = function(app){
    app.get('/game', (req, res) => {
        return res.sendFile('index.html', { root: './public/game' });
    })
    app.get('/game/selection', (req, res) => {
        return res.sendFile('index.html', { root: './public/game' });
    })
}