import { SetMetadata } from '@nestjs/common';

type TRole = 'user' | 'moderator' | 'admin' | 'superadmin';

export const Role = (role: TRole) => SetMetadata('role', role);
