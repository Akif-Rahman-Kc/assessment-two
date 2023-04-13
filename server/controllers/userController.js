const db = require('../config/connection')
const bcrypt = require('bcrypt')
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
let SID

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    getOtp: async (req, res) =>{
        try {
            const { phoneNo } = req.body
            let phoneExist = false
            const sqlSelectOne = "SELECT * FROM user_schema.users WHERE phoneNo = ?"
                db.query(sqlSelectOne, [phoneNo], (err, result)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        if (result != '') {
                            phoneExist = true
                        }
                    }
                })
                setTimeout(() => {
                    if (phoneExist) {
                        // const sqlDelete = "DELETE FROM users WHERE phoneNo = '9562696976'"
                        // db.query(sqlDelete)
                        res.json({status:'failed'})
                    } else {
                        client.verify.v2.services
                        .create({friendlyName:'my web app'})
                        .then((service) =>{
                            SID=service.sid;
                            client.verify.v2.services(service.sid)
                            .verifications.create({to:'+91'+phoneNo, channel: 'sms'})
                            .then(verification => console.log(verification.status))
                
                        }
                        ).catch((err) =>{
                            console.log(err)
                        })
                        res.json({status:'success'})
                    }
                }, 1500);
        } catch (error) {
            console.log(error)
        }
    },
    userRegister: async (req, res) =>{
        try {
            let image = (req.file) ? req.file.filename : ''
            const { firstName, lastName, email, phoneNo, otp } = req.body
            let password = req.body.password
            let validation
            await client.verify.v2.services(SID)
                .verificationChecks
                .create({to:'+91'+phoneNo, code: otp})
                .then((verification_check) => {
                validation= verification_check
            })
            if (validation.valid) {
                password = await bcrypt.hash(password, 10);
                console.log(password);
                let inserted = false
                const sqlInsert = "INSERT INTO users (firstName, lastName, email, password, phoneNo, otp, image) VALUES (?, ?, ?, ?, ?, ?, ?);"
                db.query(sqlInsert, [firstName, lastName, email, password, phoneNo, otp, image], (err, result)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        if (result != '') {
                            inserted = true
                        }
                    }
                })
                setTimeout(() => {
                    if (inserted) {
                        let user
                        const sqlSelectOne = "SELECT * FROM user_schema.users WHERE phoneNo = ?"
                        db.query(sqlSelectOne, [phoneNo], (err, result)=>{
                            if (err) {
                                console.log(err);
                            } else {
                                user = result[0]
                                res.json({user, status:'success'})
                            }
                        })
                    }else{
                        res.json({status:'failed'})
                    }
                }, 1500);
              } else {
                res.json({status:'failed'})
              }
            
        } catch (error) {
            console.log(error)
        }
    },
    login: async (req, res) =>{
        try {
            const {phoneNo, password } = req.body
            const sqlSelectOne = "SELECT * FROM user_schema.users WHERE phoneNo = ?"
            db.query(sqlSelectOne, [phoneNo], async (err, result)=>{
                if (err) {
                    console.log(err);
                } else {
                    if (result == '') {
                        res.json({status:"failed", phoneNo:true})
                    } else {
                        user = result[0]
                        const pass = await bcrypt.compare(password, user.password);
                        if (pass) {
                            res.json({user, status:'success'})
                        } else {
                            res.json({status:"failed", password:true})
                        }
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    },
}