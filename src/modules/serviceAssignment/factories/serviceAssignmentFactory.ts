import { ServiceAssignment } from "../entities/ServiceAssignment";

type Override = Partial<ServiceAssignment>

export const makeServiceAssignment = ({id, ...override}: Override) => {
  return new ServiceAssignment({
    workOrderId: '123456',
    employeeId: '1234567',
    serviceId: '12345678',
    ...override
  }, 
  id
  );
};