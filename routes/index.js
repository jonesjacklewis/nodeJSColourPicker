var express = require("express");
const axios = require("axios");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Colour Picker",
    method: "get",
  });
});

router.post("/", function (req, res, next) {
  const requestBody = req.body;

  if ("colourSelect" in requestBody) {
    const colour = requestBody["colourSelect"];
    const imgBaseURL = "https://www.thecolorapi.com/id?format=svg&hex=";

    const imgURL = imgBaseURL + colour.replace("#", "");

    const requestBaseURL = "https://www.thecolorapi.com/id?hex=";

    const requestURL = requestBaseURL + colour.replace("#", "");

    axios
      .get(requestURL)
      .then((data) => {
        data = data["data"];
        const name = data["name"]["value"];
        const perfectMatch = data["name"]["exact_match_name"];

        res.render("index", {
          title: "Colour Picker",
          method: "post",
          imgUrl: imgURL,
          colourName: name,
          perfectMatch: perfectMatch,
          hex: colour,
        });
      })
      .catch((error) => {
        console.log(error);
        res.send(
          "window.alert('Invalid Colour Code');window.location.href='/'"
        );
      });
  }
  res.send("window.alert('Invalid Colour Code');window.location.href='/'");
});

module.exports = router;
