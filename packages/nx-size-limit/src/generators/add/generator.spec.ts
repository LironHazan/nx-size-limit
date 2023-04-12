import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import generator from './generator';

describe('add generator', () => {
  let tree;
  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  xit('should add size-limit to project.json', async () => {
    tree.write(
      'workspace.json',
      JSON.stringify({
        version: 2,
        projects: {
          'test-app': {
            root: 'apps/test-app',
            sourceRoot: 'apps/test-app/src',
            projectType: 'application',
            architect: {
              build: {
                builder: '@nrwl/node:build',
                options: {},
              },
            },
          },
        },
      })
    );

    await generator(tree, { name: 'test-app' });

    expect(tree.exists('apps/test-app/project.json')).toBeTruthy();
    const projectJson = JSON.parse(
      tree.read('apps/test-app/project.json').toString()
    );
    expect(projectJson['size-limit']).toEqual({
      executor: 'nx-size-limit:size-limit',
    });
  });
});
