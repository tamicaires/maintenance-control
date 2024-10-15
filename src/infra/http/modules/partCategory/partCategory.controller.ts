import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreatePartCategoryBody } from "./dtos/createPartCategoryBody";
import { CreatePartCategory } from "src/modules/partCategory/useCases/createPartCategory";
import { GetPartCategory } from "src/modules/partCategory/useCases/getPartCategory";
import { ListPartCategories } from "src/modules/partCategory/useCases/listPartCategories";
import { PartCategoryViewModel } from "./viewModel/PartCategoryViewModel";

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