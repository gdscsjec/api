const { PrismaClient } = require('@prisma/client');
const { ObjectId } = require('mongodb');
const members = require('../insert_data/members.json');

const prisma = new PrismaClient();

async function main() {
  //console.log(members);

  for (const member of members) {
    // Check if the member with the same email already exists
    const existingMember = await prisma.member.findFirst({
      where: {
        email: member.email,
      },
    });

    // If a member with the same email already exists, skip inserting this member
    if (existingMember) {
      console.log(`Member with email ${member.email} already exists. Skipping.`);
      continue;
    }

    await prisma.member.create({
      data: {
        email: member.email,
        name: member.name,
        role: member.role,
        socials: {
          create: {
            instagram: member.socials.instagram,
            twitter: member.socials.twitter,
            linkedin: member.socials.linkedin,
          },
        },
        photo: member.photo,
      },
    });
  }

  const allMembers = await prisma.member.findMany({
    include: {
      socials: true,
    },
  });

  console.dir(allMembers, { depth: null });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
