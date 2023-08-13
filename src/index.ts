import 'dotenv/config'
import express from 'express';
import { EventRouter } from '#routes/Event';


const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());



app.use('/api/events', new EventRouter().router);


// app.get("/members", async (_req: Request, res: Response) => {
//   const allMembers = await prisma.member.findMany({
//     include: {
//       socials: true,
//     },
//   });

//   res.send(allMembers);
// });

// app.get("/projects", async (_req: Request, res: Response) => {
//   const allProjects = await prisma.project.findMany();
//   res.send(allProjects);
// });

// app.get("/events", async (_req: Request, res: Response) => {
//   const allEvents = await prisma.event.findMany();
//   res.send(allEvents);
// });

// //POST Requests

// app.post("/submit_member", async (req: Request, res: Response) => {
//   const newMember = req.body;
//   const existingMember = await prisma.member.findFirst({
//     where: {
//       email: newMember.email,
//     },
//   });

//   if (existingMember) {
//     res.json({
//       message: `Member with email ${newMember.email} already exists. Please enter a different email id.`,
//     });
//   } else {
//     if (!isValidPhoto(newMember.photo)) {
//       res.status(400).json({
//         error:
//           "Invalid profile photo file extension. Allowed formats: jpg, jpeg, png, webp",
//       });
//       return;
//     }
//     await prisma.member.create({
//       data: {
//         email: newMember.email,
//         name: newMember.name,
//         role: newMember.role,
//         socials: {
//           create: {
//             instagram: newMember.socials.instagram,
//             twitter: newMember.socials.twitter,
//             linkedin: newMember.socials.linkedin,
//           },
//         },
//         photo: newMember.photo,
//       },
//     });
//     res.json({ message: "Member added successfully" });
//   }
// });

// app.post("/submit_project", async (req: Request, res: Response) => {
//   const newProject = req.body;
//   const existingProject = await prisma.project.findFirst({
//     where: {
//       name: newProject.name,
//     },
//   });

//   if (existingProject) {
//     res.json({
//       message: `Project with name ${newProject.name} already exists. Please add a different project.`,
//     });
//   } else {
//     if (!isValidPhoto(newProject.thumbnail)) {
//       res.status(400).json({
//         error:
//           "Invalid thumbnail photo file extension. Allowed formats: jpg, jpeg, png, webp",
//       });
//       return;
//     }

//     await prisma.project.create({
//       data: {
//         name: newProject.name,
//         description: newProject.description,
//         thumbnail: newProject.thumbnail,
//       },
//     });
//     res.json({ message: "Project added successfully" });
//   }
// });

// function isValidPhoto(photo: string): boolean {
//   return /\.(jpg|jpeg|png|webp)$/i.test(photo);
// }

// app.post("/submit_event", async (req: Request, res: Response) => {
//   const newEvent = req.body;
//   const eventPhotos = newEvent.event_photos || [];
//   const existingEvent = await prisma.event.findFirst({
//     where: {
//       name: newEvent.name,
//     },
//   });

//   if (existingEvent) {
//     res.json({
//       message: `Event with name ${newEvent.name} already exists. Please add a different event.`,
//     });
//   } else {
//     if (
//       !eventPhotos.every(isValidPhoto) ||
//       !isValidPhoto(newEvent.event_thumbnail)
//     ) {
//       res.status(400).json({
//         error:
//           "Invalid photo/thumbnail file extension. Allowed formats: jpg, jpeg, png, webp",
//       });
//       return;
//     }

//     const createdEvent = await prisma.event.create({
//       data: {
//         name: newEvent.name,
//         event_description: newEvent.event_description,
//         event_date: newEvent.event_date,
//         resource_person: newEvent.resource_person,
//         event_thumbnail: newEvent.event_thumbnail,
//         organizing_member: newEvent.organizing_member,
//       },
//     });

//     // Associate the photos with the event
//     if (eventPhotos.length > 0) {
//       for (const photo of eventPhotos) {
//         await prisma.event.update({
//           where: {
//             id: createdEvent.id,
//           },
//           data: {
//             event_photos: {
//               push: photo,
//             },
//           },
//         });
//       }
//     }
//     res.json({ message: "Event added successfully" });
//   }
// });

// //PUT Request to update data

// // @ts-ignore
// app.put("/update_member/:id", async (req: Request, res: Response) => {
//   const memberId = req.params.id;
//   const updatedMember = req.body;

//   try {
//     // Check if the member exists in the database
//     const existingMember = await prisma.member.findUnique({
//       where: {
//         id: memberId,
//       },
//     });

//     // If the member does not exist, send a 404 response
//     if (!existingMember) {
//       return res.status(404).json({ error: "Member not found" });
//     }

//     // Update the member details
//     await prisma.member.update({
//       where: {
//         id: memberId,
//       },
//       data: {
//         email: updatedMember.email,
//         name: updatedMember.name,
//         role: updatedMember.role,
//         socials: {
//           update: {
//             instagram: updatedMember.socials.instagram,
//             twitter: updatedMember.socials.twitter,
//             linkedin: updatedMember.socials.linkedin,
//           },
//         },
//         photo: updatedMember.photo,
//       },
//     });

//     res.json({ message: "Member updated successfully" });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "An error occurred" });
//   } finally {
//     await prisma.$disconnect();
//   }
// });

app.listen(port, () => {
	console.log('Server running on port 3000....');
});
