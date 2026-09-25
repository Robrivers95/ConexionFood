import {readFileSync} from 'node:fs';
import {after,before,test} from 'node:test';
import {initializeTestEnvironment,assertSucceeds,assertFails} from '@firebase/rules-unit-testing';
import {doc,setDoc,getDoc,collection,getDocs} from 'firebase/firestore';

let env;
before(async()=>{
  env=await initializeTestEnvironment({projectId:'productos-china-rules-test',firestore:{rules:readFileSync('firestore.rules','utf8'),host:'127.0.0.1',port:8080}});
  await env.withSecurityRulesDisabled(async ctx=>{
    const db=ctx.firestore();
    await setDoc(doc(db,'workspaces','team'),{ownerUid:'owner',name:'Test',createdAt:'2026-09-25'});
    await setDoc(doc(db,'workspaces','team','members','owner'),{name:'Owner',email:'owner@example.com',role:'admin',joinedAt:'2026-09-25'});
    await setDoc(doc(db,'workspaces','team','invites','seller@example.com'),{role:'ventas',createdAt:'2026-09-25'});
  });
});
after(async()=>{await env?.cleanup();});
const signed=(uid,email)=>env.authenticatedContext(uid,{email,email_verified:true}).firestore();

test('verified user can start a private team',async()=>{
  const db=signed('newowner','newowner@example.com');
  await assertSucceeds(setDoc(doc(db,'workspaces','newteam'),{ownerUid:'newowner',name:'New',createdAt:'2026-09-25'}));
  await assertSucceeds(setDoc(doc(db,'workspaces','newteam','members','newowner'),{name:'New owner',email:'newowner@example.com',role:'admin',joinedAt:'2026-09-25'}));
  await assertSucceeds(setDoc(doc(db,'profiles','newowner'),{workspaceId:'newteam'}));
});

test('owner reads team and creates product',async()=>{
  const db=signed('owner','owner@example.com');
  await assertSucceeds(getDoc(doc(db,'workspaces','team')));
  await assertSucceeds(setDoc(doc(db,'workspaces','team','products','one'),{name:'Lámpara',stock:4,cost:70}));
});
test('uninvited account cannot access the team',async()=>{
  const db=signed('stranger','stranger@example.com');
  await assertFails(getDoc(doc(db,'workspaces','team','products','one')));
  await assertFails(getDocs(collection(db,'workspaces','team','members')));
  await assertFails(setDoc(doc(db,'workspaces','team','members','stranger'),{name:'X',email:'stranger@example.com',role:'admin',joinedAt:'2026-09-25'}));
});
test('invitation grants only the designated role',async()=>{
  const db=signed('seller','seller@example.com');
  await assertFails(setDoc(doc(db,'workspaces','team','members','seller'),{name:'Seller',email:'seller@example.com',role:'admin',joinedAt:'2026-09-25'}));
  await assertSucceeds(setDoc(doc(db,'workspaces','team','members','seller'),{name:'Seller',email:'seller@example.com',role:'ventas',joinedAt:'2026-09-25'}));
  await assertSucceeds(getDoc(doc(db,'workspaces','team','products','one')));
  await assertFails(setDoc(doc(db,'workspaces','team','purchases','x'),{qty:2,productId:'one'}));
});
