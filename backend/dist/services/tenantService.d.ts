import { userData } from "./noteService";
interface inviteUserInput {
    name: string;
    email: string;
    role: "Admin" | "Member";
    tenantId: string;
}
export declare const upgradeTenantPlanService: (slug: string | undefined, user: userData) => Promise<import("mongoose").Document<unknown, {}, import("../models/tenant").ITenant, {}, import("mongoose").DefaultSchemaOptions> & import("../models/tenant").ITenant & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const inviteUserService: (data: inviteUserInput, inviter: userData, slug: string | undefined) => Promise<void>;
export {};
//# sourceMappingURL=tenantService.d.ts.map