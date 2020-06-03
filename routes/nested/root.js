module.exports = function(app){
    app.get('/', (req, res) => {
        return res.sendFile('index.html', { root: './public/main' });
    })
}