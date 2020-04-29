import "firebase/auth";
import "firebase/firestore";
import {firebaseApp} from './firebase_app';
import {toDatabaseDocList} from "./persistence.utls";

export default class HitterPersistence {
  
    static sharedInstance = new HitterPersistence();

    static instance() {
        return this.sharedInstance;
    }

    getHitterSubscriptionGenerator () {
        return (onStreamUpdate ) => {
            return {
                unsubscribe: firebaseApp.firestore().collection("baseball_hitters")
                    .onSnapshot((snapshot) => {
                        onStreamUpdate(toDatabaseDocList(snapshot));
                    }, (error) => {
                        onStreamUpdate([]);
                    }),
            }
        };
    }

}
