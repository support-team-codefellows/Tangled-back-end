'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secret';

const Users = (sequelize, DataTypes) => {
   const userModel = sequelize.define('users', {
     email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
        username: { type: DataTypes.STRING, unique: true, allowNull: false, required: true },
        password: { type: DataTypes.STRING, allowNull: false, required: true },
        role: { type: DataTypes.ENUM('manager', 'employee', 'client'), allowNull:true, defaultValue: 'client' },
        token: {
            type: DataTypes.VIRTUAL, get() {
                return jwt.sign({ email: this.email,username:this.username,capabilities:this.capabilities }, SECRET);
            },
            set(tokenObj) {
                let token = jwt.sign(tokenObj, SECRET);
                return token;
            }
        },
        capabilities: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    'manager': ['read', 'write', 'delete', 'update'],
                    'employee': ['read', 'write', 'update'],
                    'client': ['read','write']
                }
                return acl[this.role];

            },
        },
      

    });


    userModel.beforeCreate(async (user) => {
        let hashedPass = await bcrypt.hash(user.password, 10);
        user.password = hashedPass;
      });
      userModel.BasicAuth = async function (email, password) {
        const user = await this.findOne({ where: { email } });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) { return user; }
        throw new Error('Invalid User');
      };
        
      userModel.authToken = async function (token) {
        try {
          const parsedToken = jwt.verify(token, SECRET);
          const user = this.findOne({where: { email: parsedToken.email } });
          if (user) { return user; }
          throw new Error("User Not Found");
        } catch (e) {
          throw new Error(e.message)
        }
      };

return userModel;

   }


module.exports = Users;
