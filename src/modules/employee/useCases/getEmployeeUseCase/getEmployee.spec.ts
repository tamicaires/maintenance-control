import { makeEmployee } from "../../factories/employeeFactory";
import { EmployeeRepositoryInMemory } from "../../repositories/EmployeeRepositoryInMemory";
import { GetEmployee } from "./getEmployee";

let employeeRepositoryInMemory: EmployeeRepositoryInMemory
let getEmployee: GetEmployee

describe('Get Employee', () => {
  beforeEach(() => {
    employeeRepositoryInMemory = new EmployeeRepositoryInMemory();
    getEmployee = new GetEmployee(employeeRepositoryInMemory)

  });

  it('Should be able to get employee', async () => {
    const employee = makeEmployee({});

    employeeRepositoryInMemory.employees = [employee];

    const result = await getEmployee.execute({
      employeeId: employee.id
    });

    expect(result).toEqual(employee)
  });
})