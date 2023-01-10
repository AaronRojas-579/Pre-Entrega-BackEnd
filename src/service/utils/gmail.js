const { createTransport } = require("nodemailer")
//Variables de entorno 
require("dotenv").config()
const MAIL_ADMIN = process.env.MAIL_ADMIN;

const transporter = createTransport({
    service:"gmail",
    port:587,
    auth:{
        user:MAIL_ADMIN,
        pass:process.env.PASS_ADMIN
    }
})


const enviarMail = async (receptor,mensajePedidos,tel)=>{ 
    try{
        const info =await transporter.sendMail({
            from:"Administrador de la Página",
            to:receptor,
            subject:"El Vendedor ya recibio tu pedido",
            html:`
            <h2>Tu pedido:</h2>
            ${mensajePedidos}
            <h3>Para mas información sobre el estado de tu pedido puede comunicarte con el vendedor:</h3>
            tel:${tel}
            `,
        })
        console.log(info)
    }catch(err){
        console.log(err)
    }
} 
const mailNuevoRegistro = async (objUser)=>{ 
    try{
        const info =await transporter.sendMail({
            from:"Administrador de la Página",
            to:MAIL_ADMIN,
            subject:"Nuevo Registro",
            html:`
                <h3>Username</h3>
                <h4 style="color:red">${objUser.username}</h4>
                <br>
                <h3>Foto de Perfil</h3>
                <img src="${objUser.url}" alt="foto de perfil">
                <br>
                <h3>Correo Electronico</h3>
                <h4 style="color:red">${objUser.email}</h4>
                <br>
                <h3>Número de Telefono</h3>
                <h4 style="color:red">${objUser.tel}</h4>
            `,
        })
        console.log(info)
    }catch(err){
        console.log(err)
    }
}  

module.exports={enviarMail,mailNuevoRegistro}