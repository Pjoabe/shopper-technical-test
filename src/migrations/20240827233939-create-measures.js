// // migrations/YYYYMMDDHHmmss-create-measures.js
// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('Measures', {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//       },
//       customer_code: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       measure_datetime: {
//         type: Sequelize.DATE,
//         allowNull: false
//       },
//       measure_type: {
//         type: Sequelize.ENUM('WATER', 'GAS'),
//         allowNull: false
//       },
//       value: {
//         type: Sequelize.INTEGER,
//         allowNull: true
//       },
//       image_url: {
//         type: Sequelize.STRING,
//         allowNull: true
//       },
//       has_confirmed: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
//       }
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('Measures');
//   }
// };
