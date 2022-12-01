import { Class } from "../models/Class.js"

export const getClassByScool = async(req, res) => {
    try {
        const { school_id } = req.params;
        const classes = await Class.find({ school_id: school_id })
        
        return res.status(200).json({ status: true, message: "Peticion Exitosa", classes});        
    } catch (error) {
        return res.status(500).json({ status: false, message: error})
    }
}