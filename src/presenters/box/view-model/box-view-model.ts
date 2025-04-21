import { Box } from "src/core/domain/entities/box";
import { IBoxWithCount } from "src/shared/types/box";

export class BoxViewModel {
  static tohttp(box: Box) {
    return {
      id: box.id,
      name: box.name,
      description: box.description,
      isActive: box.isActive,
      companyId: box.companyId,
      position: box.position,
    }
  }

  static toHttpWithCount(data: IBoxWithCount): IBoxWithCount {
    const boxes = data.boxes.map(BoxViewModel.tohttp)
    return {
      boxes: boxes,
      totalCount: data.totalCount,
    };
  }
}