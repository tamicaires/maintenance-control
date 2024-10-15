import { Module } from "@nestjs/common";
import { PartCategoryController } from "./partCategory.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreatePartCategory } from "src/modules/partCategory/useCases/createPartCategory";

@Module({
  controllers: [PartCategoryController],
  imports: [DatabaseModule],
  providers: [
    CreatePartCategory
  ],
})

export class PartCategoryModule { }