import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type RegisterWorkshopParams = {
  workshopId: string;
  workshopSlug: string;
  workshopTitle: string;
  userId: string;
  userEmail: string;
};

export type WorkshopRegistration = {
  id: string;
  workshopId: string;
  workshopSlug: string;
  workshopTitle: string;
  userId: string;
  userEmail: string;
  status: "registered";
};

function getRegistrationId(userId: string, workshopSlug: string) {
  return `${userId}_${workshopSlug}`;
}

export async function checkWorkshopRegistration(
  workshopSlug: string,
  userId: string
) {
  const registrationId = getRegistrationId(userId, workshopSlug);

  const registrationRef = doc(
    db,
    "workshopRegistrations",
    registrationId
  );

  const snapshot = await getDoc(registrationRef);

  return snapshot.exists();
}

export async function registerWorkshop({
  workshopId,
  workshopSlug,
  workshopTitle,
  userId,
  userEmail,
}: RegisterWorkshopParams) {
  const registrationId = getRegistrationId(userId, workshopSlug);

  const registrationRef = doc(
    db,
    "workshopRegistrations",
    registrationId
  );

  const snapshot = await getDoc(registrationRef);

  if (snapshot.exists()) {
    throw new Error("Bu atölyeye zaten kayıtlısınız.");
  }

  await setDoc(registrationRef, {
    workshopId,
    workshopSlug,
    workshopTitle,
    userId,
    userEmail,
    status: "registered",
    createdAt: serverTimestamp(),
  });
}

export async function getUserRegistrations(userId: string) {
  const q = query(
    collection(db, "workshopRegistrations"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as WorkshopRegistration[];
}