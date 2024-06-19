import { body, validationResult } from 'express-validator';

// Middleware for validating request data
const validateRequest = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  };
};


const validateAddCamion = [
  body('num_carte_grise').notEmpty().withMessage('Carte grise number is required'),
  body('num_control_tech_vehicule').notEmpty().withMessage('Control technique vehicle number is required'),
  body('date_control_tech_vehicule').isDate().withMessage('Valid control technique vehicle date is required'),
  body('num_control_tech_citerne').notEmpty().withMessage('Control technique citerne number is required'),
  body('date_control_tech_citerne').isDate().withMessage('Valid control technique citerne date is required'),
  body('type_vehicule').notEmpty().withMessage('Vehicle type is required')
];


const validateAddTrajet = [
  body('camion_id').notEmpty().withMessage('camion_id is required'),
  body('chauffeurs').isArray({ min: 1 }).withMessage('chauffeurs must be an array with at least one element'),
  body('chauffeurs.*.nom').notEmpty().withMessage('Chauffeur nom is required'),
  body('chauffeurs.*.prenom').notEmpty().withMessage('Chauffeur prenom is required'),
  body('chauffeurs.*.num_attestation').notEmpty().withMessage('Chauffeur num_attestation is required'),
  body('chauffeurs.*.num_brevet_marchendise').notEmpty().withMessage('Chauffeur num_brevet_marchendise is required'),
  body('chauffeurs.*.num_brevet_metiere_dangeureuse').notEmpty().withMessage('Chauffeur num_brevet_metiere_dangeureuse is required'),
  body('matieres').isArray({ min: 1 }).withMessage('matieres must be an array with at least one element'),
  body('matieres.*.class').notEmpty().withMessage('Matiere class is required'),
  body('matieres.*.pectorgramme').notEmpty().withMessage('Matiere pectorgramme is required'),
  body('matieres.*.code_classification').notEmpty().withMessage('Matiere code_classification is required'),
  body('matieres.*.grp_emballage').notEmpty().withMessage('Matiere grp_emballage is required'),
  body('matieres.*.qt_lim_excepte').notEmpty().withMessage('Matiere qt_lim_excepte is required'),
  body('matieres.*.code_restriction').notEmpty().withMessage('Matiere code_restriction is required'),
  body('matieres.*.num_auth_produit').notEmpty().withMessage('Matiere num_auth_produit is required'),
  body('matieres.*.inst_emballage').notEmpty().withMessage('Matiere inst_emballage is required'),
  body('matieres.*.inst_special').notEmpty().withMessage('Matiere inst_special is required'),
  body('matieres.*.code_citerne').notEmpty().withMessage('Matiere code_citerne is required')
];


const validateRegisterEntreprise = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('name').notEmpty().withMessage('Name is required')
];


const validateLoginEntreprise = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];


const validateLoginBarage = [
  body('barage_id').notEmpty().withMessage('barage_id is required'),
  body('password').notEmpty().withMessage('Password is required')
];


const validateAddAccident = [
  body('gravite_accident').notEmpty().withMessage('Accident severity is required')
];


const validateScanQrCode = [
  body('camion_id').notEmpty().withMessage('QR code is required')
];


export {
  validateRequest,
  validateAddCamion,
  validateAddTrajet,
  validateRegisterEntreprise,
  validateLoginEntreprise,
  validateLoginBarage,
  validateAddAccident,
  validateScanQrCode
};
