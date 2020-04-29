import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {firebaseApp} from './firebase_app';
import { OnStreamUpdate, SubscriptionGenerator, Unsubscriber } from "./subscription_generator";
import {toDatabaseDocList} from "./persistence.utls";
import { DatabaseDocument } from "./persisted_object";
import ActionResult from "../model/action_result";
import ActionResultVoid from "../model/action_result_void";

export default class PitcherPersistence {
    constructor () {}

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