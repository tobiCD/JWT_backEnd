'use strict';
import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  class Project_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Project_User.init({
   projectId : DataTypes.INTEGER,
   userID : DataTypes.INTEGER
   
 
  }, {
    sequelize,
    modelName: 'Project_User',
  });
  return Project_User;
};