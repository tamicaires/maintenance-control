import { Module } from "@nestjs/common";
import { PartCategoryController } from "./partCategory.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreatePartCategory } from "src/application/part-category/useCases/createPartCategory";
import { GetPartCategory } from "src/application/part-category/useCases/getPartCategory";
import { ListPartCategories } from "src/application/part-category/useCases/listPartCategories";

@Module({
  controllers: [PartCategoryController],
  imports: [DatabaseModule],
  providers: [
    CreatePartCategory,
    GetPartCategory,
    ListPartCategories,
  ],
})

export class PartCategoryModule { }