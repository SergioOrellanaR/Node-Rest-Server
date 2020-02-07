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
    // const user = 'YOUR_USER_HERE';
    // const pass = 'YOUR_PASS_HERE';
    // const cluster = 'YOUR_CLUSTER_INFORMATION_HERE'

    const user = 'serorellanar';
    const pass = 'lnjzFzmWJ4KjGh08';
    const cluster = 'orellanacluster-599jo.mongodb.net/cafe';

    urlDB = `mongodb+srv://${user}:${pass}@${cluster}`;
}

process.env.URLDB = urlDB;