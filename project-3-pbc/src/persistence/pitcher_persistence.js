import "firebase/auth";
import "firebase/firestore";
import {firebaseApp} from './firebase_app';
import {toDatabaseDocList} from "./persistence.utls";

export default class PitcherPersistence {

    static sharedInstance = new PitcherPersistence();

    static instance() {
        return this.sharedInstance;
    }

    getPitcherSubscriptionGenerator () {
        return (onStreamUpdate ) => {
            return {
                unsubscribe: firebaseApp.firestore().collection("baseball_pitchers")
                    .onSnapshot((snapshot) => {
                        onStreamUpdate(toDatabaseDocList(snapshot));
                    }, (error) => {
                        onStreamUpdate([]);
                    }),
            }
        };
    }

}
