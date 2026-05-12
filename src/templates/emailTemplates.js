import { prisma } from "@/lib/prisma";


export const emailTemplate = async (
  key,
  variables = {}
) => {
  const template = await prisma.emailTemplate.findUnique({
    where: {
      key,
    },
  });

  if (!template) {
    throw new Error("Email template not found");
  }

  let html = template.html;

  Object.keys(variables).forEach((item) => {
    html = html.replaceAll(
      `{{${item}}}`,
      variables[item]
    );
  });

  return {
    subject: template.subject,
    html,
  };
};






// import { div } from "framer-motion/client";

// export const approvalEmailTemplate = (name) => {
//     return `
//      <div style="font-family: Arial; padding:20px;">
//             <h2>
//                 Hello ${name},
//             </h2>
//             <p>Your teacher account has been approved successfully.</p>
//             <p>You can now login and access your dashboard.</p>
//             <br/>
//             <a href="${process.env.NEXT_PUBLIC_APP_URL}/login"
//              style="background: #2563eb;
//             color:white;
//             padding: 10px 20px;
//             text-decoration: none;
//             barder-radius: 5px; 
//             display: inline-black;
//              "
//             > 
//              Login Now
//             </a>
//             <br/><br/>
//             <p>Thank You</p>
//             <p>AI Teaching Team</p> 
//         </div>`

// };

// export const rejectionEmailTemplate = (name) => {
//     return `
//         <div style="font-family: Arial: padding: 20px;">
//             <h2> Hello${name},
//             </h2>
//          <p>We are sorry.</p>
//          <p>
//             Your teacher account request has beed rejected by admin.
//          </p>
//          <p>Please contact support for more information.</p>
//          <br/>
//          <p>Thank You</p>
//          <p>AI Teaching Team</p>
//         </div>
//     `
// }

// export const teacherCredentialsTemplate = (user, password) => {
//   return `
//     <div style="font-family: Arial, sans-serif; padding: 24px; background:#f8fafc;">
      
//       <div style="max-width: 520px; margin:auto; background:white; border-radius:12px; padding:32px; border:1px solid #e5e7eb;">
        
//         <h2 style="margin:0 0 16px; color:#111827;">
//           Welcome ${user.name},
//         </h2>

//         <p style="font-size:14px; color:#4b5563; line-height:1.6;">
//           Your teacher account has been created successfully.
//         </p>

//         <div style="margin:24px 0; padding:16px; background:#f3f4f6; border-radius:10px;">
          
//           <p style="margin:0 0 10px; font-size:14px;">
//             <strong>Email:</strong> ${user.email}
//           </p>

//           <p style="margin:0 0 10px; font-size:14px;">
//             <strong>Password:</strong> ${password}
//           </p>

//           <p style="margin:0; font-size:14px;">
//             <strong>School:</strong> ${user.school}
//           </p>

//         </div>

//         <a
//           href="${process.env.NEXT_PUBLIC_APP_URL}/login"
//           style="
//             display:inline-block;
//             background:#2563eb;
//             color:white;
//             text-decoration:none;
//             padding:12px 22px;
//             border-radius:8px;
//             font-size:14px;
//             font-weight:600;
//           "
//         >
//           Login Now
//         </a>

//         <p style="margin-top:28px; font-size:13px; color:#6b7280;">
//           Please change your password after first login.
//         </p>

//         <p style="margin-top:24px; font-size:14px; color:#111827;">
//           Thank You,<br/>
//           <strong>AI Teaching Team</strong>
//         </p>

//       </div>
//     </div>
//   `;
// };


// export const inActiveAccountTemplate = (name) => {
//     return `
//     <div style="font-family: Arial, sans-serif; padding: 20px;">    
//       <h2>Hello ${name},</h2>
//       <p>
//         Your account has been temporarily deactivated by the admin.
//       </p>
//       <p>
//         You cannot access your account right now.
//       </p>
//       <p>
//         Please contact support for more information.
//       </p>
//       <br/>
//       <p>Thank You,</p>
//       <p><strong>AI Teaching Team</strong></p>
//     </div>
//   `;
// };

// export const 

// activeAccountTemplate = (name) => {
//     return `
//     <div style="
//       font-family: Arial, sans-serif;
//       padding: 30px;
//       background-color: #f8fafc;
//       color: #1e293b;
//       border-radius: 10px;
//       max-width: 600px;
//       margin: auto;
//     ">

//       <div style="text-align: center; margin-bottom: 25px;">
//         <h1 style="
//           color: #2563eb;
//           margin: 0;
//           font-size: 28px;
//         ">
//           AI Teaching
//         </h1>

//         <p style="
//           color: #64748b;
//           margin-top: 8px;
//           font-size: 14px;
//         ">
//           Teacher Account Activation
//         </p>
//       </div>

//       <h2 style="margin-bottom: 16px;">
//         Hello ${name},
//       </h2>

//       <p style="
//         font-size: 15px;
//         line-height: 1.7;
//         margin-bottom: 12px;
//       ">
//         Your account has been activated successfully by the admin.
//       </p>

//       <p style="
//         font-size: 15px;
//         line-height: 1.7;
//         margin-bottom: 30px;
//       ">
//         You can now log in and continue using the platform.
//       </p>

//       <div style="text-align: center; margin-bottom: 30px;">
//         <a
//           href="${process.env.NEXT_PUBLIC_APP_URL}/login"
//           style="
//             background: #2563eb;
//             color: white;
//             padding: 12px 24px;
//             text-decoration: none;
//             border-radius: 8px;
//             display: inline-block;
//             font-size: 14px;
//             font-weight: 600;
//           "
//         >
//           Login Now
//         </a>
//       </div>

//       <hr style="
//         border: none;
//         border-top: 1px solid #e2e8f0;
//         margin: 25px 0;
//       " />

//       <p style="
//         font-size: 14px;
//         color: #64748b;
//         margin: 0;
//       ">
//         Thank You,
//       </p>

//       <p style="
//         font-size: 15px;
//         font-weight: bold;
//         margin-top: 6px;
//         color: #0f172a;
//       ">
//         AI Teaching Team
//       </p>

//     </div>
//   `;
// };