const {Sequelize} = require('sequelize')


const sequelize = new Sequelize('jwt', 'tobi1', 'Dang.khoi1', {
    host: 'localhost',
    dialect: 'mysql', 
    database : 'jwt',
    username :'tobi1',
    password : 'Dang.khoi1',
    port : '3306',
  });
  const DBConnection = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
export default DBConnection;