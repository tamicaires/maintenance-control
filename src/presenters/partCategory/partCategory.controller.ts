import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreatePartCategoryBody } from "./dtos/createPartCategoryBody";
import { PartCategoryViewModel } from "./viewModel/PartCategoryViewModel";
import { CreatePartCategory } from "src/application/part-category/useCases/createPartCategory";
import { GetPartCategory } from "src/application/part-category/useCases/getPartCategory";
import { ListPartCategories } from "src/application/part-category/useCases/listPartCategories";

@Controller("part-categories")
export class PartCategoryController {
  constructor(
    private readonly createPartCategory: CreatePartCategory,
    private readonly getPartCategory: GetPartCategory,
    private readonly listPartCategories: ListPartCategories
  ) { }

  @Post()
  async create(@Body() body: CreatePartCategoryBody) {
    const partCategory = await this.createPartCategory.execute(body);
    return PartCategoryViewModel.toHttp(partCategory);
  }

  @Get(":id")
  async get(@Param("id") partCategoryId: string) {
    const partCategory = await this.getPartCategory.execute(partCategoryId);
    return PartCategoryViewModel.toHttp(partCategory);
  }

  @Get()
  async list() {
    const partCategories = await this.listPartCategories.execute();

    return partCategories.map(PartCategoryViewModel.toHttp);
  }
}