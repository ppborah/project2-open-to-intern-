const internModel=require('../model/internModel')
const collegeModel=require('../model/collegeModel')

const createIntern=async function(req,res){

    try{

    let data=req.body

    if(!Object.keys(data).length) return res.status(400).send({status:false,msg:"Please Enter The Intern Details"})
    
    if(!data.name)return res.status(400).send({status:false,msg:"Please Enter The Name"})

    if(!data,mobile)return res.status(400).send({status:false,msg:"Please Enter The Mobile Number"})

    if(!data.email)return res.status(400).send({status:false,msg:"Please Enter The EmailID"})

    if(!data.collegeName)return res.status(400).send({status:false,msg:"Please Enter The College Name"})

    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(data.mobile)) 
    return res.status(400).send(
        {status:false,msg:`${data.mobile} is not a valid mobile number, Please provide a valid mobile number`})
    
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/).test(data.email)) 
        return res.status(400).send({ status: false, msg: "email Id is invalid" })

        let numberCheck =await internModel.findOne({mobile:data.mobile})

        if(numberCheck)return res.status(400).send({ status: false, msg: "Mobile Number Already Used" })

        let emailCheck =await internModel.findOne({email:data.email})

        if(emailCheck)return res.status(400).send({ status: false, msg: "EmailID Already Exists" })

        let checkCollege= await collegeModel.findOne({ name: data.collegeName, isDeleted: false })
        
        if (!checkCollege) {
            return res.status(400).send({
                status: false, message: `${collegeName} doesn't exists.`,
            });
        }

        let college_Id=checkCollege._id
        data.collegeId=college_Id

        const interData = await internModel.create(data);

        return res.status(201).send({ status: true, message: `Successfully applied for internship at ${data.collegeName}.`, data: savingInternDetails })
}
catch(err){
    res.status(500).send({status:false,error:err})
}
}


module.exports={createIntern}