

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
    ],
  });

  console.log("Templates seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });