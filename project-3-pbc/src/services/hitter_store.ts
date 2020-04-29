import Hitter from "../model/hitter";
import Store from "./store";
import HitterConverter from "../model/converters/hitter_converter";
import ListenerClient from "./listener_client";
import HitterPersistence from "../persistence/hitter_persistence";



export default class HitterStore extends Store<Hitter> { 
    private constructor () {
        super (new HitterConverter());

        this.getPlayers = this.getPlayers.bind(this);
    }

    static sharedInstance = new HitterStore();

    public static instance() {
        return this.sharedInstance; 
    }

    private hitterCache?: Hitter[];

    getStoreSize () {
        return this.hitterCache!.length;
    }

    isLoaded() {
        return this.hitterCache !== undefined;
    }

    updateCache (players: Hitter[]) {
        this.hitterCache = players;
    }

    getPlayers() {
        return this.hitterCache!;
    }

    static getHitterListenerClient() {
        return new ListenerClient<HitterStore>(
            HitterStore.instance(),  
            HitterPersistence.instance().getHitterSubscriptionGenerator()
        );
    }
}