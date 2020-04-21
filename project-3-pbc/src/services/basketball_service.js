import ActionResultVoid from "../model/action_result_void";

import BasketballPersistence from "../persistence/basketball_persistence";
import BasketballConverter from "../model/converters/basketball_converter";
import { DatabaseDocument } from "../persistence/persisted_object";


export class BasketballService {
    constructor () {

    }
    
    static sharedInstance = new BasketballService(); 

    static instance() {
        return this.sharedInstance;
    }
}