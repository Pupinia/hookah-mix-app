import firebase from 'firebase';
import firestore from 'firebase/firestore';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDIr7SiQlT2KXxwIaZ2mnlMUNGWZ5KpBrE',
  authDomain: 'hookah-mixes-18eb3.firebaseapp.com',
  databaseURL: 'https://hookah-mixes-18eb3.firebaseio.com',
  projectId: 'hookah-mixes-18eb3',
  storageBucket: 'hookah-mixes-18eb3.appspot.com',
  messagingSenderId: '60690412600',
  appId: '1:60690412600:web:3b88174101b0c7ab'
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
