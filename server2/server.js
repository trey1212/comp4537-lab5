const http = require('http');
const url = require('url');
const DB_CONFIG = require('./config.js');
const DatabaseManager = require('./Database.js');
const msg = require('./messages.js');

/**
 * Routes all the APIs to their respective endpoints
 */
class Router {
    constructor(dbManager) {
        this.dbManager = dbManager;
        this.msg = msg;
    }

    /**
     * Handles CORS and routes API its respective method
     * @param {*} req - request being handled
     * @param {*} res - response of the request
     * @returns POST or GET results, otherwise a not found message
     */
    async routeRequest(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return;
        }

        const parsedUrl = url.parse(req.url, true);

        if (req.method === 'POST' && parsedUrl.pathname === '/api/v1/sql/') {
            await this.handlePost(req, res);
        } 
        else if (req.method === 'GET' && parsedUrl.pathname.startsWith('/api/v1/sql/')) {
            await this.handleGet(req, res, parsedUrl);
        } 
        else {
            this.handleNotFound(res);
        }
    }

    /**
     * Handles POST requests
     * @param {*} req - the request being handled
     * @param {*} res - the response of the request
     */
    async handlePost(req, res) {
        try {
            const result = await this.dbManager.createRecords();
            this.sendResponse(res, 200, result);
        } catch (error) {
            this.sendResponse(res, 500, "Real Error: " + error.message);
        }
    }

    /**
     * Handles GET requests
     * @param {} req - the request being handled
     * @param {*} res - the response of the request
     * @param {*} parsedUrl - the URL being parsed
     */
    async handleGet(req, res, parsedUrl) {
        try {
            let sqlString = decodeURIComponent(parsedUrl.pathname.replace('/api/v1/sql/', ''));
            if (sqlString.startsWith('"') && sqlString.endsWith('"')) {
                sqlString = sqlString.slice(1, -1);
            }

            const rows = await this.dbManager.runReaderQuery(sqlString);
            this.sendResponse(res, 200, rows);
        } catch (error) {
            this.sendResponse(res, 400, "Real Error: " + error.message);
        }
    }

    /**
     * Handles any 404 errors
     * @param {*} res - response of the error
     */
    handleNotFound(res) {
        this.sendResponse(res, 404, msg.NOT_FOUND);
    }

    /**
     * Helper method to print the response message
     * @param {*} res 
     * @param {*} statusCode 
     * @param {*} data 
     */
    sendResponse(res, statusCode, data) {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }
}

const dbManager = new DatabaseManager(DB_CONFIG.admin, DB_CONFIG.reader);
const router = new Router(dbManager);

const server = http.createServer((req, res) => {
    router.routeRequest(req, res);
});

server.listen(DB_CONFIG.port, () => {
    console.log(`${msg.SERVER_RUNNING} ${DB_CONFIG.port}`);
});
