interface AcceptInviteInput {
    token: string;
    password: string;
}
export declare const loginService: (data: {
    email: string;
    password: string;
}) => Promise<{
    _id: import("mongoose").Types.ObjectId;
    name: string;
    email: string;
    role: "Admin" | "Member";
    tenantId: import("mongoose").Types.ObjectId;
    token: string;
}>;
export declare const acceptInviteService: ({ token, password }: AcceptInviteInput) => Promise<void>;
export {};
//# sourceMappingURL=authService.d.ts.map