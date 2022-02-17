import { initializeApp } from "firebase/app";
// require statement to avoid typecheck errors
const {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  getDocs,
  collection,
} = require("firebase/firestore");
import firebaseConfig from "./firebaseConfig";
import login from "./login";
import ErrorResult from "../types/error";

class Database {
  db: any;
  user: any;

  constructor() {
    // Initialize Firestore
    initializeApp(firebaseConfig);
    this.db = getFirestore();
  }

  async loginUser() {
    this.user = await login();
  }

  async find(collectionName: string, id: string, converter: any): Promise<any> {
    try {
      !this.user && (await this.loginUser());
      const docRef = doc(this.db, collectionName, id).withConverter(converter);
      const docSnap = await getDoc(docRef);

      return docSnap.data();
    } catch (error) {
      console.log(error);
      throw new ErrorResult(
        500,
        `Failed getting document from ${collectionName}`
      );
    }
  }

  async list(collectionName: string, converter: any): Promise<any> {
    try {
      !this.user && (await this.loginUser());
      const collectionRef = collection(this.db, collectionName).withConverter(
        converter
      );
      const querySnapshot = await getDocs(collectionRef);

      return querySnapshot.docs.map((doc: any) => doc.data());
    } catch (error) {
      console.error(error);
      throw new ErrorResult(
        500,
        `Failed getting documents in ${collectionName}`
      );
    }
  }

  async create(
    collectionName: string,
    data: any,
    converter: any
  ): Promise<any> {
    try {
      !this.user && (await this.loginUser());
      const docRef = await addDoc(
        collection(this.db, collectionName).withConverter(converter),
        data
      );
      const snapshot = await getDoc(docRef);

      return snapshot.data();
    } catch (error) {
      console.error(error);
      throw new ErrorResult(
        500,
        `Failed to create document in ${collectionName}`
      );
    }
  }

  async update(collectionName: string, id: string, data: any): Promise<any> {
    try {
      !this.user && (await this.loginUser());
      const updateRef = await updateDoc(
        collection(this.db, collectionName, id),
        data
      );

      const snapshot = await getDoc(updateRef);
      return snapshot.data();
    } catch (error) {
      console.error(error);
      throw new ErrorResult(
        500,
        `Failed to update document in ${collectionName}`
      );
    }
  }
}

export default new Database();
export { Database };
