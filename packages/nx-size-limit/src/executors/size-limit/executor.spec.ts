import { SizeLimitExecutorSchema } from './schema';
import { ExecutorContext } from "nx/src/config/misc-interfaces";
import { execSync } from "child_process";
import runExecutor, { argsFromOptions } from './executor';
import * as child_process from "child_process";

console.log = jest.fn();

describe('runExecutor', () => {
  const options: SizeLimitExecutorSchema = {
    config: 'size-limit.config.js'
  };
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
    expect(console.log).toHaveBeenCalledWith('size-limit --config=size-limit.config.js');
    expect(execSync).toHaveBeenCalledWith('size-limit --config=size-limit.config.js', { stdio: 'inherit', cwd: 'apps/my-project' });
  });

  it('should return success: true', async () => {
    const result = await runExecutor(options, context);
    expect(result.success).toBe(true);
  });
});

describe('argsFromOptions', () => {
  it('should convert options to command-line arguments', () => {
    const options: SizeLimitExecutorSchema = {
      limit: '200 KB'
    };
    const args = argsFromOptions(options);
    expect(args).toEqual([
      '--limit=200 KB'
    ]);
  });
});
