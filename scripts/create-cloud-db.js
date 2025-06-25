require('dotenv').config();
const fs = require("fs");
const csv = require("csv-parser");
const { Sequelize, DataTypes } = require("sequelize");

// Use env var or hardcoded string (but don't use process.DATABASE_URL directly)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // needed for Railway SSL
      },
    },
  });

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

async function importCSV() {
  try {
    await sequelize.authenticate();
    await VoterRegistrationDeadline.sync();

    const records = [];

    fs.createReadStream("voter_registration_deadlines.csv")
      .pipe(csv())
      .on("data", (row) => {
        records.push({
          State: row["State"],
          DeadlineInPerson: row["Registration Deadline In-Person"],
          DeadlineByMail: row["Registration Deadline By Mail"],
          DeadlineOnline: row["Registration Deadline Online"],
          ElectionDayRegistration: row["Election Day Registration"],
          OnlineRegistrationLink: row["Online Registration Link"],
          Description: row["Description"],
        });
      })
      .on("end", async () => {
        for (const record of records) {
          await VoterRegistrationDeadline.upsert(record);
        }
        console.log("✅ Data imported successfully.");
        await sequelize.close();
      });
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    await sequelize.close();
  }
}

importCSV();
