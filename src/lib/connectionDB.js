const { MongoClient, ServerApiVersion } = require("mongodb");

let db;
const connectionDB=async()=>{
    if(db){
        return db;
    }
    try{
        const uri = `mongodb+srv://${process.env.NEXT_DATEBASED_USER}:${process.env.NEXT_DATEBASED_PASSWORD}@cluster0.il352b3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
        const client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
          db=client.db('askPilot');
          console.log("your database is ready for interview");
          return db;
    }
    catch(error){
        console.log(error);
    }
}
export default connectionDB