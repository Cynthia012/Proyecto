const modelUbicacion = require('./modelo');


const ctrlUbicacion = {
    sendUbication: async(req, res) => {
        const { user, lat, long } = req.body;
        res.json(await modelUbicacion.sendUbication(user,lat,long));
    },
    getUbications: async(req, res) => {
        const { lat, long } = req.body;
        res.json(await modelUbicacion.getUbications(lat,long));
    }

}
module.exports = ctrlUbicacion;
