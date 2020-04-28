import HockeyPlayer from "../hockey_player";
import Converter from "./converter";
import {DatabaseDocument, DocumentData} from "../../persistence/persisted_object";

export default class HockeyConverter extends Converter {
    fromPersistence (doc) {
        let data = doc.data;
        let toReturn = {
            playerName: data["playerName"],
            teamName: data["teamName"],
        }
        return toReturn;
    }


}
