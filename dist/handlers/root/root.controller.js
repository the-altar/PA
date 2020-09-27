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
exports.postNews = exports.findNews = exports.uploadController = exports.baseController = exports.authenticateAdmin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const db_1 = require("../../db");
function authenticateAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.session_id;
            if (!token)
                return res.status(401).end();
            const u = yield jsonwebtoken_1.verify(token, process.env.TOKEN_SECRET);
            if (u.authLevel < 100)
                return res.status(401).end();
            else
                next();
        }
        catch (err) {
            res.status(401).end();
            throw (err);
        }
    });
}
exports.authenticateAdmin = authenticateAdmin;
exports.baseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.sendFile('index.html', { root: './public/main' });
});
exports.uploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json([{ "url": "/absolute/path/to/filename.png" }]);
});
exports.findNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const text = `select thread.created_at as "createdAt", thread.title,  thread."content", jsonb_build_object('username', users.username, 'avatar', users.avatar) as "author" 
    from thread 
    left join users 
        on thread.author = users.id 	
    where site_area=0
    order by created_at DESC
    limit 5;`;
    try {
        const docs = yield db_1.pool.query(text);
        res.status(200).json(docs.rows);
    }
    catch (err) {
        res.status(501).end();
        throw (err);
    }
});
exports.postNews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const {author, content, siteArea, title} = req.body
    const text = `insert into thread (site_area, title, content, author) values ($1, $2, $3, $4)`;
    try {
        yield db_1.pool.query(text, req.body);
    }
    catch (err) {
        res.status(501).end();
        throw (err);
    }
});
//# sourceMappingURL=root.controller.js.map