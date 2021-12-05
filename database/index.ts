import { Schema, model, connect } from "mongoose";
const database: string = "mongodb://localhost:27017/faveCrypto";
// 1. Create an interface representing a document in MongoDB.
interface User {
  ip: string;
  listOfCrypto: [];
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
  ip: { type: String, required: true },
  listOfCrypto: { type: [], required: false },
});

const UserModel = model<User>("User", schema);

export async function saveIp(ipAddress: string): Promise<void> {
  await connect(database);
  const newUser = new UserModel({
    ip: ipAddress,
  });
  await newUser.save();
}

export async function saveCrypto( ipAddress: string, crypto: string ): Promise<void | []> {
  let list: [] = [];
  await connect(database);

  await UserModel.findOneAndUpdate(
    { ip: ipAddress },
    { $push: { listOfCrypto: crypto } },
    { new: true, upsert: true }
  )
  .then(record => { list = record.listOfCrypto })
  .catch((err) => {
    console.log("error w find ", err);
  });

  return list;
}
