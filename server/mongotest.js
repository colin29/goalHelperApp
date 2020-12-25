const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, {useUnifiedTopology: true});
async function run() {
  try {
    await client.connect();
    const database = client.db('goalHelperApp');
    const collection = database.collection('goals');
    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const options = {
      sort: { id: 1 }, 
      projection: { _id: 0},
    };

    const goals = await collection.find(query, options).toArray();

    console.log(goals);
    // await cursor.forEach(console.dir);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);