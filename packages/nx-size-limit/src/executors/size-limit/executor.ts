import { SizeLimitExecutorSchema } from './schema';
import { ExecutorContext } from "nx/src/config/misc-interfaces";
import {execSync} from "child_process";

export default async function runExecutor(
  options: SizeLimitExecutorSchema,
  context: ExecutorContext & { projectName: string }
) {
  console.log('Executor ran for SizeLimit', options);
  const cwd = context.workspace.projects[context.projectName].root;
  const cmd = ['size-limit'].concat(argsFromOptions(options)).join(' ');
  console.log(cmd);
  execSync(cmd, { stdio: 'inherit', cwd });
  return {
    success: true
  };
}


export function argsFromOptions(options: SizeLimitExecutorSchema): string[] {
  const args = [];
  for (const [k , v] of Object.entries(options)) {
    args.push(`--${k}=${v}`);
  }
  return args;
}

