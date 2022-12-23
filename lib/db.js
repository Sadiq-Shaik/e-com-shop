import { MongoClient } from "mongodb";

export async function connectToDb() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODBURL}@cluster0.m38tyvb.mongodb.net/myOnlineShopDatabase?retryWrites=true&w=majority`
  );

  return client;
}
