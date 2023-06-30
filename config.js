/* These two lines of code are importing the `initializeApp` and `getFirestore` functions from the
Firebase `app` and `firestore` modules, respectively. These functions are used to initialize and
configure a Firebase app and get a reference to the Firestore database associated with that app. */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/* `const firebaseConfig` is an object that contains the configuration information required to
initialize and connect to a Firebase app. It includes properties such as `apiKey`, `authDomain`,
`projectId`, `storageBucket`, `messagingSenderId`, and `appId`. These properties are used to
authenticate and connect to the Firebase app and its associated services, such as Firestore. */
const firebaseConfig = {
	apiKey: "AIzaSyDfEYdn0xMbLZ5hlZk18EBYjtwX02kiPlg",
	authDomain: "e---library-9a80c.firebaseapp.com",
	databaseURL: "https://e---library-9a80c-default-rtdb.firebaseio.com",
	projectId: "e---library-9a80c",
	storageBucket: "e---library-9a80c.appspot.com",
	messagingSenderId: "389305408821",
	appId: "1:389305408821:web:a63278598261faffd3007c"
  };
// Initialize Firebase
/* These two lines of code are initializing and configuring the Firebase app with the provided
`firebaseConfig` object and then getting a reference to the Firestore database associated with that
app. The `initializeApp` function initializes the Firebase app with the provided configuration, and
the `getFirestore` function returns a reference to the Firestore database associated with that app.
The `db` constant is then set to this reference, which can be used to interact with the Firestore
database in the rest of the code. */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* `export default db;` is exporting the `db` object as the default export of the module. This means
that when another module imports this module, they can access the `db` object by simply importing
the module and using it as the default export. For example, `import db from './firebase';` would
import the `db` object from this module. */
export default db;
