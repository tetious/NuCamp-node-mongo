export function insertDocument(db, document, collection) {
    const coll = db.collection(collection);
    return coll.insertOne(document);
}

export function findDocuments(db, collection) {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
}

export function removeDocument(db, document, collection) {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
}

export function updateDocument(db, document, update, collection) {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
}
