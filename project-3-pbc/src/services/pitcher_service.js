import ActionResultVoid from "../model/action_result_void";

import PitcherPersistence from "../persistence/pitcher_persistence";
import PitcherConverter from "../model/converters/pitcher_converter";
import { DatabaseDocument } from "../persistence/persisted_object";


export class PitcherService {
    constructor () {

    }
    
    static sharedInstance = new PitcherService(); 

    static instance() {
        return this.sharedInstance;
    }
}