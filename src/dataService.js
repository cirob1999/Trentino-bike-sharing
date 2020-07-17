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
        //let nomeDoc = preferito.name + "-" + preferito.id;

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
                    arrayPreferiti.push(doc.data().nome); // metto ogni preferito trovato nel array
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
    switchPreferiti(){
        this.preferiti = !this.preferiti
        if (this.preferiti){
          console.log("STO IMPOSTANDO UN PREFERITO");
          let preferito = {'city': this.city, 'name':this.data.name, 'id': this.data.id};

          console.log(preferito);

          this.aggiungiPreferito(preferito);
        }else{
          console.log("STO RIMUOVENDO UN PREFERITO");
          this.rimuoviPreferito(this.data.id);
        }
      }
      
      checkIfPreferito(){
        if (this.data == null){
          return false;
        }
        //ho usato la funzione getPreferito e ho salvato l'outuput nella nuova variabile tuttiPreferiti
        this.getPreferito().then(data =>{

          let tuttiPreferiti = data;

          let filterPreferiti = []; 
          filterPreferiti = tuttiPreferiti.find(a => a == this.data.name);
          //ecc..

          let trovato = false;

          if(filterPreferiti != undefined)
            trovato = true;
          
          this.preferiti = trovato;
        });
    
        
        // restituisce true o false, se filterPreferiti non è ne null ne empty, vuol dire che la stazione attuale è nei preferiti
      },
}