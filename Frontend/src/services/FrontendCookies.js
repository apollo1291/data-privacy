export const fetchCookies = async (url) => {
    /**
     * @desc: Sends a Post req containing the url in the body 
     * to /api/cookies and waits for a response from the server 
     * @param: url -> the url the user selected
     * @return: ratings -> an array of object containing the cookies associated with the url 
     */
const cookieResponse = await fetch("/api/cookies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: url }),
  });

  const cookies = await cookieResponse.json();

  return cookies;
};

export const fetchRatings = async (url) => {
     /**
     * @desc: Sends a Post req containing the url in the body 
     * to /api/ratings and waits for a response from the server 
     * @param: url => the url the user selected
     * @return: ratings => an object containing the ratings associated with the url 
     */
  const ratingsResponse = await fetch("/api/ratings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: url }),
  });

  const ratings = await ratingsResponse.json();

  return ratings;
};

export const getColor = (rating) => {
  /**
   * @desc: chooses which color corresponds to a rating. green for good, yellow for mid, red for bad
   * @param: rating => the rating to be colored
   * @return: a string, the name or hex of the color. 'green', 'yellow', or 'red'
   */
  rating = parseInt(rating)
  if (rating > 22){
    return 'green'
  }

  if (rating > 11){
    // yellow is to 
    return '#eed202'
  }

  return 'red'
}

export const getWidth = (rating) => {
  /**
   * @desc: provdies the width, in percentage,for a rating bar
   * @param: rating => the rating to assess
   * @return: a string, a width in percentage
   */

  rating = parseInt(rating)

  return (rating / 33 * 100).toString() + '%'
}

/*module.exports = {
  fetchCookies,
  fetchRatings,
  getColor,
  getWidth
};*/
