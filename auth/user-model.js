const db = require('../database/dbConfig');

module.exports = {
findBy,
add,
findById
}

function findBy(filter){
  return db('users').where(filter).orderBy('id')
}

async function add(user){
    const [id] = await db('users').insert(user, 'id');
    return findById(id).first();
}

function findById(id){
  return db('users').where({id}).first();
}