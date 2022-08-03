const fetchCookies = async (url) => {
    /**
     * @desc: Sends a Post req containing the url in the body 
     * to /api/cookies and waits for a response from the server 
     * @param: url -> the url the user selected
     * @return: ratings -> an array of object containing the cookies associated with the url 
     */
  console.log("runs");
  const cookieResponse = await fetch("http://localhost:3080/api/cookies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: url }),
  });

  const cookies = await cookieResponse.json();

  return cookies;
};

const fetchRatings = async (url) => {
     /**
     * @desc: Sends a Post req containing the url in the body 
     * to /api/ratings and waits for a response from the server 
     * @param: url -> the url the user selected
     * @return: ratings -> an object containing the ratings associated with the url 
     */
  const ratingsResponse = await fetch("http://localhost:3080/api/ratings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: url }),
  });

  const ratings = await ratingsResponse.json();

  return ratings;
};

module.exports = {
  fetchCookies,
  fetchRatings,
};
