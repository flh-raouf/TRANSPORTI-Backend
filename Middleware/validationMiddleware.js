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
  body('type_camion').notEmpty().withMessage('Camion type is required'),
  body('num_ctrl_tech_camion').notEmpty().withMessage('Control technique camion number is required'),
  body('date_ctrl_tech_camion').isDate({ format: 'YYYY-MM-DD' }).withMessage('Valid control technique camion date is required')
];


const validateAddTrajet = [
  body('camion_id').notEmpty().withMessage('camion_id is required'),
  body('chauffeurs').isArray({ min: 1 }).withMessage('chauffeurs must be an array with at least one element'),
  body('chauffeurs.*.nom').notEmpty().withMessage('Chauffeur nom is required'),
  body('chauffeurs.*.prenom').notEmpty().withMessage('Chauffeur prenom is required'),
  body('chauffeurs.*.num_attestation').notEmpty().withMessage('Chauffeur num_attestation is required'),
  body('chauffeurs.*.num_brevet_matiere_dangeureuse').notEmpty().withMessage('Chauffeur num_brevet_matiere_dangeureuse is required'),
  body('chauffeurs.*.photo_conducteur').notEmpty().withMessage('Chauffeur photo_conducteur is required'),
  body('chauffeurs.*.source').notEmpty().withMessage('Chauffeur source is required'),
  body('chauffeurs.*.destination').notEmpty().withMessage('Chauffeur destination is required'),
  body('chauffeurs.*.date_heure_sortie').optional().isISO8601().withMessage('Chauffeur date_heure_sortie must be a valid datetime'),
  body('chauffeurs.*.date_heure_arrive_prevu').isISO8601().withMessage('Chauffeur date_heure_arrive_prevu must be a valid datetime'),
  
  body('matieres').isArray({ min: 1 }).withMessage('matieres must be an array with at least one element'),
  body('matieres.*.nom').notEmpty().withMessage('Matiere nom is required'),
  body('matieres.*.class').notEmpty().withMessage('Matiere class is required'),
  body('matieres.*.pictogramme').notEmpty().withMessage('Matiere pictogramme is required'),
  body('matieres.*.type').notEmpty().withMessage('Matiere type is required'),
  body('matieres.*.code_classification').notEmpty().withMessage('Matiere code_classification is required'),
  body('matieres.*.quantite').notEmpty().withMessage('Matiere quantite is required'),
  body('matieres.*.grp_emballage').notEmpty().withMessage('Matiere grp_emballage is required'),
  body('matieres.*.code_restriction_tunnel').notEmpty().withMessage('Matiere code_restriction_tunnel is required'),
  body('matieres.*.code_danger').notEmpty().withMessage('Matiere code_danger is required'),
  body('matieres.*.num_onu').notEmpty().withMessage('Matiere num_onu is required'),
  body('matieres.*.num_ctrl_tech_citerne').isInt().withMessage('Matiere num_ctrl_tech_citerne must be an integer'),
  body('matieres.*.date_ctrl_tech_citerne').isISO8601().withMessage('Matiere date_ctrl_tech_citerne must be a valid date'),
  body('matieres.*.num_assurance_citerne').isInt().withMessage('Matiere num_assurance_citerne must be an integer'),
  body('matieres.*.date_assurance_citerne').isISO8601().withMessage('Matiere date_assurance_citerne must be a valid date')
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
  body('gravite_accident').notEmpty().withMessage('Accident severity is required'),
  body('accident_date').isISO8601().withMessage('Accident date must be a valid date'),
  body('accident_time').notEmpty().withMessage('Accident time must be a valid time'),
  
];


const validateScanQrCode = [
  body('camion_id').notEmpty().withMessage('QR code is required')
];


const validateDelete = [
  body('camion_id').notEmpty().withMessage('camion_id is required'),
];


export {
  validateRequest,
  validateAddCamion,
  validateAddTrajet,
  validateRegisterEntreprise,
  validateLoginEntreprise,
  validateLoginBarage,
  validateAddAccident,
  validateScanQrCode,
  validateDelete
};
