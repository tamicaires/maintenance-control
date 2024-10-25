import { Box } from "src/core/domain/entities/box";

export class BoxViewModel {
  static tohttp(box: Box){
    return {
      id: box.id,
      name: box.name,
      description: box.description,
      isActive: box.isActive
    }
  }
}