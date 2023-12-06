import {
    findById,
    getAllRestaurant,
    getRestoByName,
    newRestaurant, restaurantDelete,
    updateRestaurant
} from "../services/restaurantService.js";

export async function restaurants(req, res) {
    let response = await getAllRestaurant();
    // console.log("bonjour restaur")

    console.log(response)
    console.log("bonjour restaur")
    return res.status(200).json(response);
}

export async function getRestaurantById(req, res) {
    let id = req.params.id;
    let rep = await findById(id);
    return res.status(200).json(rep)
}

export async function getRestaurantByName(req, res) {
    let name = req.params.name;
    let rep = await getRestoByName(name);
    return res.status(200).json(rep)
}

export async function addRestaurant(req, res) {
    let data = req.body
    try {
        let ajout = await newRestaurant(data);
        return res.status(200).json("ok ajout",ajout)
    } catch (err) {
        return res.status(401).send(err.message);
    }
}


export async function editRestaurant(req, res) {
    try {
        let response = await updateRestaurant(req,res)
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
export async function deleteRestaurant(req, res) {
    try {
        let response = await restaurantDelete(req,res)
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
