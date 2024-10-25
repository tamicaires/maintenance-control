import { makeEmployee } from '../../factories/employeeFactory';
import { EmployeeRepositoryInMemory } from '../../repositories/EmployeeRepositoryInMemory';
import { GetManyEmployees } from './getManyEmployees';

let employeeRepositoryInMemory: EmployeeRepositoryInMemory;
let getManyEmployees: GetManyEmployees;

describe('Get Many Employees', () => {
  beforeEach(() => {
    employeeRepositoryInMemory = new EmployeeRepositoryInMemory();
    getManyEmployees = new GetManyEmployees(employeeRepositoryInMemory);
  });

  it('Should be able to get many employees', async () => {
    const employees = [...new Array(10)].map(() => makeEmployee({}));

    employeeRepositoryInMemory.employees = employees;

    expect(employeeRepositoryInMemory.employees).toHaveLength(10);

    const result = await getManyEmployees.execute({});

    expect(result).toEqual(employees);
  });

  it('Should be able to page employees', async () => {
    const employees = [...new Array(10)].map((_, index) =>
      makeEmployee({
        name: index < 5 ? 'page 1' : 'page 2',
      }),
    );

    employeeRepositoryInMemory.employees = employees;

    const result = await getManyEmployees.execute({
      page: '2',
      perPage: '5',
    });

    expect(result[0].name).toEqual('page 2');
  });

  it('Should be able to control perPage', async () => {
    const employees = [...new Array(10)].map(() => makeEmployee({}));

    employeeRepositoryInMemory.employees = employees;

    const result = await getManyEmployees.execute({
      perPage: '8',
    });

    expect(result).toHaveLength(8);
  });
});
