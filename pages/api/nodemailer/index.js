const nodemailer = require("nodemailer");

const emailHandler = async (req, res) => {
    const { method } = req;
    const { email } = req.body;

    switch (method) {
        case "POST":
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "minhcloudinary@gmail.com",
                    pass: "wenqafmrinypywot"
                }
            });
            
            const options = {
                from: "minhcloudinary@gmail.com",
                to: email,
                subject: "Test Email service",
                text: "Đây là email text",
                html: `<h2>Email from tester</h2><p>Đây là email được gửi tự động</p>`
            };

            transporter.sendMail(options, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ success: false, message: err.message });
                }
                console.log(result);
                return res.status(200).json({ success: true, message: "mail sent successfully"});
            });
            break;
        default:
            return res.status(500).json({ success: true, message: "Method not allowed" });
    }
}

export default emailHandler;