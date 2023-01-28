import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const hemail = process.env.EMAIL;
  const hpass = process.env.PASSWORD;
  const host = process.env.HOST;
  const port = process.env.EMAIL_PORT;

  const transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
      user: hemail,
      pass: hpass,
    },
  });

  //informacion del email

  const info = await transport.sendMail({
    from: '"Uptask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "Uptask - Verifica tu cuenta",
    text: "Verifica tu cuenta en Uptask",
    html: `
        <p>Hola ${nombre} Verifica tu cuenta en Uptask</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: <a href='${process.env.FRONTEND_URL}/confirmar/${token}'>Verificar Cuenta</a></p>

        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const hemail = process.env.EMAIL;
  const hpass = process.env.PASSWORD;
  const host = process.env.HOST;
  const port = process.env.PORT;

  const transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
      user: hemail,
      pass: hpass,
    },
  });

  //informacion del email

  const info = await transport.sendMail({
    from: '"Uptask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "Uptask - Reestablece tu Password",
    text: "Reestablece tu Password",
    html: `
        <p>Hola ${nombre} has solicitado reestablecer tu password en Uptask</p>
        <p>sigue siguiente enlace para generar un nuevo password: <a href='${process.env.FRONTEND_URL}/olvide-password/${token}'>Reestablecer Password</a></p>

        <p>Si tu no solicitaste este cambio, puedes ignorar el mensaje</p>

       
    `,
  });
};
