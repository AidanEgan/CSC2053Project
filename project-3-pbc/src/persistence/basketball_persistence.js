import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {firebaseApp} from './firebase_app';
import { OnStreamUpdate, SubscriptionGenerator, Unsubscriber } from "./subscription_generator";
import {toDatabaseDocList} from "./persistence.utls";
import { DatabaseDocument } from "./persisted_object";
import ActionResult from "../model/action_result";
import ActionResultVoid from "../model/action_result_void";

export default class BasketballPersistence {
    constructor () {}

    static sharedInstance = new BasketballPersistence(); 

    static instance () {
        return this.sharedInstance; 
    }

    getBasketballSubscriptionGenerator () {
        return (onStreamUpdate ) => {
            return {
                unsubscribe: firebaseApp.firestore().collection("basketball_players1")
                    .onSnapshot((snapshot) => {
                        console.log("we received docs from firestore");
                        onStreamUpdate(toDatabaseDocList(snapshot));
                    }, (error) => {
                        onStreamUpdate([]);
                    }),
            }
        };
    }

}