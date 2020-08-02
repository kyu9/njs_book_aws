require('dotenv').config();

module.exports={
    development: {
        username: process.env.DB_NAME,
        password: process.env.DB_PW,
        database: "mywork",
        host: process.env.DB_HOST,
        dialect: "mysql",
        operatorsAliases: false
    },
    production: {
        username: process.env.RDS_NAME,
        password: process.env.RDS_PW,
        database: "mytest",
        host: process.env.RDS_HOST,
        dialect: "mysql"
    }
}