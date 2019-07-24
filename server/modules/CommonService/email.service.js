var mongoose = require('mongoose');
import settings from '../../../settings';
const fs = require('fs');
const path = require('path');
var pdf = require('html-pdf');
let config = require('./../../../config/' + settings.environment + '.config').default;
const nodemailer = require('nodemailer');
var pdfCount = 0
const EmailService = {
    sendEmail: async (user) => {
        try {
            let userTemplate = await fs.readFileSync(
                path.join(__dirname, "../template/user.html"),
                "utf-8"
            );
            pdfCount++;
            nodemailer.createTestAccount((err, account) => {
                var options = {
                    "format": "A4",
                    "orientation": "portrait",
                    'Content_Type': 'application/pdf',
                    "border": {
                        "top": "0.2in",
                        "right": "0.2in",
                        "bottom": "0.2in",
                        "left": "0.2in"
                    },
                    "timeout": "120000"
                };

                console.log(user.image);
                userTemplate = userTemplate.replace('{logo}', path.normalize('file://'+user.image))
                    .replace('{name}', user.name)
                    .replace('{role}', user.role)
                    .replace('{email}', user.email)
                    .replace('{phone}', user.phone);
                    console.log(userTemplate)
                pdfCount++
                const fileName = "product_pdf(" + pdfCount + ").pdf";
                const filePath = path.join(__dirname + "/pdf", fileName)
                pdf.create(userTemplate, options).toFile(filePath, function (err, pdfPath) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(pdfPath);
                        let transporter = nodemailer.createTransport({
                            host: config.smtp.host,
                            port: config.smtp.port,
                            secure: true,
                            auth: {
                                user: config.smtp.email,
                                pass: config.smtp.password
                            }
                        });
                        pdfCount++
                        var attachments = [{
                            filename: 'detail.pdf',
                            path: pdfPath.filename // stream this file
                        }]
                        let mailOptions = {
                            from: '"google@gmail.com" ',
                            to: user.email, // Recepient email address. Multiple emails can send separated by commas
                            subject: 'Welcome Email',
                            text: 'Your detail are below',
                            attachments: attachments,
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);
                        });
                    }
                });
            });
        } catch (error) {
            console.log(error)
        }
    }
}
export default EmailService;