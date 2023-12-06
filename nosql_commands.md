# Evaluation 
- Réaliser les commandes permettant de répondre aux filtres demandés sur la base restaurant envoyée

# Requêtes
1.	Créez une base restaurants, puis une collection new_york. Utilisez mongoDBCompass pour importer les données dans la collection (voir slides)
      db.createCollection("new_york");

2.	Sur cette base réalisées les opérations suivantes (ces opérations peuvent être faites en cli) : 
- Affichez tous les documents de la collection new_york
    db.new_york.find();
- Comptez le nombre de documents présents dans la collection new_york
  db.new_york.countDocuments();
  - Affichez les documents ayant un restaurant_id >= 3015000
    db.restaurant.find({ restaurant_id: { $gte: "3015000" } } )
- Comptez le nombre de documents récupérés par la requête précédente
  db.restaurant.find({ restaurant_id: { $gte: "3015000" } }).count()
- Récupérez le premier document qui contient un grade de type A, avec un score supérieur à 10 (Regardez dans mongoDBCompass pour comprendre l’arborescence)
  db.restaurant.findOne({ "grades": { $elemMatch: { grade: "A", score: { $gt: 10 } } } })

  - Ajoutez (avec $push) au document récupéré précédemment, un nouveau grade de type B et un score de 10 (la date, mettez ce que vous voulez)
        db.restaurant.update(
        { "grades": { $elemMatch: { grade: "A", score: { $gt: 10 } } } },
        { $push: { "grades": { grade: "B", score: 10, date: ISODate("2023-01-01T00:00:00.000Z") } } }
        )
- Incrémenter de 5 le score du premier grade du restaurant ayant pour ‘borough’ : « Brooklyn » et pour ‘cuisine’ : « Hamburgers »

  db.restaurant.update(
  { "borough": "Brooklyn", "cuisine": "Hamburgers" },
  { $inc: { "grades.0.score": 5 } }
  )

- Affichez les 10 premiers restaurants par ordre alphabétique de ‘name’
  db.restaurant.find().sort({ "name": 1 }).limit(10)

- Trouvez le (ou les) restaurant(s) ayant pour address.coord.coordinates les valeurs :
    - 0 : 73.98513559999999
    - 1 : 40.7676919
  
      db.restaurant.find({ "address.coord.coordinates": [73.98513559999999, 40.7676919] })

  - Recherchez les restaurants address.zipcode >= 10500 (afficher UNIQUEMENT ‘name’, ‘cuisine’, ‘restaurant_id’)
    db.restaurant.find(
    { "address.zipcode": { $gte: "10500" } },
    { _id: 0, name: 1, cuisine: 1, restaurant_id: 1 }
    )
    - Ajoutez une prime à tous les restaurants ayant un seul grade dans le tableau de grades.
      db.restaurant.updateMany(
      {
      grades: { $size: 1 },
      "grades.score": { $exists: true, $type: "number" }
      },
      { $inc: { "grades.$[elem].score": 5 } },
      { arrayFilters: [{ "elem.score": { $exists: true, $type: "number" } }] }
      )

- (Bonus) Créez une vue avec permettant d’afficher les adresses de tous les restaurants n’ayant qu’un seul grade.
