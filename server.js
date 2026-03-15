require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());


// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(error => console.error('Error de conexión:', error));

// Rutas
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Ruta para crear un item
app.post('/api/items', async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  await newItem.save();
  res.json(newItem);
});

app.use("/categories", require("./routes/categoryRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/expenses", require("./routes/expenseRoutes"));

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
