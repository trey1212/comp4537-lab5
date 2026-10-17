const mysql = require("mysql2/promise")
const msg = require('./messages.js')

/**
 * Manages data queries to interact with the database
 */
class DatabaseManager {
    /**
     * DatabaseManager constructor
     * @param {*} adminConfig - checks if the event is from an admin
     * @param {*} readerConfig - checks if the event is from a reader
     */
    constructor(adminConfig, readerConfig) {
        this.adminConfig = adminConfig;
        this.readerConfig = readerConfig;
        this.msg = msg;
    }

    // Creates the patient table and inserts data into it (admin privileges)
    async createRecords() {
        const connection = await mysql.createConnection(this.adminConfig);

        const createPatientTable = `
            CREATE TABLE IF NOT EXISTS patient (
                patientID INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                dateOfBirth DATE NOT NULL
            ) ENGINE=InnoDB;
        `;
        await connection.query(createPatientTable)

        const insertPatientData = `
            INSERT INTO patient (name, dateOfBirth) VALUES 
            ('Sara Brown', '1990-01-01'),
            ('John Smith', '1941-01-01'),
            ('Jack Ma', '1961-01-30'),
            ('Elon Musk', '1990-01-01');
        `;
        await connection.query(insertPatientData);

        await connection.end();
        return msg.POST_SUCCESS;
    }

    // Gets the data of desired patient (reader and up privileges)
    async runReaderQuery(sqlString) {
        const connection = await mysql.createConnection(this.readerConfig);
        
        const [rows] = await connection.query(sqlString); 
        
        await connection.end();
        return rows;
    }
}

module.exports = DatabaseManager;