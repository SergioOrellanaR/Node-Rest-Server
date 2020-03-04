//==========================================
//  Puerto de proceso de Node
//==========================================

process.env.PORT = process.env.PORT || 3000;

//==========================================
//  Entorno
//==========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//==========================================
//  Database
//==========================================

const mongooseDbport = 27017;
let urlDB;

const user = 'serorellanar';
const pass = 'lnjzFzmWJ4KjGh08';
const cluster = 'orellanacluster-599jo.mongodb.net/cafe';

urlDB = `mongodb+srv://${user}:${pass}@${cluster}`;


if (process.env.NODE_ENV === 'dev')
{
    urlDB = `mongodb://localhost:${mongooseDbport}/cafe`;
}
else
{
    //Reemplaza esta variable por tu connectionString de atlas
    //urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;