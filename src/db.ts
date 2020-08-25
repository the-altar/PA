import bookshelf from 'bookshelf'
import knex from 'knex'

const Knex = knex({client:"pg", connection: process.env.DATABASE_URL})
export const Bookshelf = bookshelf(Knex)