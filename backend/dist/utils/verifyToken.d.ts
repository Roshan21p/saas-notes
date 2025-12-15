interface JwtPayload {
    id: string;
    email: string;
    role: "Admin" | "Member";
    tenantId: string;
}
export declare const verifyToken: (token: string) => JwtPayload;
export {};
//# sourceMappingURL=verifyToken.d.ts.map