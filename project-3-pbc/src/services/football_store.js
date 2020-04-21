import FootballPlayer from "../model/football_player";
import Store from "./store";
import FootballConverter from "../model/converters/football_converter";
import ListenerClient from "./listener_client";
import FootballPersistence from "../persistence/football_persistence";



export default class FootballStore extends Store { 
    constructor () {
        super (new FootballConverter());

        this.getPlayers = this.getPlayers.bind(this);
    }

    footballCache = [];

    getStoreSize () {
        return this.footballCache.length;
    }

    isLoaded() {
        return this.footballCache !== undefined;
    }

    updateCache (players) {
        this.footballCache = players;
    }

    getPlayers() {
        return this.footballCache;
    }

    static getFootballListenerClient() {
        return new ListenerClient(
            new FootballStore(),  
            FootballPersistence.instance().getFootballSubscriptionGenerator()
        );
    }
}