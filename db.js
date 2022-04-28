const db = require('mongoose');

async function connect(url){
    try{
        await db.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexion correcta uwu');
    } catch (err) {
        console.log('eror eror eror');
    }
}

module.exports = connect;