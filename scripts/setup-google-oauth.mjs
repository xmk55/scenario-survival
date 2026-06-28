import { GoogleAuth } from 'google-auth-library';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GCLOUD = process.env.GCLOUD_PATH || path.join(
  process.env.LOCALAPPDATA || '',
  'Google',
  'Cloud SDK',
  'google-cloud-sdk',
  'bin',
  'gcloud.cmd'
);

const PROJECT_ID = 'scenario-survival-game';
const APP_NAME = 'Scenario Survival';
const ORIGINS = [
  'https://scenario-survival.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
];

function gcloud(...args) {
  const cmd = `"${GCLOUD}" ${args.join(' ')}`;
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
}

function gcloudJson(...args) {
  return JSON.parse(gcloud(...args, '--format=json'));
}

async function ensureProject() {
  try {
    gcloud('projects', 'describe', PROJECT_ID);
    console.log(`Project ${PROJECT_ID} exists.`);
  } catch {
    console.log('Creating GCP project...');
    gcloud('projects', 'create', PROJECT_ID, '--name', `"${APP_NAME}"`);
    gcloud('config', 'set', 'project', PROJECT_ID);
  }
  gcloud('config', 'set', 'project', PROJECT_ID);
}

async function createOAuthClient() {
  const token = gcloud('auth', 'print-access-token').trim();
  const auth = new GoogleAuth();
  const client = await auth.getClient();

  let projectNumber;
  try {
    const project = gcloudJson('projects', 'describe', PROJECT_ID);
    projectNumber = project.projectNumber;
  } catch (err) {
    throw new Error(`Project unavailable. Accept Google Cloud Terms at https://console.cloud.google.com/ then rerun.`);
  }

  gcloud('services', 'enable', 'iap.googleapis.com', 'cloudresourcemanager.googleapis.com');

  let brand;
  try {
    const brands = gcloudJson('alpha', 'iap', 'oauth-brands', 'list', `--filter=applicationTitle:${APP_NAME}`);
    brand = brands[0];
  } catch {
    brand = null;
  }

  if (!brand) {
    console.log('Creating OAuth brand...');
    gcloud('alpha', 'iap', 'oauth-brands', 'create', '--application_title', `"${APP_NAME}"`, '--support_email', 'yatu5379@gmail.com');
    const brands = gcloudJson('alpha', 'iap', 'oauth-brands', 'list');
    brand = brands.find((b) => b.applicationTitle === APP_NAME) || brands[0];
  }

  const brandName = brand.name;
  console.log('Using brand:', brandName);

  let oauthClient;
  try {
    const clients = gcloudJson('alpha', 'iap', 'oauth-clients', 'list', brandName);
    oauthClient = clients.find((c) => c.displayName === `${APP_NAME} Web`) || clients[0];
  } catch {
    oauthClient = null;
  }

  if (!oauthClient) {
    console.log('Creating OAuth web client...');
    oauthClient = gcloudJson(
      'alpha', 'iap', 'oauth-clients', 'create', brandName,
      '--display_name', `"${APP_NAME} Web"`,
      '--format=json'
    );
  }

  const clientId = oauthClient.name?.split('/').pop() || oauthClient.clientId;
  console.log('\nGoogle OAuth Client ID:', clientId);

  const envLocal = path.join(__dirname, '..', '.env.local');
  let envContent = fs.existsSync(envLocal) ? fs.readFileSync(envLocal, 'utf8') : '';
  const upsert = (key, value) => {
    const re = new RegExp(`^${key}=.*$`, 'm');
    const line = `${key}="${value}"`;
    envContent = re.test(envContent) ? envContent.replace(re, line) : `${envContent.trim()}\n${line}\n`;
  };
  upsert('VITE_GOOGLE_CLIENT_ID', clientId);
  upsert('GOOGLE_CLIENT_ID', clientId);
  fs.writeFileSync(envLocal, envContent);

  console.log('Updated .env.local with VITE_GOOGLE_CLIENT_ID');
  console.log('\nRun: npx vercel env add VITE_GOOGLE_CLIENT_ID production');
  console.log('And: npx vercel env add GOOGLE_CLIENT_ID production');
  return clientId;
}

try {
  await ensureProject();
  await createOAuthClient();
} catch (err) {
  console.error(err.message || err);
  process.exit(1);
}
