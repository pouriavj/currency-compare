import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.frankfurter.dev/v1/latest";

let money = "Select a pair";
let currencyFrom = "USD";
let currencyTo = "EUR";
let loading = false;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    currency: money,
    currencyFrom,
    currencyTo,
    loading,
  });
});

app.post("/", async (req, res) => {
  currencyFrom = req.body.currencyFrom;
  currencyTo = req.body.currencyTo;

  if (currencyFrom === currencyTo) {
    money = 1;
    return res.redirect("/");
  }

  try {
    loading = true;
    const result = await axios.get(
      `${API_URL}?base=${currencyFrom}&symbols=${currencyTo}`
    );

    money = result.data.rates[currencyTo];
    loading = false;
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    money = "Error fetching data";
    loading = false;
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
