import * as Hapi from '@hapi/hapi';

export namespace hapiSwaggerStatic {

  interface RegisterOptions {
    path?: string;
    swaggerEndpoint?: string;
    cache?: false | Hapi.RouteOptionsCache | undefined;
    auth?: string | false | Hapi.RouteOptionsAccess | undefined;
    headers?: Hapi.Util.Dictionary<string>;
    template?: string;
    viewOptions?: unknown; // not further specified
    o2hOptions?: unknown; // not further specified
  }

}

// eslint-disable-next-line @typescript-eslint/no-redeclare
declare const hapiSwaggerStatic: Hapi.Plugin<hapiSwaggerStatic.RegisterOptions>;

export default hapiSwaggerStatic;
