import nodemailer from "nodemailer";
import { ApiResponse } from "@/types/ApiResponse";

// Create a Nodemailer transporter object
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // or 587 for STARTTLS
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
  },
});

export default async function sendVerificationEmail(
  email: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    console.log("Sending verification email...");
    console.log(`Email: ${email}, VerifyCode: ${verifyCode}`);

    // Define email options
    const mailOptions = {
      from: "arijitpune2024@gmail.com", // Your email address
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is: ${verifyCode}`, // Plain text content
      html: `<p>Your verification code for FeedBack Matters is: <strong>${verifyCode}</strong></p>`, // HTML content
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`${email}`);
    console.log("Verification email sent successfully.");
    return { success: true, message: "Email sent" };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send email" };
  }
}
