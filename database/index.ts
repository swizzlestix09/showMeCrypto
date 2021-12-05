import { Schema, model, connect } from 'mongoose';
const database: string = 'mongodb://localhost:27017/faveCrypto';
// 1. Create an interface representing a document in MongoDB.
interface User {
  ip: string;
  listOfCrypto: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
  ip: { type: String, required: true },
  listOfCrypto: { type: String, required: false },
});

const UserModel = model<User>('User', schema);

export default async function save(ipAddress: string): Promise<void> {

  await connect(database);
  const newUser = new UserModel({
    ip: ipAddress
  });
  await newUser.save();
};