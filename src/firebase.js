import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

export async function connectFirebase(){
  // Firebase Hosting serves this public web config for the deployed site.
  let config;
  try { const response=await fetch('/__/firebase/init.json',{cache:'no-store'}); if(response.ok) config=await response.json(); } catch {}
  config ||= {apiKey:import.meta.env.VITE_FIREBASE_API_KEY,authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,appId:import.meta.env.VITE_FIREBASE_APP_ID};
  if(!config.projectId || !config.apiKey) throw new Error('La configuración Firebase de este sitio está incompleta.');
  const app=initializeApp(config);
  return {auth:getAuth(app),db:getFirestore(app),config};
}
