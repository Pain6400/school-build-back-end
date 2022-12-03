import axios from "axios";
import { validationResult, body, param } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next()
}

export const paramLinkValidator = [
    param("linkId", "Formato incorrecto (Mongoo)")
        .trim()
        .notEmpty()
        .escape(),
        validationResultExpress
];

export const bodyLinkValidator = [
    body("longLink", "Formato incorrecto")
    .trim()
    .notEmpty()
    .custom(async value => {
        try {
            if(!value.startsWith('https://')) {
                value = 'https://' + value;
            }
            
            await axios.get(value);
            return value;
        } catch (error) {
            throw new Error("NOT FOUND LONGlINK 404");
        }
    }),
    validationResultExpress
];

export const bodyRegisterValidator = [
    body("school_id", "Formato incorrecto")
        .trim()
        .notEmpty(),
    body("type_id", "Formato incorrecto")
        .trim()
        .notEmpty(),
    body("user_name", "Formato incorrecto")
        .trim()
        .notEmpty(),
    body("name", "Formato incorrecto")
        .trim()
        .notEmpty(),
    body("phone_number", "Formato incorrecto")
        .trim()
        .notEmpty()
        .isLength( { min: 8, max: 8 }),
    body("date_birth", "Formato incorrecto")
        .trim()
        .notEmpty(),
    body('email', "Formato incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("picture", "Formato incorrecto")
        .trim(),
    body("password", "Minimo 6 caracteres")        
        .trim()
        .isLength( { min: 6 }),
    body("password", "Formato incorrecto")
        .custom((value, {req}) => {
            if(value !== req.body.repassword) {
                throw new Error("La contraseñas no coinciden")
            }

            return value;
            }
        ),
        validationResultExpress,
];

export const bodyUpdateValidator = [
    body("name", "Formato incorrecto")
        .trim()
        .notEmpty(),
    body("phone_number", "Formato incorrecto")
        .trim()
        .notEmpty()
        .isLength( { min: 8, max: 8 }),
    body("date_birth", "Formato incorrecto")
        .trim()
        .notEmpty(),
    body('email', "Formato incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("picture", "Formato incorrecto")
        .trim(),
    validationResultExpress,
];

export const bodyLoginValidator = [
    body('email', "Formato incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
    validationResultExpress
];

export const bodyRoleValidator = [
    body("code", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    body("name", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    body("description", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    validationResultExpress
];

export const bodyUserRoleValidator = [
    body("user_id", "Formato Incorrecto")
    .trim()
    .notEmpty(),
    body("role_id", "Formato Incorrecto")
    .trim()
    .notEmpty(),
    validationResultExpress
];

//#region Configuracion 

export const bodyUserTypeValidator = [
    body("code", "Formato Incorrecto")
    .trim()
    .notEmpty()
    .isLength({ max: 3 }),
    body("title", "Formato Incorrecto")
        .trim()
        .notEmpty()
        .isLength({ max: 50 }),
    body("description", "Formato Incorrecto")
        .trim()
        .notEmpty()
        .isLength({ max: 250 }),
        validationResultExpress
];

export const bodyCurrencyTypeValidator = [
    body("code", "Formato Incorrecto")
        .trim()
        .notEmpty()
        .isLength({ max: 3 }),
    body("name", "Formato Incorrecto")
        .trim()
        .notEmpty()
        .isLength({ max: 50 }),
    validationResultExpress
];

export const bodyPlanTypeValidator = [
    body("code", "Formato Incorrecto")
        .trim()
        .notEmpty()
        .isLength({ max: 3 }),
    body("name", "Formato Incorrecto")
        .trim()
        .notEmpty()
        .isLength({ max: 50 }),
    body("description", "Formato Incorrecto")
        .trim()
        .notEmpty()
        .isLength({ max: 250 }),
    body("currency_id", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    body("price", "Formato Incorrecto")
        .trim()
        .isDecimal()
        .notEmpty(),
    validationResultExpress
];

//#endregion end configuration

//#region Gender
export const bodyGenderValidator = [
    body("code", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    body("description", "Formato Incorrecto")
        .trim()
        .notEmpty()
        .isLength({ max: 250 }),
    validationResultExpress
];
//#endregion

//#region Grade
export const bodyGradeValidator = [
    body("code", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    body("name", "Formato Incorrecto")
    .trim()
    .notEmpty(),
    body("description", "Formato Incorrecto")
        .trim()
        .notEmpty()
        .isLength({ max: 250 }),
    validationResultExpress
];
//#endregion

//#region school
export const bodySchoolValidator = [
    body("plan_id", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    body("name", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    body("description", "Formato Incorrecto")
        .trim()
        .notEmpty()
        .isLength({ max: 250 }),

    body("address", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    validationResultExpress
];
//#endregion end school

//#region teacher 
export const bodyTeacherValidator = [
    body("user_id", "Formato Incorrecto")
    .trim()
    .notEmpty(),
    body("gender_id", "Formato Incorrecto")
    .trim()
    .notEmpty(),
    body("identidad", "Formato Incorrecto")
    .trim()
    .notEmpty()
    .isLength({ min: 13, max: 13})
    .withMessage("La longitud debe ser de 13 caracteres exactos"),
    body("name", "Formato Incorrecto")
    .trim()
    .notEmpty(),
    body("email", "Formato Incorrecto")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Formato de email incorrecto"),
    body("phone", "Formato Incorrecto")
    .trim()
    .notEmpty()
    .isLength({ min: 8, max: 8})
    .withMessage("La longitud deve de ser de 8 caracteres exactos"),
    body("join_date", "Formato Incorrecto")
    .trim()
    .notEmpty(),
    validationResultExpress
];
//#region 

//#region Class
export const bodyClassValidator = [
    body("school_id", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    body("class_room_id", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    body("teacher_id", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    body("grade_id", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    body("name", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    body("description", "Formato Incorrecto")
        .trim()
        .notEmpty()
        .isLength({ max: 250 }),
    validationResultExpress
];

export const bodyClassRoomValidator = [
    body("code", "Formato Incorrecto")
        .trim()
        .notEmpty(),
    body("capacity", "Formato Incorrecto")
        .trim()
        .notEmpty()
        .isInt(),
    body("description", "Formato Incorrecto")
        .trim()
        .notEmpty()
        .isLength({ max: 250 }),
    validationResultExpress
];

//#endregion