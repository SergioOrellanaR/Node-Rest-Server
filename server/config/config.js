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


if (process.env.NODE_ENV === 'dev')
{
    urlDB = `mongodb://localhost:${mongooseDbport}/cafe`;
}
else
{
    //Reemplaza esta variable por tu connectionString de atlas
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;