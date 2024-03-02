import { randomUUID } from "crypto";
import { ServiceCategory } from "../enum/service-category.enum";

interface ServiceProps {
  serviceName: string;
  serviceCategory: ServiceCategory;
};

export class Service {
  private props: ServiceProps
  private _id: string

  constructor(props: ServiceProps, id?: string){
    this.props = {
      ...props
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  };

  get serviceName(): string {
    return this.props.serviceName;
  };

  set serviceName(serviceName: string) {
    this.props.serviceName = serviceName;
  };

  get serviceCategory(): ServiceCategory {
    return this.props.serviceCategory;
  };

  set serviceCategory(serviceCategory: ServiceCategory) {
    this.props.serviceCategory = serviceCategory;
  };
};