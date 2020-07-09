import axios from 'axios'
import firebase from 'firebase/app' 
import 'firebase/firestore'

   // Initialize Firebase
   firebase.initializeApp({
       apiKey: "AIzaSyBKaRt9pui0-F8qsQpL33EotDL8H0XZdpM",
       authDomain: "trentino-bike-sharing.firebaseapp.com",
       projectId: "trentino-bike-sharing"
   });

   var db = firebase.firestore();
   export default{
    savePreferito(station) {
        // FUNZIONE PER SALVARE IL PREFERITO NEL DB

        return db
        .collection('preferiti')
        .doc(nomeDoc)
        .set(city);
    },
    getFavorite(){ // Salvo in array tutti i giochi preferiti che sono presenti sul database

        return db
        .collection('preferiti')
        .get().then((data) => {

            let arrayPreferiti = [];

            data.forEach(doc => {

                arrayPreferiti.push(doc.data().nome);    // metto ogni gioco preferito trovato nel array
                
            });

            return {

                arrayPreferiti: arrayPreferiti

            }

        });
    },
    cancellaPreferito(doc) { // FUNZIONE PER ELIMINARE IL PREFERITO DAL DB

        db
        .collection('preferiti')
        .doc(doc)
        .delete();

        return true;

    }