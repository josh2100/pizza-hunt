const router = require("express").Router();
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../../controllers/pizza-controller");

// GET all pizzas and POST /api/pizzas
// POST expects { "pizzaName": "string", "createdBy": "string", "size": "Personal",
// "toppings": [ "string","additional strings",]}
router.route("/").get(getAllPizza).post(createPizza);

// api/pizzas/:id GET one, PUT, and DELETE
// PUT expects { "pizzaName": "string", "createdBy": "string", "size": "Personal",
// "toppings": [ "string","additional strings",]}
router.route("/:id").get(getPizzaById).put(updatePizza).delete(deletePizza);

module.exports = router;
