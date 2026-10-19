const DB_CONFIG = {
    // Privileged account that can INSERT patient records
    admin: {
        host: 'lab5-db.mysql.database.azure.com',
        user: 'admin',       
        password: process.env.ADMIN_PASSWORD,
        database: 'lab5_clinic',
        ssl: { rejectUnauthorized: false }
    },
    // Readonly account that can SELECT patient records
    reader: {
        host: 'lab5-db.mysql.database.azure.com',
        user: 'reader',      
        password: process.env.READER_PASSWORD,
        database: 'lab5_clinic',
        ssl: { rejectUnauthorized: false }
    },
    port: process.env.PORT || 8080
};

module.exports = DB_CONFIG;