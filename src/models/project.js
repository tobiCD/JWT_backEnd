'use strict';
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsToMany(models.User , { through :'Project_User'})
    }
  };
  Project.init({
   name : DataTypes.STRING,
   description : DataTypes.STRING,
   startDate : DataTypes.STRING,
   customerId : DataTypes.INTEGER
   
 
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};