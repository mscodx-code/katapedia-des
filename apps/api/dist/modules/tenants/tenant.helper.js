import { prisma } from '@katapedia/database';
export async function resolveTenantId(param) {
    const tenant = await prisma.tenant.findFirst({
        where: {
            OR: [
                { id: param },
                { slug: param }
            ]
        }
    });
    return tenant ? tenant.id : param;
}
//# sourceMappingURL=tenant.helper.js.map