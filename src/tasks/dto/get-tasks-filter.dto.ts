import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks.status.enum';

export class GetTasksFilterDto {
	@IsOptional()
	search: string;

	@IsOptional()
	@IsEnum(TaskStatus)
	status?: TaskStatus;
}
