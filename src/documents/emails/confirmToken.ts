export const ConfirmToken = (token: string) => {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verifica tu correo electrónico</title>
    <style>
      /* Estilos generales */
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        color: #333;
      }

      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .header {
        background: #1e2939;
        padding: 20px;
        text-align: center;
        color: white;
      }

      .logo {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .content {
        padding: 30px;
      }

      h1 {
        color: #202124;
        font-size: 24px;
        margin-top: 0;
      }

      p {
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .verification-code {
        background-color: #f8f9fa;
        border: 1px dashed #dadce0;
        border-radius: 6px;
        padding: 15px;
        text-align: center;
        margin: 25px 0;
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 8px;
        color: #be4499;
      }

      .button {
        display: inline-block;
        background-color: #1a73e8;
        color: white;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 4px;
        font-weight: 500;
        margin: 10px 0;
        text-align: center;
      }

      .footer {
        background-color: #f8f9fa;
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #5f6368;
        border-top: 1px solid #dadce0;
      }

      .footer a {
        color: #5f6368;
        text-decoration: none;
      }

      .note {
        font-size: 14px;
        color: #5f6368;
        margin-top: 25px;
        padding-top: 15px;
        border-top: 1px solid #eee;
      }

      .social-icons {
        margin: 15px 0;
      }

      .social-icons a {
        display: inline-block;
        margin: 0 8px;
      }

      @media only screen and (max-width: 600px) {
        .content {
          padding: 20px;
        }

        .verification-code {
          font-size: 24px;
          letter-spacing: 6px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <div class="logo">DashboardLile</div>
        <div>Verificación de correo electrónico</div>
      </div>

      <div class="content">
        <h1>Verifica tu dirección de correo electrónico</h1>

        <p>Hola</p>

        <p>
          Gracias por registrarte en <strong>DashboardLile</strong>. Para
          iniciar tu registro, necesitamos verificar que esta dirección de
          correo electrónico te pertenece.
        </p>

        <p>Por favor, utiliza el siguiente código de verificación:</p>

        <div class="verification-code" id="verificationCode">[${token}]</div>

        <p>
          Este código expirará en <strong>30 minutos</strong> por razones de
          seguridad.
        </p>

        <p>
          Si no has solicitado crear una cuenta en DashboardLile, puedes ignorar
          este mensaje.
        </p>
      </div>
    </div>
  </body>
</html>
`;
};
