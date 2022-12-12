var express = require("express");
var UserController = require("../controllers/barcos");

var router = express.Router();

router.post("/guardarBarco", UserController.save);
router.put("/actualizar",UserController.update);
router.delete("/eliminar",UserController.delete);
router.get("/Barcos",UserController.listarBarcos);

module.exports = router;