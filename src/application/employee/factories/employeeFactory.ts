import { Employee } from '../../../core/domain/entities/employee';

type Override = Partial<Employee>;

export const makeEmployee = ({ id, ...override }: Override) => {
  return new Employee(
    {
      name: 'Elves Caires',
      workShift: 'Manhã',
      jobTitleId: '12355',
      isActive: true,
      companyId: 'dds',
      ...override,
    },
    id,
  );
};
