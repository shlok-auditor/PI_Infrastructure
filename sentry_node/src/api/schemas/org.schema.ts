import { object, string, TypeOf, z } from 'zod';
import { RoleEnumType } from '../../modules/user/user.entity';

export const createOrgSchema = object({
    body: object({
        id: string(),
        email: string({
            required_error: 'Email address is required',
          }).email('Invalid email address'),
        name: string({
            required_error: 'Organization Name is required',
        }),
        username: string({
            required_error: 'username is required',
        }),
        password: string({
            required_error: 'Password is required',
        })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        role: z.optional(z.nativeEnum(RoleEnumType)),
    })
});

export type createOrgInput = TypeOf<typeof createOrgSchema>['body'];