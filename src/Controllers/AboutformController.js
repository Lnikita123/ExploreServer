const AboutModel = require("../Models/AboutformModel");
const nodemailer = require("nodemailer");

const aboutformData = async (req, res) => {
    try {
        const { Name, Email, Phone, Message } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "palnesto886@gmail.com",
                pass: "pvhq gkjp sihd qdxn", // Consider using environment variables for sensitive information
            },
        });

        const mailOptions = {
            from: "palnesto886@gmail.com",
            to: "info@palnesto.biz",
            subject: "Submission for ExploreIt contactInfo",
            text: `
                Name: ${Name}
                Email: ${Email}
                Phone: ${Phone}
                Message: ${Message}
            `,
        };

        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });

        const datacreate = await AboutModel.create({ Name, Email, Phone, Message });
        return res.status(201).send({
            status: true,
            msg: "Data created successfully, and email sent",
            data: datacreate,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, msg: "Server error", error: err.message });
    }
};

module.exports = {
    aboutformData,
};
