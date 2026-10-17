const DB_CONFIG = {
    // Privileged account that can INSERT patient records
    admin: {
        host: 'localhost',
        user: 'clinic_admin',       
        password: 'admin_password123',
        database: 'lab5_clinic'
    },
    // Readonly account that can SELECT patient records
    user: {
        host: 'localhost',
        user: 'clinic_reader',      
        password: 'user_password123',
        database: 'lab5_clinic'
    },
    port: 8080
};

module.exports = DB_CONFIG;