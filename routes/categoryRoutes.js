const express = require("express");
const auth = require("../middleware/auth");
const Category = require("../models/Category");

const router = express.Router();

// Crear categoría
router.post("/new", auth, async (req, res) => {
  try {
    const name = req.body.name.trim();

    const existingCategory = await Category.findOne({
      name,
      user: req.user.id,
    });

    if (existingCategory) {
      return res.status(400).json({ error: "Ya existe una categoría con este nombre" });
    }

    const category = new Category({ name, user: req.user.id });
    await category.save();

    res.status(201).json({ message: "Categoría creada correctamente", category });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Listar todas las categorías
router.get("/list", auth, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una categoría
router.put("/:id", auth, async (req, res) => {
  try {
    const name = req.body.name.trim();

    const existingCategory = await Category.findOne({
      name,
      user: req.user.id,
      _id: { $ne: req.params.id },
    });

    if (existingCategory) {
      return res.status(400).json({ error: "Ya existe una categoría con ese nombre" });
    }

    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.status(200).json({ message: "Categoría actualizada correctamente", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
});

// Eliminar una categoría
router.delete("/:id", auth, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.status(200).json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
});

module.exports = router;
