import { SetMetadata } from '@nestjs/common';

export default (...roles: string[]) => SetMetadata('roles', roles);
