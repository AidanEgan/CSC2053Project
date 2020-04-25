import BasketballPlayer from "../model/basketball_player";
import Store from "./store";
import BasketballConverter from "../model/converters/basketball_converter";
import ListenerClient from "./listener_client";
import BasketballPersistence from "../persistence/basketball_persistence";




export default class BasketballStore extends Store<BasketballPlayer> { 
    constructor () {
        super (new BasketballConverter());

        this.getPlayers = this.getPlayers.bind(this);
    }

    static sharedInstance: BasketballStore = new BasketballStore();

    public static instance() {
        return this.sharedInstance; 
    }

    private basketballCache?: BasketballPlayer[];

    public getStoreSize () {
        return this.basketballCache!.length;
    }

    public isLoaded() {
        return this.basketballCache !== undefined;
    }

    public updateCache (players: BasketballPlayer[]) {
        this.basketballCache = players;
    }

    public getPlayers() {
        return this.basketballCache;
    }

    public static getBasketballListenerClient(): ListenerClient<BasketballStore> {
        return new ListenerClient<BasketballStore>(
            new BasketballStore(),  
            BasketballPersistence.instance().getBasketballSubscriptionGenerator()
        );
    }
}