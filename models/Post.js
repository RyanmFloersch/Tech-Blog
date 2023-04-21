const { Model, DataTypes } = require("sequelize");
const PostComment = require('./PostComment');
const db = require('../config/connection');


class Post extends Model{


}

Post.init({
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    sequelize: db,
    modelName: 'post'
});

Post.hasMany(PostComment);


module.exports = Post;