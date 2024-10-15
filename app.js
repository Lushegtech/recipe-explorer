import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s="

app.set('view engine', 'ejs' );
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render("index",  {foods: [], error: null});
});

app.get('/search', async (req, res) => {
const searchQuery = req.query.q;
    try {
        const response = await axios.get(`${API_URL}${searchQuery}`)
        const { meals } = response.data
        res.render("index", { foods: meals || [], error: null });
}   catch (error) {
    console.error(error)
    res.render("index.ejs", { foods: null, error: "error fetching meal recipe, please try again" });
}

});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});