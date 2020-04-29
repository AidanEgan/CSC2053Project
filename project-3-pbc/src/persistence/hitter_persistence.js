import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {firebaseApp} from './firebase_app';
import { OnStreamUpdate, SubscriptionGenerator, Unsubscriber } from "./subscription_generator";
import { DatabaseDocument } from "./persisted_object";
import ActionResult from "../model/action_result";
import ActionResultVoid from "../model/action_result_void";
import {toDatabaseDocList} from "./persistence.utls";

export default class HitterPersistence {
    constructor () {}

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