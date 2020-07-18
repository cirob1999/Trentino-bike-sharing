import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBKaRt9pui0-F8qsQpL33EotDL8H0XZdpM",
    authDomain: "trentino-bike-sharing.firebaseapp.com",
    projectId: "trentino-bike-sharing"
});

var db = firebase.firestore();

export default {
    name: 'DataService',

    aggiungiPreferito(preferito) {
        // FUNZIONE PER SALVARE IL PREFERITO NEL DB
        return db
            .collection('preferiti')
            .add({
                nome: preferito.name,
                città: preferito.city,
                id: preferito.id
            });
    },

    getPreferito() { // Salvo in array tutti i preferiti che sono presenti sul database
        return db
            .collection('preferiti')
            .get().then((data) => {
                let arrayPreferiti = [];
                data.forEach(doc => {
                    arrayPreferiti.push(doc.data()); // metto ogni preferito (doc) trovato all'interno dell' array
                });

                return arrayPreferiti;
            });
    },

    rimuoviPreferito(id) { // FUNZIONE PER ELIMINARE IL PREFERITO DAL DB
        return db.collection("preferiti")
            .where("id", "==", id)
            .get()
            .then(results => {
                results.forEach(doc => {
                    return db.collection("preferiti").doc(doc.id).delete();
                });
            });
    },
    
      
      
}