import 'dotenv/config';
import { ENV } from './server/_core/env.ts';

console.log('ENV.cookieSecret:', ENV.cookieSecret);
console.log('ENV.cookieSecret length:', ENV.cookieSecret.length);
console.log('process.env.JWT_SECRET:', process.env.JWT_SECRET);
console.log('process.env.JWT_SECRET length:', process.env.JWT_SECRET?.length || 'undefined');
