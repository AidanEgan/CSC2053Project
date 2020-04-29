import HockeyPlayer from "../model/hockey_player";
import Store from "./store";
import HockeyConverter from "../model/converters/hockey_converter";
import ListenerClient from "./listener_client";
import HockeyPersistence from "../persistence/hockey_persistence";



export default class HockeyStore extends Store { 
    constructor () {
        super (new HockeyConverter());

        this.getPlayers = this.getPlayers.bind(this);
    }

    static sharedInstance = new HockeyStore();

    static instance() {
        return this.sharedInstance; 
    }

    hockeyCache = [];

    getStoreSize () {
        return this.hockeyCache.length;
    }

    isLoaded() {
        return this.hockeyCache !== undefined;
    }

    updateCache (players) {
        this.hockeyCache = players;
    }

    getPlayers() {
        return this.hockeyCache;
    }

    static getHockeyListenerClient() {
        return new ListenerClient(
            new HockeyStore(),  
            HockeyPersistence.instance().getHockeySubscriptionGenerator()
        );
    }
}