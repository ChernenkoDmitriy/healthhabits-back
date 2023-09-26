import { Controller } from '@nestjs/common';
import { UserPlanService } from './user-plan.service';

@Controller('user-plan')
export class UserPlanController {

    constructor(private userPlanService: UserPlanService) { }


}
