
export function toDatabaseDocList(querySnapshot) {
    return querySnapshot.docs.map(toDatabaseDoc);
}

export function toDatabaseDoc(doc) {
    return {
        id: doc.id,
        data: doc.data()
    };
}
