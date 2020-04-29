import Converter from "./converter";

export default class HitterConverter extends Converter {
    fromPersistence (doc) {
        let data = doc.data;
        let id = doc.id;
        let toReturn = {
            id: id,
            atBats: data["atBats"],
            cs: data["cs"],
            erp : data["erp"],
            gidp : data["gidp"],
            h : data["h"],
            hbp : data["hbp"],
            playerID : data["playerID"],
            playerName : data["playerName"],
            sb : data["sb"],
            tb : data["tb"],
            walks : data["walks"],
        }
        return toReturn;
    }


}
