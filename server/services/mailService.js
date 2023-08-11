const config = require ( "config" );
const nodemailer = require ( "nodemailer" )


class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport (
            {
                service:'gmail',
                auth: {
                    user: config.get("SMTP_USER") ,
                    pass: config.get("SMTP_PASSWORD")
                }
            }
        )
    }

    async sendActivationMail( to , link ) {
        await this.transporter.sendMail (
            {
                from: config.get("SMTP_USER") ,
                to ,
                subject: "Activation account" + config.get("API_URL") ,
                text: '' ,
                html: `
                <div>
                <h1>
                 <a href="${ link }">
                 ${ link }
                 </a>
                 </h1>
                 </div>
                `
            }
        )
    }
}

module.exports = new MailService ()