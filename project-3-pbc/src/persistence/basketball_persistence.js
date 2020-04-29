import "firebase/auth";
import "firebase/firestore";
import {firebaseApp} from './firebase_app';
import {toDatabaseDocList} from "./persistence.utls";

export default class BasketballPersistence {

    static sharedInstance = new BasketballPersistence();

    static instance () {
        return this.sharedInstance;
    }

    getBasketballSubscriptionGenerator () {
        return (onStreamUpdate ) => {
            return {
                unsubscribe: firebaseApp.firestore().collection("basketball_players")
                    .onSnapshot((snapshot) => {
                        onStreamUpdate(toDatabaseDocList(snapshot));
                    }, (error) => {
                        onStreamUpdate([]);
                    }),
            }
        };
    }

}
