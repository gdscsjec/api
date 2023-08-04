const { PrismaClient } = require('@prisma/client');
const { ObjectId } = require('mongodb');
const members = require('../insert_data/members.json');
const projects = require('../insert_data/projects.json');
const prisma = new PrismaClient();

async function member() {
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

member()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  
  async function project() {
    //console.log(members);
  
    for (const project of projects) {
      // Check if the member with the same email already exists
      const existingProject = await prisma.Project.findFirst({
        where: {
          name: project.name,
        },
      });
  
      // If a member with the same email already exists, skip inserting this member
      if (existingProject) {
        console.log(`Project with name ${project.name} already exists. Skipping.`);
        continue;
      }
  
      await prisma.project.create({
        data: {
          name: project.name,
          description: project.description,
          thumbnail: project.thumbnail
        },
      });
    }
  
    const allProjects = await prisma.Project.findMany();
  
    console.dir(allProjects, { depth: null });
  }
  
  project()
    .catch(async (e: any) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  