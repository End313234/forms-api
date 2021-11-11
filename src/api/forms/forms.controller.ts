import { Controller, Get } from "@nestjs/common";
import { FormsService } from "./forms.service";

@Controller("/forms")
export class FormsController {
    // eslint-disable-next-line no-empty-function
    constructor(private readonly formsService: FormsService) {}

    @Get()
    async findAll() {
        return this.formsService.findAll();
    }

    // TODO: make findOne route
    @Get(":formId")
    async findOne() {
        return null;
    }
}
