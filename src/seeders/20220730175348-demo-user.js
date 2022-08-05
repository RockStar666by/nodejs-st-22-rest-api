'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: uuidv4(),
        login: 'johndoe111',
        password: '12345678abc',
        age: 20,
        isDeleted: false,
      },
      {
        id: uuidv4(),
        login: 'johndoe222',
        password: '12345678abc',
        age: 21,
        isDeleted: false,
      },
      {
        id: uuidv4(),
        login: 'johndoe333',
        password: '12345678abc',
        age: 22,
        isDeleted: false,
      },
      {
        id: uuidv4(),
        login: 'johndoe444',
        password: '12345678abc',
        age: 23,
        isDeleted: false,
      },
      {
        id: uuidv4(),
        login: 'johndoe555',
        password: '12345678abc',
        age: 24,
        isDeleted: false,
      },
      {
        id: uuidv4(),
        login: 'johndoe666',
        password: '12345678abc',
        age: 25,
        isDeleted: false,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
