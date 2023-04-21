const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const PostComment = require("./PostComment");
const Post = require('./Post');
const db = require('../config/connection');

class User extends Model {
    async validatePass(provided_password) {
        // bcrypt compare returns a boolean, based on if the string matches the encrypted string
        const is_valid = await bcrypt.compare(provided_password, this.password);

        return is_valid;
    }
}

User.init({
    userName: {
        type: DataTypes.TEXT,
        allowNull: false,
        
    },
    password: {
        type: DataTypes.TEXT,
        validate: {
            // Check that the value is at least 6 characters in lengthF
            len: 6
        },
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'user',
    hooks: {
        async beforeCreate(user) {
            // bcrypt hash will return an ecrypted string mixing the standard password string 
            // with 10 levels of salt in this case
            const encrypted_pass = await bcrypt.hash(user.password, 10);

            // Store the encrypted password to the database instead of the standard string
            user.password = encrypted_pass;
        }
    }

});

User.belongsToMany(Post, { through: "user_posts", as: 'userPosts' });
User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(PostComment);
PostComment.belongsTo(User);



module.exports = User;