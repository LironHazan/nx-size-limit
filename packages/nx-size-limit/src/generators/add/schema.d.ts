export type BundlerType = 'vite' | 'webpack';

export interface AddGeneratorSchema {
    name: string;
    projectsDir?: string;
    bundler?: BundlerType
}
