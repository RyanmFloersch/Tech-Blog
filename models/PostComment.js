const {Model, DataTypes} = require('sequelize');
const db = require('../config/connection')

class PostComment extends Model{

}

PostComment.init({
    content: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    date:{
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    sequelize:db,
    modelName: 'comment'
});



module.exports = PostComment;