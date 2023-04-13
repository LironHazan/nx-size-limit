import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import {normalizeOptions, normalizePath} from './generator';

describe('add size-limit generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully with optional projectsDir', async () => {
    const options = { name: "my-lib", projectsDir: "libs"};
    const {projectsDir, bundler} = normalizeOptions(tree, options)
    const p = normalizePath(projectsDir, options.name, bundler)
    expect(p).toBe("../../dist/libs/my-lib/main*.js");
  });

  it('should run successfully without projectsDir defaults to apps', async () => {
    const options = { name: "my-lib"};
    const {projectsDir, bundler} = normalizeOptions(tree, options);
    expect(projectsDir).toBe("apps");
    const p = normalizePath(projectsDir,  options.name, bundler)
    expect(p).toBe("../../dist/apps/my-lib/main*.js");
  });
});
