import {
  formatFiles,
  generateFiles,
  Tree, updateJson,
} from '@nrwl/devkit';
import * as path from 'path';
import {AddGeneratorSchema, BundlerType} from './schema';
import {match} from "ts-pattern";

interface NormalizedSchema extends AddGeneratorSchema {
  projectName: string;
  projectRoot: string;
}

function updateProjectJson(tree: Tree, projectRoot: string): void {
  const projectConfigPath = `${projectRoot}/project.json`;
  return updateJson(tree, projectConfigPath, (json) => {
    if (!json.targets['size-limit']) {
      json.targets['size-limit'] = {
        "executor": "nx-size-limit:size-limit"
      };
    }
    return json;
  });
}

export function normalizeOptions(tree: Tree, options: AddGeneratorSchema): NormalizedSchema {
  const { name, projectsDir, bundler } = options;
  const  dirName = projectsDir ?? 'apps';
  const  bundlerName = bundler ?? 'webpack';
  const projectRoot = path.join(dirName, name);
  return { ...options, projectName: name, projectsDir: dirName, projectRoot, bundler: bundlerName };
}

export function normalizePath(projectsDir: string, name: string, bundler: BundlerType): string {
  const mainJsPath = match([bundler])
    .with(['vite'], () => `"../../dist/${projectsDir}/${name}/assets/index*.js"`)
    .with(['webpack'], () => `../../dist/${projectsDir}/${name}/main*.js`)
    .otherwise(() => `../../dist/${projectsDir}/${name}/main*.js`)
  return path.posix.join(...mainJsPath.split(path.sep));
}

export default async function (tree: Tree, options: AddGeneratorSchema) {
  const { projectsDir, name, projectRoot, bundler } = normalizeOptions(tree, options);
  const normalizedMainJsPath = normalizePath(projectsDir, name, bundler);
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, { path: normalizedMainJsPath });
  updateProjectJson(tree, projectRoot)
  await formatFiles(tree);
}
