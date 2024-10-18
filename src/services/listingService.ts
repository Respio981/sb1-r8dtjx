import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from './firebase';

export const searchListings = async (mlsNumber: string) => {
  const listingRef = collection(firestore, 'listings');
  const q = query(listingRef, where('mlsNumber', '==', mlsNumber));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error('Listing not found');
  }

  const listing = snapshot.docs[0].data();
  return {
    id: snapshot.docs[0].id,
    ...listing,
  };
};

export const createListing = async (listingData: any) => {
  const listingRef = await addDoc(collection(firestore, 'listings'), listingData);
  return listingRef.id;
};

export const updateListing = async (listingId: string, listingData: any) => {
  await updateDoc(doc(firestore, 'listings', listingId), listingData);
};

export const deleteListing = async (listingId: string) => {
  await deleteDoc(doc(firestore, 'listings', listingId));
};