import {connectToMongo} from "../models/db.js";
import {RestaurantModel} from "../models/restaurants.js";

connectToMongo().then(r => r);

export async function getAllRestaurant() {
    try {
        return await RestaurantModel.find();
    } catch (error) {
        console.error('Erreur lors de la récupération des restaurants :', error);
        throw error;
    }
}
export async function findById(restaurantId) {
    try {
        return await RestaurantModel.findById(restaurantId);
    } catch (error) {
        console.error(`Erreur récupération du restaurant avec l'ID ${restaurantId}:`, error);
        throw error;
    }
}

//Nombre de restaurants avec restaurant_id >= 3015000
export async function findRestaurantsGTE(restaurantId) {
    const restaurantIdThreshold = restaurantId;

    try {
        const restaurants = await RestaurantModel.find({ restaurant_id: { $gte: restaurantIdThreshold } });

        const count = await RestaurantModel.countDocuments({ restaurant_id: { $gte: restaurantIdThreshold } });

        console.log(`Nombre de restaurants avec restaurant_id >= ${restaurantIdThreshold} : ${count}`);
        return restaurants;
    } catch (error) {
        console.error('Erreur lors de la recherche des restaurants :', error);
        throw error;
    }
}


export async  function  getRestoByName(name){
    try {
        return await RestaurantModel.find({name:name});
    } catch (error) {
        console.error(`Erreur récupération du restaurant avec le ${name}:`, error);
        throw error;
    }
}

export async function newRestaurant(data){
    try {
        const restaurant = new RestaurantModel(data);

        return await restaurant.save();
    } catch (error) {
        throw new Error('Erreur lors de l\'ajout du restaurant : ' + error.message);
    }
}


export  async  function  updateRestaurant(req,res){
    const payload = req.body;
    const restaurant = await RestaurantModel.findById(req.params.id).exec();

    if (payload.name && payload.name !== restaurant.name) {
        const existingRestaurant = await RestaurantModel.findOne({ name: payload.name });
        if (existingRestaurant)
            return res.status(400).send("ce nom existe déjà utilisé");
    }

    const updatedRestaurant = await RestaurantModel.findOneAndUpdate({
        ...payload
    });
    return res.status(200).send(updatedRestaurant);
}

export  async  function  restaurantDelete(req,res){
    const restaurant = await RestaurantModel.findById(req.params.id);
    if (!restaurant) return res.status(404).json("restaurant non trouvé");
    await RestaurantModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("restaurant supprimé");
}
