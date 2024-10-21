import { Employee } from '../entities/Employee';

type Override = Partial<Employee>;

export const makeEmployee = ({ id, ...override }: Override) => {
  return new Employee(
    {
      name: 'Elves Caires',
      workShift: 'Manhã',
      jobTitleId: '12355',
      isActive: true,
      ...override,
    },
    id,
  );
};
