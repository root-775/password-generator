import logger from "../helpers/logger.js";
import passwordModel from "../models/passwordModel.js"


export const savePasswordController = async (req, res) => {
    try {
        logger.info(req.body);
        const { passwordValue, passwordType, generationMode } = req.body;

        if (!passwordValue) {
            return res.send({
                status: false,
                message: "Password value is required",
            })
        }
        if (!passwordType) {
            return res.send({
                status: false,
                message: "Password Type value is required",
            })
        }
        if (!generationMode) {
            return res.send({
                status: false,
                message: "Generation Mode value is required",
            })
        }
        const password = await new passwordModel({
            passwordValue: passwordValue,
            passwordType: passwordType,
            generationMode: generationMode
        }).save()

        res.status(200).send({
            status: true,
            data: password,
            message: "Error while save password",
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Error while save password",
            error: error
        })
    }
}


export const getAllPasswordController = async (req, res) => {
    try {
        const passwords = await passwordModel.find({}).sort({ createdAt: -1 });
        res.status(200).send({
            status: true,
            message: 'All Password getting Successfully',
            passwords: passwords,
        })

    } catch (error) {
        res.status(500).send({
            status: false,
            message: "error while getting all passwords",
            error: error
        })
    }
}


export const updatePasswordController = async (req, res) => {
    try {
        logger.info(req.body);

        const { id } = req.params;
        const { passwordValue, passwordType, generationMode } = req.body;

        const updatedPassword = await passwordModel.findByIdAndUpdate({ _id: id }, {
            passwordValue: passwordValue,
            passwordType: passwordType,
            generationMode: generationMode,
        }, { new: true })

        res.status(200).send({
            status: true,
            message: 'Password data is updated',
            password: updatedPassword
        })


    } catch (error) {
        res.status(500).send({
            status: false,
            message: "error while update passwords",
            error: error
        })
    }
}



export const deletePasswordController = async (req, res) => {
    try {
        const { id } = req.params;
        const password = await passwordModel.findById({ _id: id });
        if (!password._id) {
            return res.status(400).send({
                status: false,
                message: 'Password details is not found, please try again',
            })
        }
        await passwordModel.removeOne({ _id: password._id })

        res.status(200).send({
            status: true,
            message: 'Password deleted is successfully',
        })

    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'error while delete password',
            error: error
        })
    }
}


