import rest from "../../db.json";

export class Ratings {
  static numberOneRating(best) {
    const restlen = Object.keys(rest.restaurants.restaurantList).length;
    //if this function is ran first time, there isn't best rating yet
    //so let the best rating be number bigger than 5
    if (best == null) best = 6;
    var sum = 0;
    var reviews_sum = 0;
    var current_rating;
    var max_rating = -1;
    var rest_name;
    var best_categories;
    var categories_length;
    var checkins;
    var time;

    //loop through restaurants
    for (var i = 0; i < restlen; i++) {
      //get restaurant
      const restaurant = rest.restaurants.restaurantList[i];
      //count that restaurant's reviews
      const reviews_length = Object.keys(restaurant.reviews).length;
      //get the amount of reviews
      reviews_sum += reviews_length;
      //loop through reviews
      for (var j = 0; j < reviews_length; j++) {
        sum += restaurant.reviews[j].rating;
        current_rating = sum / reviews_length;
        //check if rating is bigger than last one
        //and if it's smaller than the biggest
        if (current_rating > max_rating && current_rating < best) {
          max_rating = current_rating;
          rest_name = restaurant.name;
          best_categories = restaurant.categories;
          checkins = restaurant.checkIns;
          time = restaurant.openingHours[0].hours;
        }
      }
      sum = 0;
    }
    categories_length = Object.keys(best_categories).length;
    time = time.substring(0, 2) + ":00 " + time.substring(3, 7) + ":00";
    //if there aren't any reviews, rating is 0
    if (reviews_sum === 0) max_rating = 0;

    return [
      checkins,
      max_rating.toFixed(1),
      best_categories,
      categories_length,
      rest_name,
      time,
    ];
  }
  static numberTwoRating() {
    //get the best rating
    var no1_rating = Ratings.numberOneRating()[1];
    var checkins = Ratings.numberOneRating(no1_rating)[0];
    var no2_rating = Ratings.numberOneRating(no1_rating)[1];
    var categories = Ratings.numberOneRating(no1_rating)[2];
    var categories_length = Object.keys(categories).length;
    var rest_name = Ratings.numberOneRating(no1_rating)[4];
    var time = Ratings.numberOneRating(no1_rating)[5];

    return [
      checkins,
      no2_rating,
      categories,
      categories_length,
      rest_name,
      time,
    ];
  }
}
