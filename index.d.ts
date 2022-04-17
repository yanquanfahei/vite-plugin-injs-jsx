import { Plugin } from 'vite';

export default transformJsxInJs;
declare const transformJsxInJs: VitePluginInJsJsx;

export interface IOptions {
  include?: string[];
  jsxOptions?: Record<string, any>;
  babelrc: {
    presets: babel.PluginItem[];
    plugins: babel.PluginItem[];
  }
}

export interface VitePluginInJsJsx {
  (options: IOptions): Plugin[];
}