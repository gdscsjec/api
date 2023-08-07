import { BaseRouter } from "../structures/BaseRouter.js";

export class MembersRouter extends BaseRouter {

    constructor() {
        super();
        this.router.get("/", this.getAll);
        this.router.get("/:id", this.getById);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }

    async getAll(req: Request, res: Response) {
        this.router.get("/", this.getAll);
       
    }
}