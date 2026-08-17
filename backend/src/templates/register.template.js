const registerTemplate = (name) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Verify Your Email</title>
        </head>

        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px;">

                <h2>Welcome to Sonar Bank, ${name}!</h2>

                <p>
                    Thank you for registering with Sonar Bank.
                </p>

                <p>
                    Regards,<br>
                    <strong>Sonar Bank Team</strong>
                </p>

            </div>
        </body>
        </html>
    `;
};

export default registerTemplate;