'use server'

import { prisma } from '@/lib/prisma'
import {
  createProjectInputSchema,
  CreateProjectInputSchema,
} from '@/lib/schemas/createProjectSchema'
import { ActionResult } from '@/types'
import { Task } from '@prisma/client'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import defaultData from '@/constants/default-data.json'
