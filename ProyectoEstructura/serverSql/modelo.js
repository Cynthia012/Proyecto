//conection BD
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bdredes'
}); 
connection.connect();

const modelUbicacion = {
    sendUbication(user, lat, long, img){
     return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ubicacion VALUES (null,"${user}","${lat}","${long}","${img}")`, 
        function(error, results){
                resolve('OK');
                console.log('dsfsd');
                return ({success: true,results});
        })
      });
    },
    getUbications( lat, long){
        console.log((parseFloat(lat,10)+1)+" "+(parseFloat(long,10)+1));
        console.log(lat+" "+long);
        console.log(`SELECT * FROM ubicacion WHERE cast(latitud as DECIMAL(10,7)) < (${parseFloat(lat,10)+0.1}) AND cast(longitud as DECIMAL(10,7)) > (${parseFloat(long,10)-0.1}) AND cast(latitud as DECIMAL(10,7)) > (${parseFloat(lat,10)}) AND cast(longitud as DECIMAL(10,7)) < (${parseFloat(long,10)}) `);

     return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ubicacion WHERE cast(latitud as DECIMAL(10,7)) < (${parseFloat(lat,10)+0.1}) AND cast(longitud as DECIMAL(10,7)) > (${parseFloat(long,10)-0.1}) AND cast(latitud as DECIMAL(10,7)) > (${parseFloat(lat,10)}) AND cast(longitud as DECIMAL(10,7)) < (${parseFloat(long,10)}) `, 
        function(error, results){
                //SELECT * FROM ubicacion WHERE cast(latitud as signed) < (21.928821600000003+20) AND cast(longitud as signed) < (-102.28530920000001-20)
                console.log(results);
                resolve(results);
                return ({success: true,results});
        })
      });
    }
}

module.exports = modelUbicacion;