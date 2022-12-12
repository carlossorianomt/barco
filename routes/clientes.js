var express = require("express");
var UserController = require("../controllers/clientes");

var router = express.Router();

router.get("/probando", UserController.probando);
router.post("/testeando", UserController.testeando);
router.post("/login", UserController.login);
router.post("/guardarCliente", UserController.save);
router.put("/actualizar/:id",UserController.update);
router.delete("/eliminar/:id",UserController.delete);
router.get("/clientes",UserController.listarClientes);
router.get("/clientes/:id",UserController.listarClientes);


module.exports = router;
