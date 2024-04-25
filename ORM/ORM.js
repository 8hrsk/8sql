require('dotenv').config();

const mysql = require('mysql');

Array.prototype.last = () => {
    return this[this.length - 1];
}

class ORM {

    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });

        this.statement = '';
        this.history = [];
    }

    connect() {
        this.connection.connect((error) => {
            if (error) throw error;
        });
    }

    table(tableName) {
        if (!tableName) {
            throw new Error('Table name is required');
        }

        this.table = tableName;
    }

    where(key, operator, value) {
        if (!key) {
            throw new Error('Key is required');
        }

        if (!operator) {
            throw new Error('Operator is required');
        }

        if (!value) {
            throw new Error('Value is required');
        }

        if (this.history.last === 'where') {
            this.statement += ' AND';
        }

        this.history.push('where');

        this.statement += ` WHERE ${key} ${operator} ${value}`;
    }

    get(what) {
        if (!what) {
            throw new Error('What is required');
        }

        this.select = what;
    }

    leftJoin(table, on, what) {
        if (!table) {
            throw new Error('Table is required');
        }

        if (!on) {
            throw new Error('On is required');
        }

        if (!what) {
            throw new Error('What is required');
        }
        
        

        this.statement += ` LEFT JOIN ${table} ON ${on} = ${what}`;
    }

}

module.exports = ORM;