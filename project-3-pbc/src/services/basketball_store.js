import BasketballPlayer from "../model/basketball_player";
import Store from "./store";
import BasketballConverter from "../model/converters/basketball_converter";
import ListenerClient from "./listener_client";
import BasketballPersistence from "../persistence/basketball_persistence";



export default class BasketballStore extends Store { 
    constructor () {
        super (new BasketballConverter());

        this.getPlayers = this.getPlayers.bind(this);
    }

    basketballCache = [];

    getStoreSize () {
        return this.basketballCache.length;
    }

    isLoaded() {
        return this.basketballCache !== undefined;
    }

    updateCache (players) {
        this.basketballCache = players;
    }

    getPlayers() {
        return this.basketballCache;
    }

    static getBasketballListenerClient() {
        return new ListenerClient(
            new BasketballStore(),  
            BasketballPersistence.instance().getBasketballSubscriptionGenerator()
        );
    }
}