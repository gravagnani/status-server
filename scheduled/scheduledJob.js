import dotenv from "dotenv";
import fetch from "node-fetch";
import SibApiV3Sdk from "sib-api-v3-sdk";

dotenv.config();

const getExpired = async () => {
  console.log("Getting expired ...");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const url = "https://status-server-service.herokuapp.com?expired=Y";

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return await data;
  } catch (error) {
    console.error("Get Expired Error: " + error);
  }

  return null;
};

function sendMail(mail_from, mail_to, server_code, server_desc) {
  const subject = "Status Server - [" + server_code + "] Down";

  const text =
    "Status Server - [" +
    server_code +
    "] " +
    server_desc +
    " is not responding. Please check the status.";

  var defaultClient = SibApiV3Sdk.ApiClient.instance;

  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.SIB_API;
  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail = {
    sender: { email: mail_from },
    to: [
      {
        email: mail_to,
      },
    ],
    subject: subject,
    textContent: text,
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("sendTransacEmail. Returned data: " + JSON.stringify(data));
    },
    function (error) {
      console.error(error);
    }
  );
}

const updateNextMail = async (server_code) => {
  var raw = JSON.stringify({
    server_code: server_code,
  });

  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw,
    redirect: "follow",
  };

  const url = "https://status-server-service.herokuapp.com/update-next-mail";

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return await data;
  } catch (error) {
    console.error("Update Next Mail Error: " + error);
  }

  return null;
};

const main = async () => {
  console.log("Running Scheduled Job ...");

  const expired = await getExpired();

  expired.forEach(async (s) => {
    console.log("Sending mail for: " + s.server_code);
    s.mail_to.split(";").forEach(async (t) => {
      console.log("Sending mail for: " + s.server_code + " to: " + t);
      sendMail(s.mail_from, t, s.server_code, s.server_desc);
    });
    console.log("Updating Next Mail [" + s.server_code + "] ...");
    const updated_mail = await updateNextMail(s.server_code);
  });
};

main();
