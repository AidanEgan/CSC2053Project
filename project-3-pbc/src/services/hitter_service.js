import ActionResultVoid from "../model/action_result_void";

import HitterPersistence from "../persistence/hitter_persistence";
import HitterConverter from "../model/converters/hitter_converter";
import { DatabaseDocument } from "../persistence/persisted_object";


export class HitterService {
    constructor () {

    }
    
    static sharedInstance = new HitterService(); 

    static instance() {
        return this.sharedInstance;
    }
}