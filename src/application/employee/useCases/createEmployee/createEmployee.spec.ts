import { EmployeeStatus } from '../../enum/employee-status.enum';
import { EmployeeWithSameNameException } from '../../exceptions/EmployeeWithSameNameException';
import { makeEmployee } from '../../factories/employeeFactory';
import { EmployeeRepositoryInMemory } from '../../repositories/EmployeeRepositoryInMemory';
import { CreateEmployee } from './createEmployee';

let employeeRepositoryInMemory: EmployeeRepositoryInMemory;
let createEmployee: CreateEmployee;

describe('Create Employee', () => {
  beforeEach(() => {
    employeeRepositoryInMemory = new EmployeeRepositoryInMemory();
    createEmployee = new CreateEmployee(employeeRepositoryInMemory);
  });

  it('Should be able to create employee', async () => {
    expect(employeeRepositoryInMemory.employees).toEqual([]);

    const employee = await createEmployee.execute({
      name: 'Marcos',
      jobTitleId: 'jobId',
      workShift: 'Manhã',
      status: EmployeeStatus.ATIVO,
    });

    expect(employeeRepositoryInMemory.employees).toEqual([employee]);
  });

  it('Should be able to throw error when employee already exist', () => {
    const employee = makeEmployee({
      name: 'Tamires',
    });

    employeeRepositoryInMemory.employees = [employee];

    expect(async () => {
      await createEmployee.execute(employee);
    }).rejects.toThrow(EmployeeWithSameNameException);
  });
});
