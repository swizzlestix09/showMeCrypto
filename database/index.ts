import { Schema, model, connect } from "mongoose";
const database: string = "mongodb://localhost:27017/faveCrypto";

interface User {
  ip: string;
  email: string;
}

const schema = new Schema<User>({
  ip: { type: String, required: true },
  email: { type: String, required: false },
});

const UserModel = model<User>("User", schema);

export async function saveIp(ipAddress: string): Promise<void> {
  await connect(database);
  const newUser = new UserModel({
    ip: ipAddress,
  });
  await newUser.save();
}

export async function deleteRec(ipAddress: string): Promise<void | []> {
  await connect(database);
  await UserModel.deleteMany({ ip: ipAddress });
}

export async function updateRec( ipAddress: string, email: string): Promise<void | []> {
  await connect(database);
  await UserModel.findOneAndUpdate({ ip: ipAddress }, { email: email });
}
