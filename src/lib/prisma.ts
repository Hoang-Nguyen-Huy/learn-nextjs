import { PrismaClient } from "@prisma/client";

export class PrismaSingleton {
    private static prisma: PrismaClient;
    static getClient() {
        if (!this.prisma) {
            this.prisma = new PrismaClient();
        }
        return this.prisma;
    }
}