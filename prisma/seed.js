

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.emailTemplate.createMany({
    data: [
      {
        key: "teacher_approval",
        subject: "Teacher Account Approved",
        html: `
          <div>
            <h2>Hello {{name}}</h2>
            <p>Your account has been approved successfully.</p>

            <a href="{{login_url}}">
              Login Now
            </a>
          </div>
        `,
      },

      {
        key: "teacher_rejection",
        subject: "Teacher Account Rejected",
        html: `
          <div>
            <h2>Hello {{name}}</h2>

            <p>
              Your account request has been rejected.
            </p>
          </div>
        `,
      },

      {
        key: "teacher_credentials",
        subject: "Teacher Account Created",
        html: `
         <div style="font-family: Arial, sans-serif; padding: 24px; background:#f8fafc;">

        <div style="max-width: 520px; margin:auto; background:white; border-radius:12px; padding:32px; border:1px solid #e5e7eb;">

        <h2 style="margin:0 0 16px; color:#111827;">
          Welcome {{name}},
        </h2>

        <p style="font-size:14px; color:#4b5563; line-height:1.6;">
          Your teacher account has been created successfully.
        </p>

        <div style="margin:24px 0; padding:16px; background:#f3f4f6; border-radius:10px;">

          <p style="margin:0 0 10px; font-size:14px;">
            <strong>Email:</strong> {{email}}
          </p>

          <p style="margin:0 0 10px; font-size:14px;">
            <strong>Password:</strong> {{password}}
          </p>

          <p style="margin:0; font-size:14px;">
            <strong>School:</strong> {{school}}
          </p>

        </div>

        <a
          href="{{login_url}}"
          style="
            display:inline-block;
            background:#2563eb;
            color:white;
            text-decoration:none;
            padding:12px 22px;
            border-radius:8px;
            font-size:14px;
            font-weight:600;
          "
        >
          Login Now
        </a>

        <p style="margin-top:28px; font-size:13px; color:#6b7280;">
          Please change your password after first login.
        </p>

        <p style="margin-top:24px; font-size:14px; color:#111827;">
          Thank You,<br/>
          <strong>AI Teaching Team</strong>
        </p>

      </div>
    </div>
  `,
      },
      {
        key: "account_inactive",

        subject: "Account Deactivated",

        html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">

      <h2>Hello {{name}},</h2>

      <p>
        Your account has been temporarily deactivated by the admin.
      </p>

      <p>
        You cannot access your account right now.
      </p>

      <p>
        Please contact support for more information.
      </p>

      <br/>

      <p>Thank You,</p>

      <p>
        <strong>AI Teaching Team</strong>
      </p>

    </div>
  `,
      },
      {
        key: "account_active",

        subject: "Account Activated",

        html: `
    <div style="
      font-family: Arial, sans-serif;
      padding: 30px;
      background-color: #f8fafc;
      color: #1e293b;
      border-radius: 10px;
      max-width: 600px;
      margin: auto;
    ">

      <div style="text-align: center; margin-bottom: 25px;">

        <h1 style="
          color: #2563eb;
          margin: 0;
          font-size: 28px;
        ">
          AI Teaching
        </h1>

        <p style="
          color: #64748b;
          margin-top: 8px;
          font-size: 14px;
        ">
          Teacher Account Activation
        </p>

      </div>

      <h2 style="margin-bottom: 16px;">
        Hello {{name}},
      </h2>

      <p style="
        font-size: 15px;
        line-height: 1.7;
        margin-bottom: 12px;
      ">
        Your account has been activated successfully by the admin.
      </p>

      <p style="
        font-size: 15px;
        line-height: 1.7;
        margin-bottom: 30px;
      ">
        You can now log in and continue using the platform.
      </p>

      <div style="text-align: center; margin-bottom: 30px;">

        <a
          href="{{login_url}}"
          style="
            background: #2563eb;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            display: inline-block;
            font-size: 14px;
            font-weight: 600;
          "
        >
          Login Now
        </a>

      </div>

      <hr style="
        border: none;
        border-top: 1px solid #e2e8f0;
        margin: 25px 0;
      " />

      <p style="
        font-size: 14px;
        color: #64748b;
        margin: 0;
      ">
        Thank You,
      </p>

      <p style="
        font-size: 15px;
        font-weight: bold;
        margin-top: 6px;
        color: #0f172a;
      ">
        AI Teaching Team
      </p>

    </div>
  `,
      },
      {
        key: "Account_created",
        subject: "Teacher Account created",
        html: `
       <div style="
  margin:0;
  padding:40px 20px;
  background-color:#f8fafc;
  font-family:Arial,sans-serif;
">

  <div style="
    max-width:600px;
    margin:auto;
    background:#ffffff;
    border-radius:14px;
    overflow:hidden;
    border:1px solid #e5e7eb;
    box-shadow:0 4px 12px rgba(0,0,0,0.05);
  ">

    <!-- Header -->
    <div style="
      background:#2563eb;
      padding:28px;
      text-align:center;
    ">

      <h1 style="
        margin:0;
        color:white;
        font-size:28px;
        font-weight:700;
      ">
        AI Teaching
      </h1>

      <p style="
        margin:8px 0 0;
        color:#dbeafe;
        font-size:14px;
      ">
        Teacher Account Registration
      </p>

    </div>

    <!-- Content -->
    <div style="padding:35px;">

      <h2 style="
        margin-top:0;
        color:#111827;
        font-size:22px;
      ">
        Hello {{name}},
      </h2>

      <p style="
        color:#4b5563;
        font-size:15px;
        line-height:1.8;
        margin-bottom:18px;
      ">
        Your teacher account has been created successfully.
      </p>

      <p style="
        color:#4b5563;
        font-size:15px;
        line-height:1.8;
        margin-bottom:24px;
      ">
        Our admin team will review your account details shortly.
        Once your account is approved, you will receive another email notification with access instructions.
      </p>

      <!-- Info Box -->
      <div style="
        background:#eff6ff;
        border:1px solid #bfdbfe;
        border-radius:10px;
        padding:18px;
        margin-bottom:28px;
      ">

        <p style="
          margin:0;
          color:#1e40af;
          font-size:14px;
          line-height:1.7;
        ">
          Please wait for admin approval before attempting to log in to the platform.
        </p>

      </div>

      <p style="
        color:#4b5563;
        font-size:15px;
        line-height:1.8;
      ">
        Thank you for joining AI Teaching.
      </p>

      <!-- Footer -->
      <div style="
        margin-top:35px;
        padding-top:24px;
        border-top:1px solid #e5e7eb;
      ">

        <p style="
          margin:0;
          color:#111827;
          font-size:15px;
          font-weight:600;
        ">
          AI Teaching Team
        </p>

        <p style="
          margin-top:6px;
          color:#6b7280;
          font-size:13px;
        ">
          Empowering Smarter Education
        </p>

      </div>

    </div>

  </div>

</div>
       `
      }


    ],
    skipDuplicates: true,
  });

  console.log("Templates seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });