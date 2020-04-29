import "firebase/auth";
import "firebase/firestore";
import {firebaseApp} from './firebase_app';
import {toDatabaseDocList} from "./persistence.utls";

export default class HockeyPersistence {
    
    static sharedInstance = new HockeyPersistence();

    static instance() {
        return this.sharedInstance;
    }

    getHockeySubscriptionGenerator () {
        return (onStreamUpdate ) => {
            return {
                unsubscribe: firebaseApp.firestore().collection("hockey_players")
                    .onSnapshot((snapshot) => {
                        onStreamUpdate(toDatabaseDocList(snapshot));
                    }, (error) => {
                        onStreamUpdate([]);
                    }),
            }
        };
    }

}
