module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define('usuarios', {
        Id_usuarios: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // Autoincremento para el ID del usuario
        },
        Nombre: {
            type: Sequelize.STRING(50) // Hasta 50 caracteres para el nombre
        },
        Apellido: {
            type: Sequelize.STRING(50) // Hasta 50 caracteres para el apellido
        },
        Email: {
            type: Sequelize.STRING(100), // Hasta 100 caracteres para el email
            validate: {
                isEmail: true // Validación de email
            }
        },
        Teléfono: {
            type: Sequelize.STRING(15) // Hasta 15 caracteres para el teléfono
        },
        Dirección: {
            type: Sequelize.STRING(100) // Hasta 100 caracteres para la dirección
        },
        Fecha_registro: {
            type: Sequelize.DATE, // Fecha de registro del usuario
            defaultValue: Sequelize.NOW // Valor por defecto: fecha y hora actual
        },
        Estado: {
            type: Sequelize.STRING(20) // Estado del usuario (activo, inactivo, suspendido, etc.)
        }
    });
    
    return Usuarios;
};
