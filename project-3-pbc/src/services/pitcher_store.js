import Pitcher from "../model/pitcher";
import Store from "./store";
import PitcherConverter from "../model/converters/pitcher_converter";
import ListenerClient from "./listener_client";
import PitcherPersistence from "../persistence/pitcher_persistence";



export default class PitcherStore extends Store { 
    constructor () {
        super (new PitcherConverter());

        this.getPlayers = this.getPlayers.bind(this);
    }

    pitcherCache = [];

    getStoreSize () {
        return this.pitcherCache.length;
    }

    isLoaded() {
        return this.pitcherCache !== undefined;
    }

    updateCache (players) {
        this.pitcherCache = players;
    }

    getPlayers() {
        return this.pitcherCache;
    }

    static getPitcherListenerClient() {
        return new PitcherClient(
            new PitcherStore(),  
            PitcherPersistence.instance().getPitcherSubscriptionGenerator()
        );
    }
}