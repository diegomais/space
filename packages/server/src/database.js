const { Sequelize, DataTypes } = require('sequelize')

const database = process.env.DATABASE_NAME || 'space'
const host = process.env.DATABASE_HOST || 'localhost'
const password = process.env.DATABASE_PASSWORD || 'docker'
const port = process.env.DATABASE_PORT || 5432
const user = process.env.DATABASE_USER || 'postgres'

module.exports.createStore = () => {
  const db = new Sequelize(database, user, password, {
    dialect: 'postgres',
    host,
    logging: false,
    port
  })

  const users = db.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    email: DataTypes.STRING,
    token: DataTypes.STRING
  })

  const trips = db.define('trip', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    launchId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  })

  db.sync()

  return { users, trips }
}
