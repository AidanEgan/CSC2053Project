import Converter from "./converter";

export default class HockeyConverter extends Converter {
  fromPersistence (doc) {
      let data = doc.data;
      let id = doc.id;
      let toReturn = {
          id: id,
          Player: data["Player"],
          Tm: data["Tm"],
          Age: data["Age"],
          Pos : data["Pos"],
          GP : data["GP"],
          G : data["G"],
          A : data["A"],
          PTS : data["PTS"],
          Epm : data["Epm"],
          aWS : data["aWS"],
          aPS : data["aPS"],
      }
      return toReturn;
  }


}
