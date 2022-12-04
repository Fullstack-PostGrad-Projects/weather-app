const { Router } = require("express");
const express = require("express");
const router = express.Router();

const { addStarToUser, getStarByUser, removeStarByUser } = require("../db");

//add star to user profile
router.post("/location", async (req, res, next) => {
  const { userId, locationId, locationName } = req.body;
  try { 
    await addStarToUser({userId, locationId, locationName})
    res.send("location has been added to favorites!")
  } catch (error) {
    next({name,
      message: "error in server api adding star to profile",
      error});
  }
});

router.get("/stared", async (req, res, next)=>{
  try {
    const {userId, locationId, locationName} = req.body;
    const result = await getStarByUser({userId, locationId, locationName})
    res.send(result)
  } catch (error) {
    next({
      name,
      message : "error in getting starred location bby user",
      error
    })
  }
})

router.delete("/:id", async (req, res, next)=>{
try {
  const { id } = req.params
  const response = await removeStarByUser(id)
  res.send(response)
  
} catch (error) {
  next({
    name,
    message : "oops an error in delete star from user DB",
    error
  })
}
})
module.exports = router
