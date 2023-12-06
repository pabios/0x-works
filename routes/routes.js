import {Router} from "express";
import hello from "../controllers/homeController.js";
import {
    addRestaurant, deleteRestaurant, editRestaurant,
    getRestaurantById,
    getRestaurantByName,
    restaurants
} from "../controllers/restaurantController.js";


const router = Router();

router.get("/", hello);

// RESTAURANT

//GET
router.get("/restaurants",restaurants)
router.get("/restaurants/:id", getRestaurantById);
router.get("/restaurants/name/:name", getRestaurantByName); // if name like "Movable" route a mettre en post

//POST
router.post("/restaurants/add", addRestaurant);

//PUT
router.put('/restaurants/edit/:id', editRestaurant)

//DELETE
router.delete("restaurants/delete/:id", deleteRestaurant)


export default router;
