import express from 'express';
import mysql from 'mysql';

export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'personal_project'
})

