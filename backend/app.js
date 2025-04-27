//CRUDE OPERATIONS
const express = require ('express')
const mongoose= require('mongoose')
const UserModel = require('./models/User.js')
const Club1Member = require('./models/Club1members')
const Eventmembers = require('./models/Eventmembers')
const ClubModel = require('./models/CLub.js')
const cors = require ('cors')



const app=express()
const port=3000

app.use(cors())

//to handle json data
app.use(express.json())

main()
  .then(()=>console.log("DB Connected"))
  .catch(err=>console.log(err))

async function main() {
    await mongoose.connect('mongodb+srv://rehankurian:RUbGNpBOFlRYsdIE@cluster0.ewak78h.mongodb.net/clubdata')
}

//get club data
app.get('/clubinfo/club1', async (req, res) => {
    try {
      const club = await ClubModel.findOne({ name: 'Club 1' }); // Assuming name = Club 1
      res.json(club);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

// enrollement form users
app.post('/enrolls',async(req,res)=>{
    try{
        var newenrollment={
            name: req.body.name,
            rollNo: req.body.rollNo,
            department: req.body.department, 
            contactNumber: req.body.contactNumber,
            clubName: req.body.clubName,
            email:req.body.email}
        var enrollmentdata = new Club1Member(newenrollment)                                      
        await enrollmentdata.save()    
                
       res.status(201).json({success:true,
                            message:'enrolled',}) 
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Enrollment failed',
            error: error.message
        });
    }
})

//Event form users
app.post('/events',async (req,res)=>{
    try {
        var neweventmember={
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            club:req.body.club

        }
        var eventdata= new Eventmembers(neweventmember) //create an instance
        await eventdata.save()
        res.status(201).json({success:true,
            message:'registration sucessfull',})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
})







// //display users
// app.get('/users',async(req,res)=>{
//     try{
//         const users=await User.find({})
//         res.status(200).json(users)
//     }
//     catch(error){
//         console.error(error)
//         res.status(500).json({error:error})
//     }
// })


// //update users
// app.patch('/users/:id',async(req,res)=>{
//     try{
//         const id=req.params.id
//         const updatedUser= await User.findByIdAndUpdate(id,req.body,{new:true})
//         if(!updatedUser) return res.status(404).json({message:'User is not available'})
//         res.status(200).json(updatedUser)
//     }
//     catch(error){
//         console.error(error)
//         res.status(500).json({error:error})
//     }
// })

// //delete user
// app.delete('/users/:id',async(req,res)=>{
//     try{
//         const deletedUser = await User.findByIdAndDelete(req.params.id)
//         if(!deletedUser) return res.status(404).json({message:'User not found'})
//             res.status(200).json({message:'User deleted successfully'})
//     }
//     catch(error){
//         console.error(error)
//         res.status(500).json({error:error})
//     }
// })

//Login Route
app.post('/users/login',async (req,res) => {
    try{
        const{email,password}=req.body
        //to check if a user exsist in this email
        const user=await UserModel.findOne({email:email})
        if(!user){
            return res.status(400).json({message:'User not Found'})
        }
        //if already exist then check password
        if (user.password === password) {
            return res.status(200).json({
              message: "Login Successful",
              role: user.role,
              name: user.name,
              email: user.email,
              regno: user.regno,
              contact: user.phone,
              clubs: user.clubs, 
              // send the array directly
            });
          }
          
        else{
            return res.status(400).json({message:'Invalid Password'})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({error:error.message})
    }
})

app.listen(port,()=>{
    console.log("Server started...")
})