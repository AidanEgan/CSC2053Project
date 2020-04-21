import ActionResultVoid from "../model/action_result_void";

import FootballPersistence from "../persistence/football_persistence";
import FootballConverter from "../model/converters/football_converter";
import { DatabaseDocument } from "../persistence/persisted_object";


export class FootballService {
    constructor () {

    }
    
    static sharedInstance = new FootballService(); 

    static instance() {
        return this.sharedInstance;
    }
}