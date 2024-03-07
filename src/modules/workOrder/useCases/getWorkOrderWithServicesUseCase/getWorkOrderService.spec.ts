import { WorkOrderRepositoryInMemory } from "../../repositories/workOrderRepositoryInMemory";
import { GetWorkOrderServices } from "./getWorkOrderWithServices";

let workOrderRepositoryInMemory: WorkOrderRepositoryInMemory;
let getWorkOrderServices: GetWorkOrderServices;

describe('Get Work Order Services', () => {
  beforeEach(() => {
    workOrderRepositoryInMemory = new WorkOrderRepositoryInMemory()
    getWorkOrderServices = new GetWorkOrderServices(
      workOrderRepositoryInMemory
    );
  });
});