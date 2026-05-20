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




