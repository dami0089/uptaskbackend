import express from "express";
import comprobarIdMongo from "../middleware/comprobarMongo.js";

import {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  eliminarColaborador,
  agregarColaborador,
  buscarColaborador,
} from "../controllers/proyectoController.js";

import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router
  .route("/")
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto);

router
  .route("/:id")
  .get(checkAuth, comprobarIdMongo, obtenerProyecto)
  .put(checkAuth, comprobarIdMongo, editarProyecto)
  .delete(checkAuth, comprobarIdMongo, eliminarProyecto);

router.post("/colaboradores", checkAuth, buscarColaborador);
router.post("/colaboradores/:id", checkAuth, agregarColaborador);
router.post("/eliminar-colaborador/:id", checkAuth, eliminarColaborador);

export default router;
