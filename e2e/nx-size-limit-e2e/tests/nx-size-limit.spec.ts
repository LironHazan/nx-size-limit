import {
  checkFilesExist,
  ensureNxProject, readJson,
  runNxCommandAsync,
  uniq,
} from "@nrwl/nx-plugin/testing";
import {joinPathFragments} from "nx/src/utils/path";

describe("nx-size-limit e2e", () => {
  const app = uniq("nx-size-limit");

  beforeAll(async () => {
    ensureNxProject(
      "nx-size-limit",
      "dist/packages/nx-size-limit"
    );
    await runNxCommandAsync(`g @nrwl/react:application ${app} --e2eTestRunner=none`);
  }, 180000);

  afterAll(() => {
    runNxCommandAsync("reset");
  });

  it("Configure nx-size-limit in a project", async () => {
    await runNxCommandAsync(`g nx-size-limit:add --name=${app}`);
    const projectJsonPath = joinPathFragments('apps', app, 'project.json');
    expect(() => checkFilesExist(projectJsonPath)).not.toThrow();

    const sizeLimitJsonPath = joinPathFragments('apps', app, '.size-limit.json');
    expect(() => checkFilesExist(sizeLimitJsonPath)).not.toThrow();

    const projectJson = readJson(projectJsonPath);
    expect(
      projectJson.targets["size-limit"].executor === 'nx-size-limit:size-limit'
    ).toBeTruthy();
    }, 180000);

  it("Exec size limit check", async () => {
    await runNxCommandAsync(`run ${app}:build`);
    const result = await runNxCommandAsync(`run ${app}:size-limit`);
    console.log(result.stdout);
    expect(result.stdout).toContain("Executor ran");
  }, 180000);

});
