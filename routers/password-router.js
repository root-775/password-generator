import { Router } from "express";
import {
    savePasswordController,
    getAllPasswordController,
    updatePasswordController,
    deletePasswordController
} from "../controllers/passwordController.js";


const route = Router()


// SAVE PASSWORD || METHOD POST
route.post('/password', savePasswordController)

// GET ALL PASSWORDS || METHOD GET
route.get('/passwords', getAllPasswordController)

// UPDATE PASSWORD || METHOD PUT
route.put('/password/:id', updatePasswordController)

// DELETE PASSWORD || METHOD DELETE
route.delete('/password/:id', deletePasswordController)



export default route;

