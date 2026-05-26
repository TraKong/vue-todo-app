import { db } from "../services/firebase_sdk";
import { collection, addDoc } from "firebase/firestore"; 

let newTodo : {
    title       : string,
    isFav       : boolean,
    isCompleted : boolean
}

export const addNewTodo = async (title:string)=> {
    newTodo = {
        title       : title,
        isFav       : false,
        isCompleted : false
    }
    
    const docRef = await addDoc(collection(db, "todos"), {
        title       : newTodo.title,
        isFav       : newTodo.isFav,
        isCompleted : newTodo.isCompleted
    });
}