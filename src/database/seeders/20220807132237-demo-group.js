'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [
      {
        id: uuidv4(),
        name: 'Group1',
        permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
      },
      {
        id: uuidv4(),
        name: 'Group2',
        permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups', null, {});
  },
};
