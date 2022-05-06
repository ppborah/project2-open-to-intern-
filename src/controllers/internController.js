const internModel = require('../model/internModel')
const collegeModel = require('../model/collegeModel')

/********************************************************************Create Intern Api*********************************************************/

const createIntern = async function (req, res) {

    try {

        let data = req.body  /*we take Input Here and check all the field and value*/

        if (!Object.keys(data).length) return res.status(400).send({ status: false, msg: "Please Enter The Intern Details" })

        if (!data.name) return res.status(400).send({ status: false, msg: "Please Enter The Intern Name" })

        if (!data.name.match(/^[a-zA-Z. ]{2,30}$/)) return res.status(400).send({ status: false, msg: "Please Enter A valid Intern Name" })

        if (!data.mobile) return res.status(400).send({ status: false, msg: "Please Enter The Intern Mobile Number" })

        if (!data.email) return res.status(400).send({ status: false, msg: "Please Enter The Intern EmailID" })

        if (!data.collegeName) return res.status(400).send({ status: false, msg: "Please Enter The Intern's College Name" })

        if (data.isDeleted == true) return res.status(400).send({ status: false, msg: "isDeleted cannot be true While Creating a Document" });

        if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(data.mobile))   /*validate Mobile Number*/

        return res.status(400).send({ status: false, msg: `${data.mobile} is not a valid mobile number, Please provide a valid mobile number` })

        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/).test(data.email))   /*validate Email ID*/

            return res.status(400).send({ status: false, msg: "email Id is invalid" })

        let numberCheck = await internModel.findOne({ mobile: data.mobile })    /*Check Mobile From DB*/

        if (numberCheck) return res.status(400).send({ status: false, msg: "Mobile Number Already Used" })
 
        let emailCheck = await internModel.findOne({ email: data.email })      /*Check EmailId From DB*/

        if (emailCheck) return res.status(400).send({ status: false, msg: "EmailID Already Exists" })

        let collge_Name=data.collegeName.toLowerCase().trim()        
        
        let checkCollege = await collegeModel.findOne({ name: collge_Name , isDeleted: false }) /*Check College Name From DB*/
         
        if (!checkCollege) return res.status(400).send({status: false, message:`${collge_Name} : No such college Name Not Found!`});

        let college_Id = checkCollege._id   /*Get College Id from CheckCollege*/

        data.collegeId = college_Id      /*Insert CollegeId in Data Object*/

        const saveInterData = await internModel.create(data);  /*Create Intern here*/

        return res.status(201).send({ status: true, message: `Successfully applied for internship at ${collge_Name}.`, data: saveInterData })
    }
    catch (err) {

        res.status(500).send({ status: false, error: err.message })
    }
}


module.exports = { createIntern }