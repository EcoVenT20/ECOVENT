import 'dotenv/config';
import { getUserByUsername, verifyPassword } from './server/db.ts';
import { sdk } from './server/_core/sdk.ts';
import bcrypt from 'bcrypt';

async function testLoginFlow() {
  try {
    console.log('1. Testing getUserByUsername...');
    const user = await getUserByUsername('admin');
    console.log('User found:', !!user);
    
    if (!user) {
      console.error('User not found');
      return;
    }
    
    console.log('\n2. Testing password verification...');
    const isValid = await verifyPassword('admin', 'admin123');
    console.log('Password verification result:', isValid);
    
    if (!isValid) {
      console.error('Password verification failed');
      return;
    }
    
    console.log('\n3. Testing SDK createSessionToken...');
    const sessionToken = await sdk.createSessionToken(user.openId || `local-${user.id}`, {
      name: user.name || 'Admin',
      expiresInMs: 365 * 24 * 60 * 60 * 1000,
    });
    console.log('Session token created:', !!sessionToken);
    console.log('Session token length:', sessionToken.length);
    
    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Error:', error);
    console.error(error?.stack);
  }
}

testLoginFlow();
