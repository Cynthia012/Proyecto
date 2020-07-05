const nodemailer = require('nodemailer');
const firebase = require('firebase/app');
require('firebase/database');
const firebaseConfig = {
    apiKey: "AIzaSyBkRw4G5HvvRUBYB4jMvpRTDNKkN_jAwYI",
    authDomain: "thefeeuaa.firebaseapp.com",
    databaseURL: "https://thefeeuaa.firebaseio.com",
    projectId: "thefeeuaa",
    storageBucket: "thefeeuaa.appspot.com",
    messagingSenderId: "178469236768",
    appId: "1:178469236768:web:67a178f56a6f5476dc0c45",
    measurementId: "G-DZFYYRZ6Z1"
}

firebase.initializeApp(firebaseConfig);

const quejas = [];


const modelDatos = {
    getAdmin(id) {
        //return new Promise((resolve, reject) => {
        if (id !== 'marksuckerberg69')
            return ({ message: "101" });
        else
            return ({ message: "OK" });
        //});
    },
    addUser(nombre, foto, fecha, uid) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('users/' + uid).set({
                nombre: nombre,
                fotoURL: foto,
                fecha: fecha
            }).then(() => {
                resolve({
                    succed: true
                });
                return ({
                    succed: true
                });
            }).catch((err) => {
                return ({
                    succed: false,
                    error: err
                });
            });
        });
    },
    addPost(uid, autor, mensaje, categoria, fecha) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('categorias/' + categoria).push().set({
                autor: autor,
                mensaje: mensaje,
                fecha: fecha,
                id: uid
            }).then(() => {
                firebase.database().ref('users/' + uid + '/posts/').push().set({
                    autor: autor,
                    mensaje: mensaje,
                    fecha: fecha,
                    categoria: categoria,
                    id: uid
                }).then(() => {
                    resolve({
                        succed: true
                    });
                    return ({
                        succed: true
                    });
                }).catch((err) => {
                    return ({
                        succed2: false,
                        error: err
                    });
                });
                return ({
                    succed: false
                })
            }).catch((err) => {
                return ({
                    succed1: false,
                    error: err
                });
            });
        });
    },
    getPosts(categoria) {
        return new Promise((resolve, reject) => {
            let auxPosts;
            let arrayPosts = [];
            firebase.database().ref('categorias/' + categoria).once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    arrayPosts = [];
                    auxPosts = snapshot.val();
                    for (const post in auxPosts) {
                        if (auxPosts.hasOwnProperty(post)) {
                            const element = auxPosts[post];
                            arrayPosts.push({
                                autor: element.autor,
                                fecha: element.fecha,
                                mensaje: element.mensaje,
                                id: element.id,
                                idPost: post
                            });
                        }
                    }
                    resolve({
                        succed: true,
                        posts: arrayPosts
                    });
                    return ({
                        succed: true,
                        posts: arrayPosts
                    });
                }
                else {
                    resolve({
                        succed: true,
                        posts: arrayPosts,
                        message: 'no hay posts'
                    });
                    return ({
                        succed: true,
                        posts: arrayPosts,
                        message: 'no hay posts'
                    });
                }
            }).catch((err) => {
                return ({
                    succed: false,
                    error: err
                });
            });
        });
    },

    getMyPosts(uid) {
        return new Promise((resolve, reject) => {
            let auxPosts;
            let arrayPosts = [];
            firebase.database().ref('users/' + uid + '/posts/').once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    arrayPosts = [];
                    auxPosts = snapshot.val();
                    for (const post in auxPosts) {
                        if (auxPosts.hasOwnProperty(post)) {
                            const element = auxPosts[post];
                            console.log('post', post);
                            arrayPosts.push({
                                autor: element.autor,
                                id: element.id,
                                fecha: element.fecha,
                                mensaje: element.mensaje,
                                categoria: element.categoria,
                                postId: post
                            });
                        }
                    }
                    resolve({
                        succed: true,
                        posts: arrayPosts
                    });
                    return ({
                        succed: true,
                        posts: arrayPosts
                    });
                }
                else {
                    resolve({
                        succed: true,
                        posts: arrayPosts,
                        message: 'no hay posts'
                    });
                    return ({
                        succed: true,
                        posts: arrayPosts,
                        message: 'no hay posts'
                    });
                }
            }).catch((err) => {
                return ({
                    succed: false,
                    error: err
                });
            });
        });
    },
    sendMessage(uid, origen, fecha, mensaje) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('users/' + uid + '/mensajes').push().set({
                origen: origen,
                fecha: fecha,
                mensaje: mensaje
            }).then(() => {
                resolve({
                    succed: true
                });
                return ({
                    succed: true
                });
            }).catch((err) => {
                return ({
                    succed: false,
                    error: err
                });
            });
        });
    },
    getMessages(uid) {
        return new Promise((resolve, reject) => {
            let auxMessage;
            let arrayMessages = [];
            firebase.database().ref('users/' + uid + '/mensajes/').once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    arrayMessages = [];
                    auxMessage = snapshot.val();
                    for (const m in auxMessage) {
                        if (auxMessage.hasOwnProperty(m)) {
                            const element = auxMessage[m];
                            arrayMessages.push({
                                fecha: element.fecha,
                                mensaje: element.mensaje,
                                origen: element.origen
                            });
                        }
                    }
                    resolve({
                        succed: true,
                        mensajes: arrayMessages
                    });
                    return ({
                        succed: true,
                        mensajes: arrayMessages
                    });
                }
                else {
                    resolve({
                        succed: true,
                        mensajes: arrayMessages,
                        message: 'no hay posts'
                    });
                    return ({
                        succed: true,
                        mensajes: arrayMessages,
                        message: 'no hay posts'
                    });
                }
            }).catch((err) => {
                return ({
                    succed: false,
                    error: err
                });
            });
        });
    },
    deletePost(idPost, categoria, idPost2, idAutor) {
        return new Promise((resolve, reject) => {
            var newData = null;
            var updates = {};
            updates['/categorias/' + categoria + '/' + idPost2] = newData;
            firebase.database().ref().update(updates).then(() => {
                updates['/users/' + idAutor + '/posts/' + idPost] = newData;
                firebase.database().ref().update(updates).then(() => {
                    resolve({ success: true });
                    return ({ success: true });
                }).catch((err) => {
                    return ({ success: false, error: err });
                });
                return ({ success: false });
            }).catch((err) => {
                return ({ success: false, error: err });
            });
        });
    },
    editPost(idPost, categoria, text, fecha, idAutor, nameAutor, idPost2) {
        return new Promise((resolve, reject) => {
            var newData = {
                id: idAutor,
                autor: nameAutor,
                fecha: fecha,
                mensaje: text
            }
            var updates = {};
            updates['/categorias/' + categoria + '/' + idPost2] = newData;
            firebase.database().ref().update(updates).then(() => {
                newData = {
                    id: idAutor,
                    autor: nameAutor,
                    fecha: fecha,
                    mensaje: text,
                    categoria: categoria
                }
                updates['/users/' + idAutor + '/posts/' + idPost] = newData;
                firebase.database().ref().update(updates).then(() => {
                    resolve({ success: true });
                    return ({ success: true });
                }).catch((err) => {
                    return ({ success: false, error: err });
                });
                return ({ success: false });
            }).catch((err) => {
                return ({ success: false, error: err });
            });
        });
    },
    sendMail(user, queja) {
        return new Promise((resolve, reject) => {
            quejas.push({ 'usuario': user, 'queja': queja });
            var transporter = nodemailer.createTransport({
                service: 'gmail', //al usar un servicio bien conocido, no es necesario proveer un nombre de servidor.
                auth: {
                    user: 'surloquendo16@gmail.com',
                    pass: 'la kioshi 7'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            var mailOptions = {
                from: 'surloquendo16@gmail.com',
                to: 'surloquendo16@gmail.com',
                subject: user,
                text: 'Queja de ' + user + ': ' + queja
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return ({ res: 'NOT OK' });
                } else {
                    resolve({ res: 'OK' });
                    return ({ res: 'OK' });
                }
            });

        });
    },
    getQuejas() {
        return quejas;
    },
    deleteQuejas() {
        return new Promise((resolve, reject) => {
            let l = quejas.length;
            for (let i = 0; i < l; i++) {
                quejas.pop();
            }
            resolve('OK');
            return ('OK');
        });
    },
    getAllPosts() {
        return new Promise((resolve, reject) => {
            let auxPosts;
            let arrayPosts = [];
            firebase.database().ref('categorias').once('value').then((snapshot) => {
                let all = snapshot.val();
                let respuesta = [];
                let i = 1;
                for (let cat in all) {
                    let j = 0;
                    for (let post in all[cat]) {
                        j++;
                    }
                    respuesta.push({ desc: cat, x: i++, y: j });
                }


                firebase.database().ref('users').once('value').then((snapshot2) => {
                    let all2 = snapshot2.val();
                    let fechas = [];

                    let i = 1;
                    let aux_fecha = '';
                    for (let user in all2) {
                        aux_fecha = all2[user]['fecha'];

                        i = 0;
                        for (let user2 in all2) {
                            if (all2[user]['fecha'] === all2[user2]['fecha'])
                                i++;
                        }
                        fechas.push({ date: new Date(all2[user]['fecha']), users: i });
                    }


                    sortedFechas = fechas.slice().sort((a, b) => a.date - b.date);

                    fechas = sortedFechas;
                    var newarr = [];
                    newarr.push(sortedFechas[0]);
                    for (let i = 1; i < sortedFechas.length; i++) {
                        if (sortedFechas[i].date.getTime() !== sortedFechas[i - 1].date.getTime())
                            newarr.push(sortedFechas[i]);
                    }
                    sortedFechas = newarr;
                    aux = [];

                    for (let i = 0; i < sortedFechas.length - 1; i++) {
                        aux1 = sortedFechas[i];
                        aux2 = sortedFechas[i + 1];

                        if (aux1.date.getTime() + (24 * 60 * 60 * 1000) !== aux2.date.getTime()) {
                            aux.push({ date: new Date(aux1.date.getTime() + (24 * 60 * 60 * 1000)), users: 0 });
                        }
                    }
                    for (let i = 0; i < aux.length; i++)
                        sortedFechas.push(aux[i]);
                    sortedFechas.sort((a, b) => a.date - b.date);
                    for (let i = 1; i < sortedFechas.length; i++) {
                        sortedFechas[i].users += sortedFechas[i - 1].users;
                    }

                    resolve({
                        resp1: respuesta,
                        resp2: sortedFechas
                    });
                    return ({
                        resp1: respuesta,
                        resp2: sortedFechas
                    });
                }).catch((err) => {
                    return ({
                        succed: false,
                        error: err
                    });
                });
                return({success: false});
            }).catch((err) => {
                return ({
                    succed: false,
                    error: err
                });
            });
        });
    }
}

module.exports = modelDatos;