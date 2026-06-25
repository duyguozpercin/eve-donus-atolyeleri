import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type RegisterWorkshopParams = {
  workshopId: string;
  workshopSlug: string;
  workshopTitle: string;
  capacity: number;
  userId: string;
  userEmail: string;
};

export type WorkshopRegistration = {
  id: string;
  workshopId: string;
  workshopSlug: string;
  workshopTitle: string;
  capacity?: number;
  userId: string;
  userEmail: string;
  status: "registered";
};

export type WorkshopStats = {
  workshopId: string;
  workshopSlug: string;
  workshopTitle: string;
  capacity: number;
  registeredCount: number;
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

export async function getWorkshopStats(workshopSlug: string) {
  const statsRef = doc(db, "workshopStats", workshopSlug);
  const snapshot = await getDoc(statsRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as WorkshopStats;
}

export async function registerWorkshop({
  workshopId,
  workshopSlug,
  workshopTitle,
  capacity,
  userId,
  userEmail,
}: RegisterWorkshopParams) {
  const registrationId = getRegistrationId(userId, workshopSlug);

  const registrationRef = doc(
    db,
    "workshopRegistrations",
    registrationId
  );

  const statsRef = doc(db, "workshopStats", workshopSlug);

  await runTransaction(db, async (transaction) => {
    const registrationSnapshot = await transaction.get(
      registrationRef
    );

    if (registrationSnapshot.exists()) {
      throw new Error("Bu atölyeye zaten kayıtlısınız.");
    }

    const statsSnapshot = await transaction.get(statsRef);

    const currentRegisteredCount = statsSnapshot.exists()
      ? statsSnapshot.data().registeredCount ?? 0
      : 0;

    if (capacity > 0 && currentRegisteredCount >= capacity) {
      throw new Error("Bu atölyenin kontenjanı dolmuştur.");
    }

    transaction.set(registrationRef, {
      workshopId,
      workshopSlug,
      workshopTitle,
      capacity: capacity ?? 0,
      userId,
      userEmail,
      status: "registered",
      createdAt: serverTimestamp(),
    });

    transaction.set(
      statsRef,
      {
        workshopId,
        workshopSlug,
        workshopTitle,
        capacity: capacity ?? 0,
        registeredCount: currentRegisteredCount + 1,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
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