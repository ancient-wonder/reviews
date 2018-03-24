// const mongoose = require('mongoose');
// // const FormatDate = (mongoose.Schema.Types.FormatDate = require('mongoose-schema-formatdate'));
// // const db = mongoose.connection;
// // mongoose.connect("mongodb://localhost/reviews");

const reviewSchema = mongoose.Schema({
  // TODO: my schemas here
  _id: { type: Number, unique: false },
  reviews:
    {
      guest_name: String,
      communication: Number,
      cleaniness: Number,
      location: Number,
      checkin: Number,
      value: Number,
      accuracy: Number,
      message: String,
      date: String,
      image: String,
    }

});

const ReviewsModel = mongoose.model('Guest', reviewSchema);

async function saveAllReviews(reviews) {
  await ReviewsModel.insertMany(reviews);
};

const findReviewById = id => {
  return ReviewsModel.findOne({ id });
};

const findAllReviews = () => {
  return ReviewsModel.find();
};

module.exports = {
  saveAllReviews,
  findReviewById,
  findAllReviews
};

/* 
  id, name, accuracy, communication, cleaniness, location, checkin, message, date
*/

// const save = (obj) => {
//   const review = new ReviewsModel({
//     id: obj.id,
//     guest_name: obj.guset_name,
//     accuracy: obj.accuracy,
//     communication: obj.communication,
//     cleaniness: obj.cleaniness,
//     location: obj.location,
//     checkin: obj.checkin,
//     message: obj.message,
//     value: obj.value,
//     image: obj.image,
//     date: obj.date
//   });
//   review.save(error => {
//     if (error) return console.log(error);
//   });
// }

// db.on("open", () => {
//   console.log("Successfully connected to mongo guest database");
// });
