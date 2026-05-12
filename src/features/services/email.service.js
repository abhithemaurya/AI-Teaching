
import { emailTemplate } from "@/templates/emailTemplates";
import { sendEmail } from "@/utils/sendEmail";


export const sendApprovalEmail = async (user) => {
  const template = await emailTemplate(
    "teacher_approval",
    {
      name: user.name,
      login_url: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
    }
  );

  await sendEmail({
    to: user.email,
    subject: template.subject,
    html: template.html,
  });
};

export const sendRejectionEmail = async (user) => {
  const template = await emailTemplate(
    "teacher_rejection",
    {
      name: user.name,
    }
  );

  await sendEmail({
    to: user.email,
    subject: template.subject,
    html: template.html,
  });
};

export const sendInActiveAccount = async (user) => {
  const template = await emailTemplate(
    "account_inactive",
    {
      name: user.name,
    }
  );

  await sendEmail({
    to: user.email,
    subject: template.subject,
    html: template.html,
  });
};

export const sendActiveAccount = async (user) => {
  const template = await emailTemplate(
    "account_active",
    {
      name: user.name,
      login_url: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
    }
  );

  await sendEmail({
    to: user.email,
    subject: template.subject,
    html: template.html,
  });
};

export const sendAddTeacherNotification = async (
  user,
  password
) => {
  const template = await emailTemplate(
    "teacher_credentials",
    {
      name: user.name,
      email: user.email,
      password,
      school: user.school || "",
      login_url: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
    }
  );

  await sendEmail({
    to: user.email,
    subject: template.subject,
    html: template.html,
  });
};











