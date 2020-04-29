import Pitcher from "../model/pitcher";
import Store from "./store";
import PitcherConverter from "../model/converters/pitcher_converter";
import ListenerClient from "./listener_client";
import PitcherPersistence from "../persistence/pitcher_persistence";



export default class PitcherStore extends Store<Pitcher> { 
    private constructor () {
        super (new PitcherConverter());

        this.getPlayers = this.getPlayers.bind(this);
    }

    static sharedInstance: PitcherStore = new PitcherStore();

    public static instance() {
        return this.sharedInstance; 
    }

    private pitcherCache?: Pitcher[];

    getStoreSize () {
        return this.pitcherCache!.length;
    }

    isLoaded() {
        return this.pitcherCache !== undefined;
    }

    updateCache (players: Pitcher[]) {
        this.pitcherCache = players;
    }

    getPlayers() {
        return this.pitcherCache!;
    }

    static getPitcherListenerClient() {
        return new ListenerClient(
            PitcherStore.instance(),  
            PitcherPersistence.instance().getPitcherSubscriptionGenerator()
        );
    }
}