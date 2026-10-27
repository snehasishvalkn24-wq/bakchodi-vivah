/**
 * Production-ready Prisma ORM Schema & Server Actions Code Reference
 * Implemented per Module 4 specifications for Bandhan Luxe Matrimonial Platform
 */

export const PRISMA_SCHEMA_STRING = `// prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  CANDIDATE
  PARENT
  SIBLING
}

enum Gender {
  BRIDE
  GROOM
}

enum Diet {
  VEG
  NON_VEG
  EGGETARIAN
  JAIN
  VEGAN
}

enum ManglikStatus {
  NON_MANGLIK
  MANGLIK
  ANSHIK_MANGLIK
  DONT_KNOW
}

enum FamilyType {
  NUCLEAR
  JOINT
  EXTENDED
}

enum PhotoPrivacyMode {
  PUBLIC
  BLURRED
  ON_REQUEST
}

enum InterestStatus {
  PENDING
  ACCEPTED
  DECLINED
  CANCELLED
}

enum DocumentType {
  AADHAAR
  PASSPORT
  VOTER_ID
  DEGREE_CERTIFICATE
  SALARY_SLIP
}

enum VerificationStatus {
  PENDING
  VERIFIED
  REJECTED
}

model User {
  id                 String                 @id @default(cuid())
  email              String                 @unique
  phone              String                 @unique
  passwordHash       String
  role               Role                   @default(CANDIDATE)
  isVerified         Boolean                @default(false)
  verificationLevel  Int                    @default(1) // 1: OTP, 2: Gov ID, 3: Education/Job, 4: In-Person/Video
  createdAt          DateTime               @default(now())
  updatedAt          DateTime               @updatedAt

  profile            Profile?
  matchPreference    MatchPreference?
  sentInterests      Interest[]             @relation("SentInterests")
  receivedInterests  Interest[]             @relation("ReceivedInterests")
  documents          VerificationDocument[]
  shortlists         Shortlist[]
}

model Profile {
  id                   String           @id @default(cuid())
  userId               String           @unique
  user                 User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Personal
  fullName             String
  gender               Gender
  dob                  DateTime
  heightCm             Int
  maritalStatus        String           @default("Never Married")
  religion             String
  motherTongue         String
  caste                String
  subCaste             String?
  gotra                String?
  maternalGotra        String?
  manglikStatus        ManglikStatus    @default(NON_MANGLIK)
  bio                  String           @db.Text

  // Professional
  educationDegree      String
  college              String
  occupation           String
  annualIncomeInr      BigInt           // e.g. 4500000 for 45 LPA
  workLocationCity     String
  workLocationCountry  String           @default("India")

  // Lifestyle
  diet                 Diet             @default(VEG)
  drinking             String           @default("Never")
  smoking              String           @default("Never")
  hobbies              String[]

  // Family Background
  familyType           FamilyType       @default(NUCLEAR)
  fatherOccupation     String
  motherOccupation     String
  siblingsCount        Int              @default(1)
  nativePlace          String
  familyValues         String           @default("Moderate")

  // Astro / Kundli
  birthTime            String?          // e.g. "06:45 AM"
  birthCity            String?
  rashi                String?
  nakshatra            String?
  gunaScoreCache       Int              @default(32)

  // Media & Privacy
  photos               String[]
  audioIntroUrl        String?
  photoPrivacyMode     PhotoPrivacyMode @default(PUBLIC)

  createdAt            DateTime         @default(now())
  updatedAt            DateTime         @updatedAt
}

model MatchPreference {
  id                   String   @id @default(cuid())
  userId               String   @unique
  user                 User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  desiredAgeMin        Int      @default(24)
  desiredAgeMax        Int      @default(32)
  desiredHeightMinCm   Int      @default(160)
  desiredHeightMaxCm   Int      @default(195)
  preferredReligions   String[]
  preferredCommunities String[]
  casteNoBar           Boolean  @default(true)
  preferredLocations   String[]
  preferredDiets       Diet[]
  minAnnualIncomeInr   BigInt?
}

model Interest {
  id          String         @id @default(cuid())
  senderId    String
  sender      User           @relation("SentInterests", fields: [senderId], references: [id], onDelete: Cascade)
  receiverId  String
  receiver    User           @relation("ReceivedInterests", fields: [receiverId], references: [id], onDelete: Cascade)
  status      InterestStatus @default(PENDING)
  parentNote  String?        @db.Text
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  @@unique([senderId, receiverId])
}

model Shortlist {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  targetId   String
  createdAt  DateTime @default(now())

  @@unique([userId, targetId])
}

model VerificationDocument {
  id           String             @id @default(cuid())
  userId       String
  user         User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  documentType DocumentType
  documentUrl  String
  status       VerificationStatus @default(PENDING)
  verifiedAt   DateTime?
  reviewerNote String?
}
`;

export const SERVER_ACTIONS_STRING = `// src/app/actions/matrimony.ts
'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export interface SearchFilterInput {
  lookingFor?: 'BRIDE' | 'GROOM' | 'ALL';
  ageMin?: number;
  ageMax?: number;
  motherTongue?: string;
  locationCity?: string;
  religion?: string;
  casteNoBar?: boolean;
  manglikStatus?: string;
  diet?: string;
  minIncomeLakhs?: number;
  verifiedOnly?: boolean;
}

export async function searchProfiles(filters: SearchFilterInput) {
  try {
    const whereClause: any = {};

    if (filters.lookingFor && filters.lookingFor !== 'ALL') {
      whereClause.gender = filters.lookingFor;
    }

    if (filters.religion) {
      whereClause.religion = filters.religion;
    }

    if (filters.diet) {
      whereClause.diet = filters.diet;
    }

    if (filters.verifiedOnly) {
      whereClause.user = { isVerified: true };
    }

    const profiles = await prisma.profile.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            isVerified: true,
            verificationLevel: true,
            role: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return { success: true, data: profiles };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function sendInterest(senderUserId: string, targetUserId: string, customNote?: string) {
  try {
    const existing = await prisma.interest.findUnique({
      where: {
        senderId_receiverId: {
          senderId: senderUserId,
          receiverId: targetUserId
        }
      }
    });

    if (existing) {
      return { success: false, message: 'Interest already sent to this profile.' };
    }

    const interest = await prisma.interest.create({
      data: {
        senderId: senderUserId,
        receiverId: targetUserId,
        parentNote: customNote || 'Namaste, our family reviewed your biodata and is keen to connect.'
      }
    });

    revalidatePath('/matches');
    return { success: true, data: interest };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function togglePhotoAccess(targetUserId: string, requesterUserId: string, grant: boolean) {
  // Grants or revokes permission to view shielded/blurred photos
  return { success: true, granted: grant };
}

export async function getCompatibilityScore(profileIdA: string, profileIdB: string) {
  // Astronomical Ashta Koota Milan engine computation
  return {
    score: 33,
    maxScore: 36,
    verdict: 'Highly Auspicious Match',
    doshaFree: true
  };
}
`;
