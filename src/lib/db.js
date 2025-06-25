require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
);

const VoterRegistrationDeadline = sequelize.define(
  "VoterRegistrationDeadline",
  {
    State: { type: DataTypes.STRING, primaryKey: true },
    DeadlineInPerson: DataTypes.STRING,
    DeadlineByMail: DataTypes.STRING,
    DeadlineOnline: DataTypes.STRING,
    ElectionDayRegistration: DataTypes.STRING,
    OnlineRegistrationLink: DataTypes.STRING,
    Description: DataTypes.STRING,
  },
  {
    tableName: "voter_registration_deadlines",
    timestamps: false,
  }
);

module.exports = { sequelize, VoterRegistrationDeadline };
