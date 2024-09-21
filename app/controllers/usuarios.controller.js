const db = require('../config/db.config.js');
const Usuarios = db.Usuarios;

// Crear un nuevo usuario
exports.create = (req, res) => {
    let usuario = {};

    try {
        usuario.Nombre = req.body.Nombre;
        usuario.Apellido = req.body.Apellido;
        usuario.Email = req.body.Email;
        usuario.Teléfono = req.body.Teléfono;
        usuario.Dirección = req.body.Dirección;
        usuario.Fecha_registro = req.body.Fecha_registro || new Date(); // Fecha actual si no se proporciona
        usuario.Estado = req.body.Estado;

        Usuarios.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario creado exitosamente con ID = " + result.Id_usuarios,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Recuperar todos los usuarios
exports.retrieveAllUsuarios = (req, res) => {
    Usuarios.findAll()
        .then(usuarioInfos => {
            res.status(200).json({
                message: "Obtención de todos los usuarios exitosa!",
                usuarios: usuarioInfos
            });
        })
        .catch(error => {
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

// Obtener un usuario por su ID
exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id;
    Usuarios.findByPk(usuarioId)
        .then(usuario => {
            if (usuario) {
                res.status(200).json({
                    message: "Usuario obtenido con éxito con ID = " + usuarioId,
                    usuario: usuario
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el usuario con ID = " + usuarioId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });
}

// Actualizar un usuario por su ID
exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuarios.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No se encontró el usuario con ID = " + usuarioId,
                error: "404"
            });
        } else {
            let updatedObject = {
                Nombre: req.body.Nombre,
                Apellido: req.body.Apellido,
                Email: req.body.Email,
                Teléfono: req.body.Teléfono,
                Dirección: req.body.Dirección,
                Estado: req.body.Estado
            };

            let result = await Usuarios.update(updatedObject, { returning: true, where: { Id_usuarios: usuarioId } });

            if (!result || result[0] === 0) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el usuario con ID = " + usuarioId,
                    error: "No se actualizó"
                });
            } else {
                res.status(200).json({
                    message: "Usuario actualizado exitosamente con ID = " + usuarioId,
                    usuario: updatedObject
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el usuario con ID = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un usuario por su ID
exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuarios.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe un usuario con ID = " + usuarioId,
                error: "404"
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado exitosamente con ID = " + usuarioId,
                usuario: usuario
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo eliminar el usuario con ID = " + req.params.id,
            error: error.message
        });
    }
}
