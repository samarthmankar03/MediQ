import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const uri = process.env.MONGODB_URI;

export default async function fetchUserFromDB(email, password) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(); 

    const user = await db.collection("users").findOne({ email });

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return null;

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role:user.role
    };

  } catch (error) {
    console.error("Error fetching user from DB:", error);
    return null;
  } finally {
    await client.close();
  }
}
