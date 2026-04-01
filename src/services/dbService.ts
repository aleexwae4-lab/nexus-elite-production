import { db } from '../firebase';
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ProjectSchema, UserSchema } from '../lib/validation';
import { z } from 'zod';

export const dbService = {
  async getProjects(userId: string) {
    const q = query(collection(db, 'projects'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async createProject(data: z.infer<typeof ProjectSchema>) {
    const validatedData = ProjectSchema.parse(data);
    return await addDoc(collection(db, 'projects'), validatedData);
  },

  async updateUser(userId: string, data: z.infer<typeof UserSchema>) {
    const validatedData = UserSchema.parse(data);
    const userRef = doc(db, 'users', userId);
    return await updateDoc(userRef, validatedData);
  },
};
