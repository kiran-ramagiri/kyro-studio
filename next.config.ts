import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix for the workspace root inference issue
  outputFileTracingRoot: path.join(__dirname),
};
 
export default withNextIntl(nextConfig);
