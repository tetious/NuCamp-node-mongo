import mongodb from 'mongodb';
const { MongoClient } = mongodb;
import { insertDocument, findDocuments, updateDocument, removeDocument } from './operations.js';

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

const client = await MongoClient.connect(url, { useUnifiedTopology: true });
console.log('Connected correctly to server');

const db = client.db(dbname);
try {
    let result = await db.dropCollection('campsites');
    console.log('Dropped Collection:', result);
}
catch {
    console.log('Collection not found, skipping drop.');
}

try {
    let result = await insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites');
    console.log('Insert Document:', result.ops);
    
    let docs = await findDocuments(db, 'campsites');
    console.log('Found Documents:', docs);

    result = await updateDocument(db, { name: "Breadcrumb Trail Campground" },
        { description: "Updated Test Description" }, 'campsites');
    console.log('Updated Document Count:', result.result.nModified);

    docs = await findDocuments(db, 'campsites');
    console.log('Found Documents:', docs);

    result = await removeDocument(db, { name: "Breadcrumb Trail Campground" }, 'campsites');
    console.log('Deleted Document Count:', result.deletedCount);

    await client.close();
} catch (error) {
    console.log('Unexpected error:', error)
}
