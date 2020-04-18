import { DatabaseDocument, DocumentData } from "../../persistence/persisted_object";


export default abstract class Converter<T> {
    abstract fromPersistence(object: DatabaseDocument):T;

    public isUndefinedOrNull(object: any): boolean {
        return object === null || object === undefined;
    }

    public toDocumentData(map: Map<string, any>) {
        let data: DocumentData ={};
        map.forEach((value, key) => {
            data[key] = value.toString()
        });
        return data;
    }
}