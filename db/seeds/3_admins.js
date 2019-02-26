const uuidv4 = require('uuid');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admins').del()
    .then(function () {
      // Inserts seed entries
      return knex('admins').insert([
        {id: uuidv4(), email: 't.martin49@gmail.com', password: 'test123'}
      ]);
    });
};
