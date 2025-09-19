import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.frankfurter.dev/v1/latest";
const money = "Select pair"
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {

    try {
    const result = await axios.get(API_URL + "?base=USD&symbols=EUR");
    
    
    res.render("index.ejs", { currency: result.data.rates.EUR});
  } catch (error) {
    console.log(error.message);
    
    
    res.status(500);
  }

});
app.post("/", async (req, res) => {
    
    console.log(req.body.currencyFrom);
    if (req.body.currencyFrom === req.body.currencyTo){
        res.render("index.ejs", { currency: 1});
    }
    else{
    try {
    const result = await axios.get(API_URL + `?base=${req.body.currencyFrom}&symbols=${req.body.currencyTo}` );
   
    console.log(result.data.rates);
    
    res.render("index.ejs", { currency: result.data.rates[`${req.body.currencyTo}`]});
  } catch (error) {
    console.log(error.message);
    
    
    res.status(500);
  }
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
