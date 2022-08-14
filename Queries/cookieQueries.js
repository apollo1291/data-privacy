const pool = require('../pool.js')

const getCookies = (req, res) => {
    /**
     * @desc: queries the 'cookies' table in datalink_api for all the cookies associated with a website
     * @param: req.body.url: the url to get cookies from
     * @return: a json object with all of the cookies
     */
    const url = req.body.url

    pool.query("Select name, secure, expires, httpOnly from cookies where website_id = (Select id from websites where url = $1)", [url], (err, result) =>{
        if (err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

module.exports = {
    getCookies
 }