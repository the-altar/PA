"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookshelf = void 0;
const bookshelf_1 = __importDefault(require("bookshelf"));
const knex_1 = __importDefault(require("knex"));
const Knex = knex_1.default({ client: "pg", connection: process.env.DATABASE_URL });
exports.Bookshelf = bookshelf_1.default(Knex);
//# sourceMappingURL=db.js.map