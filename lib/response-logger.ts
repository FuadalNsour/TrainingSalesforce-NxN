import { getStore } from '@netlify/blobs';
import fs from 'fs';
import path from 'path';

export interface LabResponse {
  id: string;
  labId: string;
  labTitle: string;
  context: string;
  situation: string;
  question: string;
  userResponse: string;
  timestamp: string;
}

const RESPONSES_KEY = 'lab_responses.json';
const LOCAL_FILE = path.join(process.cwd(), 'data', 'lab_responses.json');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

function ensureLocalFile() {
  const dir = path.dirname(LOCAL_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_FILE)) {
    fs.writeFileSync(LOCAL_FILE, JSON.stringify([], null, 2));
  }
}

export async function saveLabResponse(response: Omit<LabResponse, 'id' | 'timestamp'>) {
  try {
    let responses: LabResponse[] = [];

    if (IS_PRODUCTION) {
      const store = getStore('lab-responses');
      const existingData = await store.get(RESPONSES_KEY);

      if (existingData) {
        const text = new TextDecoder().decode(existingData);
        responses = JSON.parse(text);
      }
    } else {
      ensureLocalFile();
      responses = JSON.parse(fs.readFileSync(LOCAL_FILE, 'utf-8'));
    }

    const newResponse: LabResponse = {
      ...response,
      id: `${response.labId}-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    responses.push(newResponse);
    const jsonString = JSON.stringify(responses, null, 2);

    if (IS_PRODUCTION) {
      const store = getStore('lab-responses');
      const blob = new Blob([jsonString], { type: 'application/json' });
      await store.set(RESPONSES_KEY, blob);
    } else {
      fs.writeFileSync(LOCAL_FILE, jsonString);
    }

    return newResponse;
  } catch (error) {
    console.error('Error saving lab response:', error);
    throw error;
  }
}

export async function getAllResponses(): Promise<LabResponse[]> {
  try {
    if (IS_PRODUCTION) {
      const store = getStore('lab-responses');
      const data = await store.get(RESPONSES_KEY);

      if (!data) {
        return [];
      }

      const text = new TextDecoder().decode(data);
      return JSON.parse(text);
    } else {
      ensureLocalFile();
      const data = fs.readFileSync(LOCAL_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading lab responses:', error);
    return [];
  }
}
