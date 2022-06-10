const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
// portfolio
// Si2pb3VptIdQwpCK
app.use(express.json());
app.use(cors());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ktdkk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
      await client.connect();
      const projectCollection = client.db("myProjects").collection("project");

           // get all Projects
           app.get('/projects', async(req, res) =>{
            const query = {};
            const cursor = projectCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects);
          })

               // get a Product
               app.get('/projects/:id', async(req, res) =>{
                const id = req.params.id;
                console.log(id)
                const query = {_id:ObjectId(id)};
                const result =await projectCollection.findOne(query);
            
                res.send(result)
    
            })
    }
    finally{

    }
}
run().catch(console.dir)
app.listen(port, () =>{
    console.log('tik ase chalu hoise', port);
})
