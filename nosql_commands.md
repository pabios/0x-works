# Evaluation 
- Réaliser les commandes permettant de répondre aux filtres demandés sur la base restaurant envoyée

# Requêtes
1.	Créez une base restaurants, puis une collection new_york. Utilisez mongoDBCompass pour importer les données dans la collection (voir slides)
 ```shell
    db.createCollection("new_york");
```     

2.	Sur cette base réalisées les opérations suivantes (ces opérations peuvent être faites en cli) : 
- Affichez tous les documents de la collection new_york
```shell
    db.new_york.find();
```
- Comptez le nombre de documents présents dans la collection new_york
```shell
        db.new_york.countDocuments();
  ```
  - Affichez les documents ayant un restaurant_id >= 3015000
```shell
    db.restaurants.find({ restaurant_id: { $gte: "3015000" } } )
```
- Comptez le nombre de documents récupérés par la requête précédente
 ```shell
  db.restaurants.find({ restaurant_id: { $gte: "3015000" } }).count()
```
- Récupérez le premier document qui contient un grade de type A, avec un score supérieur à 10 (Regardez dans mongoDBCompass pour comprendre l’arborescence)
```shell
    db.restaurants.findOne({ "grades": { $elemMatch: { grade: "A", score: { $gt: 10 } } } })
```
  - Ajoutez (avec $push) au document récupéré précédemment, un nouveau grade de type B et un score de 10 (la date, mettez ce que vous voulez)
```shell
db.restaurants.update(
        { "grades": { $elemMatch: { grade: "A", score: { $gt: 10 } } } },
        { $push: { "grades": { grade: "B", score: 10, date:  "2023-06-12" } } }
)
```
- Incrémenter de 5 le score du premier grade du restaurant ayant pour ‘borough’ : « Brooklyn » et pour ‘cuisine’ : « Hamburgers »
```shell
 db.restaurants.update(
  { "borough": "Brooklyn", "cuisine": "Hamburgers" },
  { $inc: { "grades.0.score": 5 } }
  )
```

- Affichez les 10 premiers restaurants par ordre alphabétique de ‘name’
```shell
  db.restaurants.find().sort({ "name": 1 }).limit(10)
```

- Trouvez le (ou les) restaurant(s) ayant pour address.coord.coordinates les valeurs :
    - 0 : 73.98513559999999
    - 1 : 40.7676919
```shell
      db.restaurants.find({ "address.coord.coordinates": [73.98513559999999, 40.7676919] })
```

  - Recherchez les restaurants address.zipcode >= 10500 (afficher UNIQUEMENT ‘name’, ‘cuisine’, ‘restaurant_id’)
    ```shell
    db.restaurants.find(
        { "address.zipcode": { $gte: "10500" } },
        { _id: 0, name: 1, cuisine: 1, restaurant_id: 1 }
        )
    ```
    
- Ajoutez une prime à tous les restaurants ayant un seul grade dans le tableau de grades.
```shell
 db.restaurants.updateMany(
  {
    grades: { $size: 1 }  
  },
  {
    $set: { prime: "20000" }
  }
)
```
 
- (Bonus) Créez une vue avec permettant d’afficher les adresses de tous les restaurants n’ayant qu’un seul grade.
```shell
db.createView(
  "restaurants_with_singleGrade",
  "restaurants",
  [
    {
      $match: {
        $expr: { $eq: [{ $size: "$grades" }, 1] } 
      }
    },
    {
      $project: {
        _id: 0,
        address: 1 
      }
    }
  ]
)
```

### TEST
-  AFFICHAGE INFO DE LA VUE
```shell
db.getCollectionInfos({ name: "restaurants_with_singleGrade" })
```
- RECUPERATION DES DONNEE DE LA VUE
```shell
db.restaurants_with_singleGrade.find()
```

- VERIFICATION  de L'EXISTANCE des  INFO de la VUE
```shell
db.restaurants.find({ $expr: { $eq: [{ $size: "$grades" }, 1] } })
```
