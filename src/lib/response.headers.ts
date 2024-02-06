import type { Handle } from '@sveltejs/kit';
import type { SecurityHeader } from './types.js';

const applySecurityHeaders = ( headers: Headers, securityHeaders: SecurityHeader[] ) => {
  securityHeaders.forEach( ( header ) => {
    if ( header.value !== undefined ) {
      if ( headers.get( header.name ) !== header.value ) {
        headers.set( header.name, header.value );
      }
    } else {
      if ( headers.has( header.name ) ) {
        headers.delete( header.name );
      }
    }
  } );
};

const applySecurityHeaderHook: Handle = async ( { event, resolve } ) => {
  const response = await resolve( event );
  applySecurityHeaders( response.headers, SecurityHeaders )
  return response;
};

const OwaspRecommendedHeaders: SecurityHeader[] = [
  { name: 'X-Frame-Options', value: 'DENY' },
  { name: 'X-XSS-Protection', value: '0' },
  { name: 'X-Content-Type-Options', value: 'nosniff' },
  {
    name: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  { name: 'Content-Type', value: 'text/html; charset=UTF-8' },
  { name: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { name: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
  { name: 'Cross-Origin-Resource-Policy', value: 'same-site' },
  { name: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=()' },
  { name: 'Server', value: 'webserver' },
  { name: 'Expect-CT', value: undefined },
  { name: 'X-Powered-By', value: undefined },
  { name: 'Public-Key-Pins', value: undefined },
];

const useOwaspRecommended = () => {
  SecurityHeaders = [ ...new Set( [ ...SecurityHeaders, ...OwaspRecommendedHeaders ] ) ];
};

const useHeaders = ( headers: SecurityHeader[] ) => {
  SecurityHeaders = [ ...new Set( [ ...SecurityHeaders, ...headers ] ) ];
};

let SecurityHeaders: SecurityHeader[] = [];

export const HttpResponseHeaders = {
  applySecurityHeaderHook,
  applySecurityHeaders,
  useOwaspRecommended,
  useHeaders,
  OwaspRecommendedHeaders
};
