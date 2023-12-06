import mongoose from "mongoose";

const { Schema, model } = mongoose;

const restaurantSchema = new Schema({
    address: {
        building: String,
        coord: {
            type: {
                type: String,
                default: 'Point',
            },
            coordinates: [Number],
        },
        street: String,
        zipcode: String,
    },
    borough: String,
    cuisine: String,
    grades: [
        {
            date: Date,
            grade: String,
            score: Number,
        },
    ],
    name: { type: String, required: true },
    restaurant_id: { type: String, required: true },
});


export const RestaurantModel = model('restaurants', restaurantSchema);






/**
 *  db.restaurant.find();
 */
// {
//     _id: ObjectId("65707cbb12f5266d2c5114c7"),
//         address: {
//     building: '284',
//         coord: { type: 'Point', coordinates: [ -73.9829239, 40.6580753 ] },
//     street: 'Prospect Park West',
//         zipcode: '11215'
// },
//     borough: 'Brooklyn',
//         cuisine: 'American ',
//     grades: [
//     {
//         date: ISODate("2014-11-19T00:00:00.000Z"),
//         grade: 'A',
//         score: 11
//     },
//     {
//         date: ISODate("2013-11-14T00:00:00.000Z"),
//         grade: 'A',
//         score: 2
//     },
//     {
//         date: ISODate("2012-12-05T00:00:00.000Z"),
//         grade: 'A',
//         score: 13
//     },
//     {
//         date: ISODate("2012-05-17T00:00:00.000Z"),
//         grade: 'A',
//         score: 11
//     }
// ],
//     name: 'isma',
//     restaurant_id: '40361606'
// }
