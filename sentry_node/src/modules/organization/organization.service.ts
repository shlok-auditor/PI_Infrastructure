import { Organization } from './organization.entity';
import { AppDataSource } from '../../utilities/data-source';

const orgRepository = AppDataSource.getRepository(Organization);

export const createOrg = async (input: Partial<Organization>) => {
    return await orgRepository.save(orgRepository.create(input));
};

export const updateOrg = async (input: Partial<Organization>) => {
    return await orgRepository.update(input.id, input);
};
