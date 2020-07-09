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
    aggiungiPreferito() {
        // FUNZIONE PER SALVARE IL PREFERITO NEL DB
        return db
        .collection('preferiti')
        .doc()
        .set();
    },

    prelevaPreferito(){ // Salvo in array tutti i preferiti che sono presenti sul database
        return db
        .collection('preferiti')
        .get().then((data) => {
            let arrayPreferiti = [];
            data.forEach(doc => {
                arrayPreferiti.push(doc.data().nome);    // metto ogni preferito trovato nel array
            });
            return {
                arrayPreferiti: arrayPreferiti
            }
        });
    },

    rimuoviPreferito(doc) { // FUNZIONE PER ELIMINARE IL PREFERITO DAL DB
        db
        .collection('preferiti')
        .doc(doc)
        .delete();
        return true;

    }
}