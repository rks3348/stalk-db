import PrismaClientPkg from '@prisma/client';
const { PrismaClient } = PrismaClientPkg;

const prisma = new PrismaClient();

async function main() {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
}

async function createCategory() {
    await prisma.category.createMany({
        data: [
            { name: "Root" },
            { name: "Food" },
            { name: "Travel" },
            { name: "Health And Fitness" },
            { name: "Lifestyle" },
            { name: "Fashion And Beauty" },
            { name: "Photography" },
            { name: "Personal" },
            { name: "Diy Craft" },
            { name: "Parenting" },
            { name: "Music" },
            { name: "Business" },
            { name: "Art And Design" },
            { name: "Book And Writing" },
            { name: "Personal Finance " },
            { name: "Interior Design" },
            { name: "Sports" },
            { name: "News" },
            { name: "Movie" },
            { name: "Religion" },
            { name: "Political" }
        ]
    })

    const allUsers = await prisma.category.findMany({
        include: {
            posts: true
        },
    })
}

createCategory()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    });