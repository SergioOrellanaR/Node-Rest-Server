//==========================================
//  Puerto de proceso de Node
//==========================================

process.env.PORT = process.env.PORT || 3000;

//==========================================
//  Entorno
//==========================================

//Setear entorno segun variable de entorno de servidor.
process.env.NODE_ENV = process.env.USERNAME === 'Sergio Orellana' ? 'dev' : 'prod';

//==========================================
//  Vencimiento de token
//==========================================

//Expires in 60 segundos * 60 minutos * 24 hrs * 30 dias
process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;

//==========================================
//  Seed de Autenticación
//==========================================

//Guardar SEED como variable de entorno
process.env.SEED = process.env.SEED || 'secretito-DEV';


//==========================================
//  Database
//==========================================

const mongooseDbport = 27017;
let urlDB;




