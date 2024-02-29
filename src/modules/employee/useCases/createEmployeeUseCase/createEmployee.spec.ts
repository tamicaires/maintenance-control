import { EmployeeStatus } from "../../enum/employee-status.enum";
import { EmployeeRepositoryInMemory } from "../../repositories/EmployeeRepositoryInMemory";
import { CreateEmployee } from "./createEmployee";


let employeeRepositoryInMemory: EmployeeRepositoryInMemory
let createEmployee: CreateEmployee

describe('Create Employee', () => {
  beforeEach(() => {
    employeeRepositoryInMemory = new EmployeeRepositoryInMemory()
    createEmployee = new CreateEmployee(employeeRepositoryInMemory)
  });

  it('Should be able to create employee', async () => {
    
    expect(employeeRepositoryInMemory.employees).toEqual([]);

    const employee = await createEmployee.execute({
      name: "Marcos",
      jobId:'jobId',
      workShift: 'Manhã',
      status: EmployeeStatus.ATIVO,
    });

    expect(employeeRepositoryInMemory.employees).toEqual([employee]);
  });
});