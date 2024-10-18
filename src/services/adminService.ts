import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firestore } from './firebase';

export const getUsers = async () => {
  const usersSnapshot = await getDocs(collection(firestore, 'users'));
  return usersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
  await updateDoc(doc(firestore, 'users', userId), { role: newRole });
};