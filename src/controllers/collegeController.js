const collegeModel = require("../models/collegeModel")

//------------------------------------------------College  Validation ------------------------------------------------------------------------

const handleError = (err) => {

    let errors = { name: '', fullName: '' }

    if (err.code === 11000) {
        errors.email = ' the email is already registered'
        return errors;
    }

    if (err.message.includes('College validation failed')) {

        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });

        Object.keys(errors).forEach(k => (!errors[k] && errors[k] !== undefined) && delete errors[k]);

        return errors;
    }
}

//------------------------------------------------Create college ------------------------------------------------------------------------

const createCollege = async function(req, res) {
    try {
        let data = req.body

        let college = await collegeModel.create(data)
        res.status(201).send({ data: college })

    } catch (error) {
        const errors = handleError(error)
        res.status(400).send({ errors })
    }
}

module.exports.createCollege = createCollege