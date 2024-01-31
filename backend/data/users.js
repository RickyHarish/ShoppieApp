import bcrypt from 'bcryptjs'


const users = [
    {
        name:"Admin User",
        email:'admin@example.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin:true
    },
    {
        name:"Khalida Tanveer",
        email:'tanveer@example.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin:false
    },
    {
        name:"Santhoshi",
        email:'santhoshi@example.com',
        password:bcrypt.hashSync('123456', 10),
        isAdmin:false
    },

]

export default users