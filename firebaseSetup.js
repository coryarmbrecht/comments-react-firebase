import * as firebase from "firebase";
import firebaseconfig from './firebaseconfig.js'

const FbApp = firebase.initializeApp(firebaseconfig);
	const auth = firebase.auth()
	//const database = firebase.database().ref('skateparks')
	const database = firebase.database()
	const storage = firebase.storage()

export default FbApp
export const FbAppDB = database
export const FbAppAuth = auth
export const FbAppStorage = storage
