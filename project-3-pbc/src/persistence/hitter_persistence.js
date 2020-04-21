import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {firebaseApp} from './firebase_app';
import { OnStreamUpdate, SubscriptionGenerator, Unsubscriber } from "./subscription_generator";
import { toQueueDatatbaseDocList, toQueueDatatbaseDoc } from "./persistence_utls";
import { DatabaseDocument } from "./persisted_object";
import ActionResult from "../model/action_result";
import ActionResultVoid from "../model/action_result_void";

export default class HitterPersistence {
    constructor () {}

    static sharedInstance = new HitterPersistence(); 

    instance() {
        return this.sharedInstance; 
    }

    getHitterSubscriptionGenerator () {
        return (onStreamUpdate ) => {
            return {
                unsubscribe: firebaseApp.firestore().collection("Hitters")
                    .onSnapshot((snapshot) => {
                        onStreamUpdate(toQueueDatatbaseDocList(snapshot));
                    }, (error) => {
                        onStreamUpdate([]);
                    }),
            }
        };
    }

}