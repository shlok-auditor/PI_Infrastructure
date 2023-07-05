import { Jobs } from './jobs.entity';
import { AppDataSource } from '../../utilities/data-source';

const orgRepository = AppDataSource.getRepository(Jobs);

export const createJobs = async (input: Partial<Jobs>) => {
    return await orgRepository.save(orgRepository.create(input));
};

export const updateJobs = async (input: Partial<Jobs>) => {
    return await orgRepository.update(input.id, input);
};
