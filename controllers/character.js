const CharDB = require("../model/index").Character
const path = require('path')

exports.createNewChar = (req, res) => {
    CharDB.create(req.body, function (err, doc) {
        if (err) {
            console.log(err)
            return res.json({ code: 0 })
        }
        return res.json({ code: 1 })
    })
}

exports.updateChar = (req, res) => {
    CharDB.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, function (err, doc) {
        if (err) {
            console.log(err)
            return res.json({ code: 0 })
        }
        return res.json({ code: 1 })
    })
}

exports.getAllChars = (req, res) => {
    CharDB.find({}, function (err, docs) {
        if (err) {
            console.log(err)
            return res.json({ code: 0 })
        }
        return res.json({ code: 0, docs: docs })
    })
}

exports.uploadCharacter = (req, res) => {
    
    if (req.files !== undefined && req.files !== null) {
        console.log(Object.keys(req.files))
        for (const field in req.files) {
            
            const filename = req.files[field].name
            const p = path.join(__dirname, '..', '/public/img/game/', filename + ".jpg")
           
            req.files[field].mv(p, err => {
                if (err) {
                    console.log(err)
                    return res.status(500).send(err);
                }
            })
        }

        return res.send('File uploaded!');
    } else {
        return res.json({})
    }


}
