import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../repositories/roleRepository';

interface GetManyRolesRequest {
  filter?: string;
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyRoles {
  constructor(private rolesRepository: RoleRepository) { }

  async execute({ filter, page, perPage }: GetManyRolesRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 20;

    const currentFilter = filter ?? '';
    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PERPAGE;

    const services = await this.rolesRepository.listRoles(

    );

    return services;
  }
}
