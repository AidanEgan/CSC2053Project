import ActionResultVoid from "../model/action_result_void";

import HockeyPersistence from "../persistence/hockey_persistence";
import HockeyConverter from "../model/converters/hockey_converter";
import { DatabaseDocument } from "../persistence/persisted_object";


export class HockeyService {
    constructor () {

    }
    
    static sharedInstance = new HockeyService(); 

    static instance() {
        return this.sharedInstance;
    }
}