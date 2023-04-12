import {
  formatFiles,
  generateFiles,
  Tree, updateJson,
} from '@nrwl/devkit';
import * as path from 'path';
import { AddGeneratorSchema } from './schema';


interface NormalizedSchema extends AddGeneratorSchema {
  projectName: string;
  projectRoot: string;
}

function normalizeOptions(tree: Tree, options: AddGeneratorSchema): NormalizedSchema {
  const projectName = options.name;
  //todo: augment to libs as well
  const projectRoot = path.join('apps', projectName);
  return { ...options, projectName, projectRoot };
}

export default async function (tree: Tree, options: AddGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  const mainJsPath = `../../dist/apps/${options.name}/main*.js`;
  const normalizedMainJsPath = path.posix.join(...mainJsPath.split(path.sep));
  generateFiles(tree, path.join(__dirname, 'files'), normalizedOptions.projectRoot, { path: normalizedMainJsPath });

  const projectConfigPath = `${normalizedOptions.projectRoot}/project.json`;

  await updateJson(tree, projectConfigPath, (json) => {
    if (!json.targets['size-limit']) {
      json.targets['size-limit'] = {
        "executor": "nx-size-limit:size-limit"
      };
    }
    return json;
  });
  await formatFiles(tree);
}
