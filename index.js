import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import cors from "cors";
// socket.io
import { Server } from "socket.io";

const app = express();
app.use(express.json());
dotenv.config();

conectarDB();

// Configurar Cors
const whiteList = [process.env.FRONTEND_URL];

const corsOption = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      // puede consultar la api
      callback(null, true);
    } else {
      // no tiene permitido consultar la api
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOption));

// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//socket.io
const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  // console.log("Conectado a Socket.io");

  //Definir los eventos de socket.io
  socket.on("abrir proyecto", (proyecto) => {
    socket.join(proyecto);
  });

  socket.on("nueva tarea", (tarea) => {
    socket.to(tarea.proyecto).emit("tarea agregada", tarea);
  });

  socket.on("eliminar tarea", (tarea) => {
    socket.to(tarea.proyecto).emit("tarea eliminada", tarea);
  });

  socket.on("actualizar tarea", (tarea) => {
    const proyecto = tarea.proyecto._id;
    socket.to(proyecto).emit("tarea actualizada", tarea);
  });

  socket.on("cambiar estado", (tarea) => {
    const proyecto = tarea.proyecto._id;
    socket.to(proyecto).emit("estado actualizado", tarea);
  });
});
