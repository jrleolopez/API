require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión:', err));


// Conexión a la base de datos
mongoose
.connect(process.env.MONGO_URI_)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error conectando a MongoDB:", error));

// Rutas
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.use("/categories", require("./routes/categoryRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/expenses", require("./routes/expenseRoutes"));

// Inicia el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}/`),
);
