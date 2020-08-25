"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = exports.upload = exports.getAll = exports.remove = exports.find = exports.update = exports.create = void 0;
const character_1 = require("../../models/character");
const path_1 = require("path");
const fs_1 = require("fs");
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield character_1.CharacterDB.create(req.body);
        return res.json({ code: 1 });
    }
    catch (err) {
        console.error(err);
        return res.json({ code: 0 });
    }
});
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield character_1.CharacterDB.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { upsert: true });
        return res.json({ code: 1 });
    }
    catch (err) {
        return res.json({ code: 0 });
    }
});
exports.find = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const char = yield character_1.CharacterDB.findById(req.params.id);
        return res.json(char);
    }
    catch (err) {
        console.error(err);
        return res.json({ code: 0 });
    }
});
exports.remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const char = req.body;
    let pics = [];
    char.skills.forEach(s => {
        pics.push(s.skillpic);
        pics.push(s.banner);
    });
    pics.push(char.facepic);
    pics.push(char.banner);
    pics.forEach(pic => {
        const p = path_1.join(process.cwd(), '/public/img/game/', pic + ".jpg");
        fs_1.exists(p, (f) => {
            if (f) {
                fs_1.unlink(p, () => { });
            }
        });
    });
    try {
        yield character_1.CharacterDB.deleteOne({ _id: char._id });
        return res.json({ code: 1 });
    }
    catch (err) {
        console.error(err);
        return res.json({ code: 0 });
    }
});
exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docs = yield character_1.CharacterDB.find({});
        return res.json(docs);
    }
    catch (err) {
        console.error(err);
        return res.json(false);
    }
});
exports.upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    for (const file in req.files) {
        const f = req.files[file];
        const p = path_1.join(process.cwd(), '/public/img/game/', f.name + ".jpg");
        f.mv(p, (err) => {
            if (err) {
                console.log(err);
                return res.status(500);
            }
        });
    }
    return res.send('File uploaded!');
});
exports.uploadFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = [];
    for (const file in req.files) {
        const f = req.files[file];
        const p = path_1.join(process.cwd(), '/public/img/game/', req.params.filename + ".jpg");
        f.mv(p, (err) => {
            if (err) {
                console.log(err);
                return res.status(500);
            }
            response.push({ url: `http://localhost:3000/img/game/${req.params.filename}.jpg` });
        });
    }
    return 1;
});
//# sourceMappingURL=character.controller.js.map