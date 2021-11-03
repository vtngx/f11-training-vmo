let events = require('events')
events = new events.EventEmitter()
const nodemailer = require('nodemailer')

/*
  payload: {
    type*: "user" or "order"
    to*: receiver

    //  "user"
    username
    password

    //  "order"
    username
    orderId
  }
*/
const sendMail = (payload) => {
  const check = 1

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: payload.to,
    subject: '',
    text: ''
  }

  if (payload.type === 'user') {
    mailOptions.subject += `Welcome new User!`
    mailOptions.text += `Welcome to our system, ${payload.username}\n` +
      `Your password if ${payload.password}`
  } else if (payload.type === 'order') {
    mailOptions.subject += `New Order!`
    mailOptions.text += `You just made an order, ${payload.username}\n` +
      `Track your order with this ID: ${payload.orderId}`
  }

  const send = () => {
    transporter.sendMail(mailOptions, (err, success) => {
      if (err)
        events.emit('error', err)
  
      if (success)
        events.emit('success', success)
    })
  }

  send()

  events.on("error", err => {
    console.log("> Failed to send email\nError:", err)

    if (check < process.env.MAX_MAIL_RETRIES)
      send()

    check++
  })

  events.on("success", success => {
    console.log("> Email send:", success.response);
  })
}

module.exports = {
  sendMail
}