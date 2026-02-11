import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// 3. MODELO (El molde de los datos)
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});
const user = mongoose.model('user', userSchema);

// RUTA GET: Para traer usuarios
router.get('/', async (req, res) => {
    try {
        const listaUsuarios = await user.find();
        res.json(listaUsuarios);
    } catch(error) {
        res.status(400).send("Error al guardar");
    }
});

// RUTA GET POR ID: Traer un usuario específico
router.get('/:id', async (req, res) => {
    try {
        const usuario = await user.findById(req.params.id);
        
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        
        res.json(usuario);
    } catch(error) {
        res.status(500).json({ mensaje: "Error al obtener usuario", error: error.message });
    }
});

// RUTA POST: Para crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        console.log(' Body recibido:', req.body); // ← AGREGA ESTA LÍNEA
        const { name, email, age } = req.body;

        const nuevoUsuario = new user({
            name,
            email,
            age
        });

        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch(error) {
        res.status(400).json({ mensaje: "Error al crear usuario", error: error.message });
    }
});

// RUTA PUT: Actualizar un usuario completo
router.put('/:id', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        
        const usuarioActualizado = await user.findByIdAndUpdate(
            req.params.id,
            { name, email, age },
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json(usuarioActualizado);
    } catch(error) {
        res.status(400).json({ mensaje: "Error al actualizar usuario", error: error.message });
    }
});

// RUTA PATCH: Actualizar campos específicos (parcial)
router.patch('/:id', async (req, res) => {
    try {
        const usuarioActualizado = await user.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json(usuarioActualizado);
    } catch(error) {
        res.status(400).json({ mensaje: "Error al actualizar usuario", error: error.message });
    }
});

// RUTA DELETE: Eliminar un usuario
router.delete('/:id', async (req, res) => {
    try {
        const usuarioEliminado = await user.findByIdAndDelete(req.params.id);

        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Usuario eliminado correctamente", usuario: usuarioEliminado });
    } catch(error) {
        res.status(500).json({ mensaje: "Error al eliminar usuario", error: error.message });
    }
});

export default router;