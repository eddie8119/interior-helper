import { getAuthUserId } from '@/actions/authActions'
import { auth } from '@/auth'
import { ActionResult } from '@/types'

type ActionFunction<T, Args extends any[]> = (
  ...args: Args
) => Promise<ActionResult<T>>

export function withAuth<T, Args extends any[]>(
  action: (userId: string, ...args: Args) => Promise<ActionResult<T>>
): ActionFunction<T, Args> {
  return async (...args: Args) => {
    try {
      const userId = await getAuthUserId()  
      return await action(userId, ...args)
    } catch (error) {
      console.error('Auth error:', error)
      return { status: 'error', error: 'Authentication failed' }
    }
  }
}
