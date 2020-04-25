import BasketballPlayer from "../basketball_player";
import Converter from "./converter";
import {DatabaseDocument, DocumentData} from "../../persistence/persisted_object";

export default class BasketballConverter extends Converter {
    fromPersistence (doc) {
        let data = doc.data; 
        let id = doc.id; 
        let toReturn = {
            id: id,
            playerName: data["playerName"], 
            teamName: data["teamName"], 
        } 
        return toReturn;
    }

    
}