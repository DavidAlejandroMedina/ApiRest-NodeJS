const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { 
    crearHeroe,
    obtenerHeroes,
    obtenerHeroe,
    actualizarHeroe, 
    borrarHeroe 
} = require('../controllers/MongoHeroes');

const { existeHeroePorId } = require('../helpers/db-validators');

const router = Router();


//  Obtener todas las Heroes - publico
router.get('/', obtenerHeroes );

// Obtener una Heroes por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeHeroePorId ),
    validarCampos,
], obtenerHeroe );

// Crear Heroes - privado - cualquier persona con un token válido
router.post('/', [ 
    //validarJWT,
    check('nombre','El nombre del heroe es obligatorio').not().isEmpty(),
    validarCampos
], crearHeroe );

// Actualizar Heroe - privado - cualquiera con token válido
router.put('/:id',[
    //validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeHeroePorId ),
    validarCampos
], actualizarHeroe );

// Borrar un Heroe
router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeHeroePorId ),
    validarCampos,
], borrarHeroe);

module.exports = router;