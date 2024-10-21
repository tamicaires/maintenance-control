import { EmployeeNotFoundException } from '../../exceptions/EmployeeNotFoundException';
import { makeEmployee } from '../../factories/employeeFactory';
import { EmployeeRepositoryInMemory } from '../../repositories/EmployeeRepositoryInMemory';
import { DeleteEmployee } from './deleteEmployee';

let employeeRepositoryInMemory: EmployeeRepositoryInMemory;
let deleteEmployee: DeleteEmployee;

describe('Delete Employee', () => {
  beforeEach(() => {
    employeeRepositoryInMemory = new EmployeeRepositoryInMemory();
    deleteEmployee = new DeleteEmployee(employeeRepositoryInMemory);
  });

  it('Should be able to delete employee', async () => {
    const employee = makeEmployee({});

    employeeRepositoryInMemory.employees = [employee];

    await deleteEmployee.execute({ employeeId: employee.id });

    expect(employeeRepositoryInMemory.employees).toHaveLength(0);
  });

  it('Should be able to throw erro whent not find employee', async () => {
    expect(async () => {
      await deleteEmployee.execute({
        employeeId: 'fakeId',
      });
    }).rejects.toThrow(EmployeeNotFoundException);
  });
});
