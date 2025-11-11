import { MongoClient, Db } from 'mongodb';
import config from '../config';

let client: MongoClient | null = null;

export const connectToDatabase = async (): Promise<MongoClient> => {
    if (client) return client;

    const { host, port, user, password, database } = config.db;
    const auth = user ? `${encodeURIComponent(user)}:${encodeURIComponent(password)}@` : '';
    // use srv or normal URI depending on deployment
    const uri = `mongodb://${auth}${host}:${port}/${database}?authSource=admin`;

    client = new MongoClient(uri);
    await client.connect();
    return client;
};

export const getDatabase = (): Db => {
    if (!client) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    // use the database name stored in config.db.database
    return client.db(config.db.database);
};