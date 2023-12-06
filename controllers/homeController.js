
export default function api(req, res) {
    let routeGet = ["/restaurants","/restaurants/:id","/restaurants/filtre/:restaurantId","/restaurants/name/:name"]
    let routePost = ["/restaurants/add"];
    let routePut = ['/restaurants/edit/:id'];
    let routeDelete = ["/restaurants/delete/:id"]


    // return res.json("bonjour le monde")
    return res.json({
        routeGet,
        routePost,
        routePut,
        routeDelete,
    });
}

