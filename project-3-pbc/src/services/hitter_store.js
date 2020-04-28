import Hitter from "../model/hitter";
import Store from "./store";
import HitterConverter from "../model/converters/hitter_converter";
import ListenerClient from "./listener_client";
import HitterPersistence from "../persistence/hitter_persistence";



export default class HitterStore extends Store { 
    constructor () {
        super (new HitterConverter());

        this.getPlayers = this.getPlayers.bind(this);
    }

    static sharedInstance = new HitterStore();

    static instance() {
        return this.sharedInstance; 
    }

    hitterCache = [];

    getStoreSize () {
        return this.hitterCache.length;
    }

    isLoaded() {
        return this.hitterCache !== undefined;
    }

    updateCache (players) {
        this.hitterCache = players;
    }

    getPlayers() {
        return this.hitterCache;
    }

    static getHitterListenerClient() {
        return new ListenerClient(
            new HitterStore(),  
            HitterPersistence.instance().getHitterSubscriptionGenerator()
        );
    }
}