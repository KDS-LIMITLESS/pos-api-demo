const postmark = require('postmark');
const mail = new postmark.ServerClient('9f332d3f-5c4d-42d5-b4c4-0959b0dd648a');


async function sendVerificationOTP(to:string, otp:string, subject:string) {
  return mail.sendEmail({
    From: 'cc@uppist.com',
    To: to,
    Subject: subject,
    HtmlBody: `<h1> ${otp} </h1>`,
    MessageStream: 'outbound'
  });
}

async function sendUserRegistrationURL(to:string, rid:string, 
  role:string, subject:string) 
{
  return mail.sendEmail({
    From: 'cc@uppist.com',
    To: to,
    Subject: subject,
    HtmlBody: `<p>Congratulations! You have been offered employment at<h3>${subject}</h3></p>
      <a href="https://uppist-rms.netlify.app?ref=${rid}&role=${role}&email=${to}">
      Click here to register and start using our systems.
    </a>`,
    MessageStream: 'outbound'
  });
}


export async function generateUniqueIDs(characters: string): Promise<string> {
  const idLength = 6;
  let id = '';
  
  for (let i = 0; i < idLength; i++) {
    const index = Math.floor(Math.random() * characters.length);
    id += characters[index];
  }
  return id;
}


export default  {
  sendUserRegistrationURL,
  sendVerificationOTP,
  generateUniqueIDs
} as const