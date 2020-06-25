const express = require('express');
const app = express();

const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

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
var cors = require('cors');
app.use(cors());

app.post('/getAdmin', (req, res) => {
  const { id } = req.query;
  if (id !== 'marksuckerberg69')
    res.send({ message: "101" });
  else
    res.send({ message: "OK" });

});

app.post('/addUser', (req, res) => {
  const { nombre, foto, fecha, uid } = req.body;
  console.log(req.body);
  console.log(`${nombre} ${foto} ${fecha} ${uid}`);
  firebase.database().ref('users/' + uid).set({
    nombre: nombre,
    fotoURL: foto,
    fecha: fecha
  }).then(() => {
    res.send({
      succed: true
    });
  }).catch((err) => {
    res.send({
      succed: false,
      error: err
    });
  });
});

app.post('/addPost', (req, res) => {
  const { uid, autor, mensaje, categoria, fecha } = req.body;

  firebase.database().ref('categorias/' + categoria).push().set({
    autor: autor,
    mensaje: mensaje,
    fecha: fecha
  }).then(() => {
    firebase.database().ref('users/' + uid + '/posts/').push().set({
      autor: autor,
      mensaje: mensaje,
      fecha: fecha,
      categoria: categoria
    }).then(() => {
      res.send({
        succed: true
      })
    }).catch((err) => {
      res.send({
        succed2: false,
        error: err
      });
    });
  }).catch((err) => {
    res.send({
      succed1: false,
      error: err
    });
  });

});

app.post('/getPosts', (req, res) => {
  let auxPosts;
  let arrayPosts = [];
  const { categoria } = req.body;
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
            mensaje: element.mensaje
          });
        }
      }
      res.send({
        succed: true,
        posts: arrayPosts
      });
    }
    else {
      res.send({
        succed: true,
        posts: arrayPosts,
        message: 'no hay posts'
      });
    }
  }).catch((err) => {
    res.send({
      succed: false,
      error: err
    });
  });
});

app.post('/getMyPosts', (req, res) => {
  let auxPosts;
  let arrayPosts = [];
  const { uid } = req.body;
  firebase.database().ref('users/' + uid + '/posts/').once('value').then((snapshot) => {
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
            categoria: element.categoria
          });
        }
      }
      res.send({
        succed: true,
        posts: arrayPosts
      });
    }
    else {
      res.send({
        succed: true,
        posts: arrayPosts,
        message: 'no hay posts'
      });
    }
  }).catch((err) => {
    res.send({
      succed: false,
      error: err
    });
  });
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});



app.listen('3000', function () {
  console.log('Servidor web escuchando en el puerto 3000');
});
