import Converter from "./converter";

export default class BasketballConverter extends Converter {
    fromPersistence (doc) {
        let data = doc.data;
        let id = doc.id;
        let toReturn = {
            id: id,
            player: data["player"],
            tm: data["tm"],
            age: data["age"],
            bpm : data["bpm"],
            dbpm : data["dbpm"],
            dws : data["dws"],
            g : data["g"],
            mp : data["mp"],
            obpm : data["obpm"],
            ows : data["ows"],
            per : data["per"],
            pos : data["pos"],
            rk : data["rk"],
            tspercent: data["tspercent"],
            usgpercent : data["usgpercent"],
            vorp : data["vorp"],
            ws : data["ws"],
            ws_48: data["ws_48"],
        }
        return toReturn;
    }


}
