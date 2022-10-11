const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const smtpAccountCreationFunc = async (
  verificationToken,
  newUserInvalidated,
  res
) => {
  SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
    process.env.SENDINBLUE_API_KEY;

  new SibApiV3Sdk.TransactionalEmailsApi()
    .sendTransacEmail({
      sender: { email: "sendinblue@sendinblue.com", name: "muLa" },
      subject: "Account Creation Verification",
      htmlContent: `<h2>Please click the link to activate your account within a day.</h2>
 <a href=${process.env.CLIENT_URL}/verify-register/${verificationToken}>Click to Verify</a>`,
      messageVersions: [
        {
          to: [
            {
              email: newUserInvalidated.email,
            },
          ],
        },
      ],
    })
    .then(
      function (data) {
        // console.log(data);
        return res.status(200).json(newUserInvalidated);
      },
      function (error) {
        console.error(error);
        throw new Error(error);
      }
    );
};

const smtpForgotPasswordFunc = async (
  verificationToken,
  recievedEmail,
  res
) => {
  SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
    process.env.SENDINBLUE_API_KEY;

  new SibApiV3Sdk.TransactionalEmailsApi()
    .sendTransacEmail({
      sender: { email: "sendinblue@sendinblue.com", name: "muLa" },
      subject: "Account Creation Verification",
      htmlContent: `<h2>Please click the link to activate your account within a day.</h2>
 <a href=${process.env.CLIENT_URL}/verify-register/${verificationToken}>Click to Verify</a>`,
      messageVersions: [
        {
          to: [
            {
              email: recievedEmail,
            },
          ],
        },
      ],
    })
    .then(
      function (data) {
        // console.log(data);
        return res.json("Verification Mail Sent!");
      },
      function (error) {
        console.error(error);
        throw new Error(error);
      }
    );
};

module.exports = { smtpAccountCreationFunc, smtpForgotPasswordFunc };
