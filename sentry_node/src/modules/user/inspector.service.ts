import { Inspector } from './inspector.entity';
import { AppDataSource } from '../../utilities/data-source';

const orgRepository = AppDataSource.getRepository(Inspector);

export const createInspector = async (input: Partial<Inspector>) => {
    return await orgRepository.save(orgRepository.create(input));
};

export const updateinspector = async (input: Partial<Inspector>) => {
    return await orgRepository.update(input.id, input);
};
