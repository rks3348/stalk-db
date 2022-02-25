import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import schema,{ formatError } from './src/schema.js';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

async function startApolloServer(schema) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
        ],
        context: () => {
            return {
                db: prisma
            }
        },
        formatError
    });

    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen({ port: 9000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:9000${server.graphqlPath}`);
}

startApolloServer(schema);