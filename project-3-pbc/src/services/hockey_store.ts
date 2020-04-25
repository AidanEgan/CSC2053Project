import HockeyPlayer from "../model/hockey_player";
import Store from "./store";
import HockeyConverter from "../model/converters/hockey_converter";
import ListenerClient from "./listener_client";
import HockeyPersistence from "../persistence/hockey_persistence";




export default class HockeyStore extends Store<HockeyPlayer> {
    constructor () {
        super (new HockeyConverter());

        this.getPlayers = this.getPlayers.bind(this);
    }

    static sharedInstance: HockeyStore = new HockeyStore();

    public static instance() {
        return this.sharedInstance;
    }

    private hockeyCache?: HockeyPlayer[];

    public getStoreSize () {
        return this.hockeyCache!.length;
    }

    public isLoaded() {
        return this.hockeyCache !== undefined;
    }

    public updateCache (players: HockeyPlayer[]) {
        this.hockeyCache = players;
    }

    public getPlayers() {
        return this.hockeyCache;
    }

    public static getHockeyListenerClient(): ListenerClient<HockeyStore> {
        return new ListenerClient<HockeyStore>(
            new HockeyStore(),
            HockeyPersistence.instance().getHockeySubscriptionGenerator()
        );
    }
}
