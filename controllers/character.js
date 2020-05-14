const CharDB = require("../model/index").Character
const path = require('path')
const fs = require('fs')

exports.create = (req, res) => {
    
    console.log(req.body)
    CharDB.create(req.body, function (err, doc) {
        if (err) {
            console.log(err)
            return res.json({ code: 0 })
        }
        return res.json({ code: 1 })
    })
}

exports.update = (req, res) => {
    CharDB.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, function (err, doc) {
        if (err) {
            console.log(err)
            return res.json({ code: 0 })
        }
        return res.json({ code: 1 })
    })
}

exports.delete = (req, res) => {
    const char = req.body
    let pics = char.skills.map(s=> {return s.skillpic} )
    pics.push(char.facepic)
    pics.push(char.banner)
    
    pics.forEach(pic=>{
        const p = path.join(__dirname, '..', '/public/img/game/', pic + ".jpg")
        fs.unlink(p, function(){
            console.log("pic deleted!")
        })
    })

    CharDB.deleteOne({_id: char._id}, (err)=>{
        if (err){
            console.log("records couldn't be deleted. Something went wrong.")
            return res.json({code: 0})
        }
        console.log("records deleted")
        return res.json({code: 1})
    })
}

exports.getAll = (req, res) => {
    CharDB.find({}, function (err, docs) {
        if (err) {
            console.log(err)
            return res.json({ code: 0 })
        }
        return res.json({ code: 0, docs: docs })
    })
}

exports.upload = (req, res) => {
    
    if (req.files !== undefined && req.files !== null) {
        
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
