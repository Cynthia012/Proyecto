import { MensajeService } from './../services/mensaje.service';
import { PostServiceService } from './../services/post-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import Speech from "speak-tts"; //importamos la librería
import * as firebase from 'firebase';
import swal from 'sweetalert2';
import { WindowsService } from '../windows.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  flagLoad = true;
  flagMensaje = false;
  flagVer = false;
  flagEdicion = false;
  flagFormPhone = false;
  flagConfirmPhone = false;
  myPosts: [] = [];
  mensajesList = [];
  fotoURL = '';
  idUser = '';
  usuario = '';
  selfUser = '';
  selfUserName= '';
  mensaje = '';
  lecFinal = ""; //variable en donde guardaremos lo que se va a leer al final
  speech: any;
  edicionValue = '';
  phone:any;
  confirmCode: any;
  phoneText:any;

  windowRefs: any;
  constructor(private route : ActivatedRoute,
              private router: Router,
              private afAuth: AngularFireAuth,
              private ngZone: NgZone,
              private postService: PostServiceService,
              private mensajeservice: MensajeService,
              private win: WindowsService) {
    this.afAuth.onAuthStateChanged((user) => {
      this.ngZone.run(() => {
        if (!user) {
          this.router.navigate(['theFee']);
        } else {
          this.phone = user.phoneNumber;
          this.selfUser = user.uid;
          this.selfUserName = user.displayName;
          this.route.params.subscribe(params => {
            this.usuario = params.autor
            this.idUser = params.id;
            console.log(params.id.nombre);
              
            console.log(this.idUser);

            this.postService.getMyPosts(this.idUser).subscribe((data: any) => {
              this.flagLoad = false;
              this.myPosts = data.posts;
              console.log(data.posts);
            });
          });
        }
          
        });
      });

       // lector de pantalla

    this.speech = new Speech(); //Ve si es soportado en nuestro navegador

    if (this.speech.hasBrowserSupport()) {
      //si es soportado en nuestro navegador entra
      console.log("speech synthesis supported");
      //inicializamos nuestro speech
      this.speech
        .init({
          volume: 1,
          lang: "es-MX",
          rate: 1,
          pitch: 1,
          voice: "Google UK English Male",
          splitSentences: true,
          listeners: {
            onvoiceschanged: (voices) => {
              console.log("Event voiceschanged", voices);
            },
          },
        })
        .then((data) => {
          //data contiene una lista de voces
          console.log("Speech está listo", data);
          data.voices.forEach((voice) => {
            
          });
        })
        .catch((e) => {
          console.error("Ocurrió un error al iniciar Speech: ", e);
        });
    } //fin if


}
  ngOnInit(): void {
  }
  enviarMensaje(){
    let fecha = new Date();
    this.mensajeservice.sendMessage(this.idUser,this.mensaje,fecha.toDateString(),this.selfUserName).subscribe((data) =>{
      if(data['succed']){
        swal.fire(
          'Mensaje enviado correctamente',
          'Felicidades',
          'success'
        );
        this.flagMensaje = false;
      }
    });

  }
  recuperarMensajes(){
    if(!this.flagVer){
      this.mensajeservice.getMessages(this.selfUser).subscribe((data) =>{
     this.mensajesList = data['mensajes'];
      this.flagVer = true;
     });
    }else{
      this.flagVer = false;
    }
  }

  // botones de lector
  play() {
    var textoLeer = document.createElement("div"); //guardamos lo que queremos que lea en la sig variable
    //guardamos lo que queremos que lea en la sig variable
    textoLeer.innerHTML = document.getElementById("esto").innerHTML;

    this.lecFinal = textoLeer.textContent || textoLeer.innerText || ""; //guardamos la posibilidad de lectura en la variable lecFinal

    this.speech
      .speak({
        text: this.lecFinal, //aqui es donde se realiza la lectura
      })
      .then(() => {
        console.log("Exito");
      })
      .catch((e) => {
        console.error("Ocurrió un error: ", e);
      });
  }

  pausa() {
    this.speech.pause();
  }

  continua() {
    this.speech.resume();
  }


  async eliminarPost(post:any){
    let c = await this.postService.deletePost(post);
    c.request.subscribe((data) => {console.log(data)});
    this.reloadPosts();
  }
  async editarPost(post:any){    
    this.flagEdicion = false;
      let c = await this.postService.editPost(post,this.edicionValue);
      c.request.subscribe((data) => {console.log(data)});
      this.reloadPosts();
      
    }
  reloadPosts(){
    this.postService.getMyPosts(this.idUser).subscribe((data: any) => {
      this.myPosts = data.posts;
    });    
  }
    addPhone(){

      this.windowRefs = this.win.windowRef;
      this.windowRefs.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      this.windowRefs.recaptchaVerifier
                  .render()
                  .then( widgetId => {this.windowRefs.recaptchaWidgetId = widgetId});


      firebase.auth().currentUser.linkWithPhoneNumber(this.phoneText, this.windowRefs.recaptchaVerifier)
      .then((confirmationResult) => {
        this.flagFormPhone = false;
        this.flagConfirmPhone = true;
        this.windowRefs.confirmationResult = confirmationResult;
      })
      .catch((error) => {
         swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Número incorrecto o en uso'
            })
          
        console.log("error");
      });
    }
    confirmPhone(){
        this.windowRefs.confirmationResult
        .confirm(this.confirmCode)//si es el codigo correcto
        .then( result => {//enconces entra
          console.log("OK");
          this.flagConfirmPhone = false;
        })
        .catch( error =>{ console.log(error, "Incorrect code entered?")
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Código incorrecto'
        })
      });// en caso de no es el cófigo correcto, manda error
      }
    }

