const {
    client
} = require('./')


async function dropTables(){
    try {
      await client.query(`
      DROP TABLE IF EXISTS starred;
      DROP TABLE IF EXISTS users;
      `)
  
      console.log("Finished dropping tables")
    } catch(error){
      console.log("Error dropping tables")
      throw error
    }
}


async function buildTables() {
    console.log("Starting to build tables")
    try {
      await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        password varchar(255) NOT NULL
      );
      CREATE TABLE starred(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "locationId" BIGINT NOT NULL,
        "locationName" varchar(100) NOT NULL
      );
      `)
     
      console.log("Finished building tables")
    } catch (error) {
      console.log("Error building tables")
      throw error;
    }
}


async function populateInitialData() {
    console.log("Starting to populate initial data")
    try {
        //create the usual test users
        //give them favorite locations to set up
        //console log the DB results








        console.log("Finished populating initial data")
    } catch (error) {
        console.log("Error populating initial data")
        throw error;  
    }
}


async function rebuildDB(){
    try {
      client.connect();
  
      await dropTables();
      await buildTables();
      await populateInitialData()
      console.log('made it to end of rebuildDB')
    } catch(error){
      console.log("Error during rebuildDB")
      throw error
    }
}



const runDB = async () => {
    try {
      await rebuildDB().then(console.log('this should be after all is inputted'))
    } catch (error) {
      console.error('problem over here')
    } finally{
      client.end()
    }
}



runDB()