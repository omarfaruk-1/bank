

export function sendEmailTransaction(fromAccount,name, toAccount, amount) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Transaction Notification</title>
    </head>
    <body>
        <h1>Transaction Notification</h1>
        <p>Hello ${name},</p>
        <p>A transaction has been completed from your account (${fromAccount}) to account (${toAccount}).</p>
        <p>Amount: ${amount}</p>
    </body>
    </html>
`;
 