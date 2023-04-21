import { SizeLimitExecutorSchema } from './schema';
import { ExecutorContext } from "nx/src/config/misc-interfaces";
import {execSync} from "child_process";

export default async function runExecutor(
  options: SizeLimitExecutorSchema,
  context: ExecutorContext & { projectName: string }
) {
  console.log('Executor ran for SizeLimit', options);
  const cwd = context.workspace.projects[context.projectName].root;
  execSync(constructCommand(options), { stdio: 'inherit', cwd });
  return {
    success: true
  };
}

export function constructCommand(options: SizeLimitExecutorSchema): string {
  return options.why === true ? 'size-limit --why' : 'size-limit';
}



