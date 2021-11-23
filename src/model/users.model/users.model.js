'use strict';
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secret';

const Users = (sequelize, DataTypes) => {
    const usersmodel = sequelize.define('users', {
        email: { type: DataTypes.STRING, allowNull: false, required: true },
        password: { type: DataTypes.STRING, allowNull: false, required: true },
        role: { type: DataTypes.ENUM('manager', 'employee', 'client'), allowNull: false, defaultvalue: 'client' },
        token: {
            type: DataTypes.VIRTUAL, get() {
                return jwt.sign({ email: this.email }, SECRET);
            },
            set(tokenObj) {
                let token = jwt.sign(tokenObj, SECRET);
                return token;
            }
        },
        capabilties: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    'manager': ['read', 'write', 'delete', 'update'],
                    'employee': ['read', 'write', 'update'],
                    'client': ['read']
                }
                return acl[this.role];

            },
        },
        username: { type: DataTypes.STRING, unique: true, allowNull: false, required: false },
        lastname: { type: DataTypes.STRING, allowNull: false, required: false },
        phone: { type: DataTypes.STRING, allowNull: false, required: false }

    });


        usersmodel.beforCreate(async (user) => {
        let hash = await bycrypt.hash(user.password, 10);
        user.password = hash;})

        usersmodel.basicAuth(async (user, password) => {
       const userObj = await usersmodel.findOne({ where: { email: user } });
       const valid = await bycrypt.compare(password, userObj.password);
       if (valid) {
           return userObj;
       }
       throw new Error('Invalid credentials');
       
    });
    
    usersmodel.authToken(async (token) => {
   try{
  const decoded = jwt.verify(token, SECRET);
  const user = await usersmodel.findOne({ where: { email: decoded.email } });
    return user;

    }catch(err){
        throw new Error('Invalid token');
    }   

    });


return usersmodel;

   }


module.exports = Users;
