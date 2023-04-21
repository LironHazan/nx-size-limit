import { SizeLimitExecutorSchema } from './schema';
import { ExecutorContext } from "nx/src/config/misc-interfaces";
import { execSync } from "child_process";
import runExecutor, {constructCommand} from './executor';
import * as child_process from "child_process";

console.log = jest.fn();

describe('runExecutor', () => {
  const options: SizeLimitExecutorSchema = { why: false };
  const context: ExecutorContext & { projectName: string } = {
    cwd: "", isVerbose: false,
    root: '',
    workspace: {
      version: 2,
      projects: {
        myProject: {
          root: 'apps/my-project',
          sourceRoot: 'apps/my-project/src',
          projectType: 'application',
        }
      }
    },
    projectName: 'myProject'
  };

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => void 0);
    jest.spyOn(process, 'cwd').mockReturnValue('/path/to/project');
    jest.spyOn(process, 'exit').mockImplementation(() => (void 0) as never);
    jest.spyOn(child_process, 'execSync').mockImplementation(() => '');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should run the size-limit command with the correct arguments', async () => {
    await runExecutor(options, context);

    expect(console.log).toHaveBeenCalledWith('Executor ran for SizeLimit', options);
    expect(execSync).toHaveBeenCalledWith('size-limit', { stdio: 'inherit', cwd: 'apps/my-project' });
  });

  it('should return success: true', async () => {
    const result = await runExecutor(options, context);
    expect(result.success).toBe(true);
  });
});

describe('constructCommand', () => {
  it('construct command with --why flag', () => {
    const options: SizeLimitExecutorSchema = {
      why: true
    };
   const cmd = constructCommand(options);
    expect(cmd).toEqual('size-limit --why');
  });
});
