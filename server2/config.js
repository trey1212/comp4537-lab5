const DB_CONFIG = {
    // Privileged account that can INSERT patient records
    admin: {
        host: 'localhost',
        user: 'admin',       
        password: 'admin_password123',
        database: 'lab5_clinic'
    },
    // Readonly account that can SELECT patient records
    reader: {
        host: 'localhost',
        user: 'reader',      
        password: 'reader_password123',
        database: 'lab5_clinic'
    },
    port: 8080
};

module.exports = DB_CONFIG;