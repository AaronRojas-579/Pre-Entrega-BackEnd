require("dotenv").config()
const twilio = require("twilio")

const cliente = twilio(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN)

// const option ={
//     body:`Hola nuevos`,
//     from:`whatsapp:+14155238886`,
//     to:`whatsapp:${process.env.MY_NUMBER}`,
//     mediaUrl: 'https://scontent.faep14-2.fna.fbcdn.net/v/t39.30808-6/312610898_2343160852514365_7414254586563660435_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG_s0jeroxAiYO1XycoGIhdTVudWcX2N3FNW51ZxfY3cVwMgYC3odzU8YdH9C7k7KQpKr4IQ3ao3UGbiTUWWpww&_nc_ohc=Ix0yoQDTTHEAX_fq4bZ&_nc_ht=scontent.faep14-2.fna&oh=00_AfB2hx8qRg7T0Ye_0bPLY9Nz1woYOdpx3sFENt-md7lJhQ&oe=63C103D5',
// }

const enviarMensajeWhatsapp = async (mensajePedidos,user)=>{
    try{
        const message = await cliente.messages.create({
            body:`Tenes un nuevo pedido de:\n ${mensajePedidos}\nPara el cliente :${user.username}\n Mail: ${user.email}\nTel : ${user.tel}
             `,
            from:`whatsapp:+14155238886`,
            to:`whatsapp:${process.env.MY_NUMBER}`,
            // mediaUrl: 'https://scontent.faep14-2.fna.fbcdn.net/v/t39.30808-6/312610898_2343160852514365_7414254586563660435_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG_s0jeroxAiYO1XycoGIhdTVudWcX2N3FNW51ZxfY3cVwMgYC3odzU8YdH9C7k7KQpKr4IQ3ao3UGbiTUWWpww&_nc_ohc=Ix0yoQDTTHEAX_fq4bZ&_nc_ht=scontent.faep14-2.fna&oh=00_AfB2hx8qRg7T0Ye_0bPLY9Nz1woYOdpx3sFENt-md7lJhQ&oe=63C103D5',
        })
        console.log(message)
    }catch(err){
        console.log(err)
    }
}

const mensajePedidos =(arrPedidos)=>{
    const html = arrPedidos.map(elem=>{
        return(`+ ${elem.cantidad} unidades de ${elem.nombre} = $${elem.total}`)
    }).join("\n ")
    return html
}

module.exports =  {enviarMensajeWhatsapp,mensajePedidos}