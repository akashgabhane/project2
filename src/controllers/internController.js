const internModel = require("../models/internModel")

//------------------------------------------------Author Validation ------------------------------------------------------------------------

const handleError = (err) => {

    let errors = { name: '', email: '', }

    if (err.code === 11000) {
        errors.email = ' the email is already registered'
        return errors;
    }

    if (err.message.includes('intern validation failed')) {

        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });

        Object.keys(errors).forEach(k => (!errors[k] && errors[k] !== undefined) && delete errors[k]);

        return errors;
    }
}

//------------------------------------------------Create intern ------------------------------------------------------------------------

let createintern = async function(req, res) {
    try {
        let data = req.body
        let name = req.body.name;
        let mobile = req.body.mobile;
        let mail = req.body.email;
        let collageid = req.body.collageId;
        let regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9]+.)([a-z]+)(.[a-z])?$/
        let regex1 = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/

        // if (data.length != 0) return res.status(400).send("Please Enter Data")
        if (!name) return res.status(400).send("Please Enter your Full Name");
        if (!mail) return res.status(400).send({ status: false, msg: "Please Enter your Email" });
        if (!regx.test(mail)) return res.status(400).send("Please Enter a valid EmailId");
        let uniqueEmail = await internModel.findOne({ email: mail })
        if (!uniqueEmail) return res.status(400).send({ status: false, msg: "Email id Already exist" })
        if (!mobile) return res.status(400).send({ status: false, msg: "Please Enter your Mobile number" });
        if (!regex1.test(mobile)) return res.status(400).send("Please Enter Valid 10 digit Mobile number");
        let uniqueMobile = await internModel.findOne({ mobile: mobile })
        if (!uniqueMobile) return res.status(400).send({ status: false, msg: "Mobile Number Already Exist" });
        if (!collageid) return res.status(400).send("Please Enter Collage Id");
        let collage = await authorModel.findById({ _id: collageid });
        if (!collage) return res.status(400).send("collage is not present")

        let saved = await internModel.create(data);
        res.status(201).send({ data: saved })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
};


module.exports.createintern = createintern