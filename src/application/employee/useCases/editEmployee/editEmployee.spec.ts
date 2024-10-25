import { EmployeeNotFoundException } from '../../exceptions/EmployeeNotFoundException';
import { makeEmployee } from '../../factories/employeeFactory';
import { EmployeeRepositoryInMemory } from '../../repositories/EmployeeRepositoryInMemory';
import { EditEmployee } from './editEmployee';

let employeeRepositoryInMemory: EmployeeRepositoryInMemory;
let editEmployee: EditEmployee;

describe('Edit Employee', () => {
  beforeEach(() => {
    employeeRepositoryInMemory = new EmployeeRepositoryInMemory();
    editEmployee = new EditEmployee(employeeRepositoryInMemory);
  });

  it('Should be able to edit employee', async () => {
    const employee = makeEmployee({});

    employeeRepositoryInMemory.employees = [employee];

    const employeeNameChanged = 'Eline';

    const result = await editEmployee.execute({
      name: employeeNameChanged,
      employeeId: employee.id,
    });

    expect(result.name).toEqual(employeeNameChanged);
  });

  it('Shoud be able to throw error when not find employee', async () => {
    expect(async () => {
      await editEmployee.execute({
        employeeId: 'fakeid',
      });
    }).rejects.toThrow(EmployeeNotFoundException);
  });
});
