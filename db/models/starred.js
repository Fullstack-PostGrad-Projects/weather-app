const client = require('../client');

async function addStarToUser({userId, locationId, locationName}){
    try {
        const { rows: [star] } = await client.query(
            `
            INSERT INTO starred (userId, locationId, locationName)
            VALUES($1, $2, $3)
            `,
            [userId, locationId, locationName]
        )
    } catch (error) {
        
    }
}
async function getStarByUser({userId, locationId, locationName}){
    try {
        const { rows: [starred] } = await client.query(
            `
            SELECT * 
            FROM starred 
            WHERE userId = $1
            `,
            [userId]
        )
        return starred
    } catch (error) {
        
    }
}
async function removeStarByUser({userId}){
    try {
        const { rows: [star] } = await client.query(
            `
            DELETE *
            FROM starred 
            WHERE userId = $1
            `,
            [userId]
        )
    } catch (error) {
        
    }
}
module.exports = {
    addStarToUser,
    getStarByUser,
    removeStarByUser
}

