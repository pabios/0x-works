import {Router} from "express";
import {
    addRestaurant, deleteRestaurant, editRestaurant, getRestaurantByGte,
    getRestaurantById,
    getRestaurantByName,
    restaurants
} from "../controllers/restaurantController.js";
import api from "../controllers/homeController.js";


const router = Router();

router.get("/", api);

// RESTAURANT

//GET
router.get("/restaurants",restaurants)
router.get("/restaurants/:id", getRestaurantById);
router.get("/restaurants/filtre/:restaurantId", getRestaurantByGte);
router.get("/restaurants/name/:name", getRestaurantByName);

//POST
router.post("/restaurants/add", addRestaurant);

//PUT
router.put('/restaurants/edit/:id', editRestaurant)

//DELETE
router.delete("/restaurants/delete/:id", deleteRestaurant)


export default router;
