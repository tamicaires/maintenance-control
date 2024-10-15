import { Body, Controller, Post } from "@nestjs/common";
import { CreatePartCategoryBody } from "./dtos/createPartCategoryBody";
import { CreatePartCategory } from "src/modules/partCategory/useCases/createPartCategory";

@Controller("part-categories")
export class PartCategoryController {
  constructor(private readonly createPartCategory: CreatePartCategory) { }

  @Post()
  async create(@Body() partCategory: CreatePartCategoryBody) {
    return await this.createPartCategory.execute(partCategory);
  }
}