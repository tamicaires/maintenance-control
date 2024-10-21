import { Module } from "@nestjs/common";
import { PartCategoryController } from "./partCategory.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreatePartCategory } from "src/domain/partCategory/useCases/createPartCategory";
import { GetPartCategory } from "src/domain/partCategory/useCases/getPartCategory";
import { ListPartCategories } from "src/domain/partCategory/useCases/listPartCategories";

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