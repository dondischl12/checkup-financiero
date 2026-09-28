// Session-only storage. There are no user accounts in this product: the checkup runs
// as a single private session held in memory, so nothing survives a page refresh and
// nothing is ever written to a database. Aggregate analytics (see supabase_schema_draft.sql)
// are anonymous and one-way; they never come back into the browser.

let sessionSnapshot = null
let sessionDraft = {}

// Keys written by earlier builds that used localStorage. Kept only so the privacy page
// can still wipe anything a previous version of the app left on the device.
const LEGACY_STORAGE_KEYS = [
  'katalyst_local_account',
  'katalyst_user_profile',
  'katalyst:checkupDraft',
  'katalyst_checkup_entries',
  'katalyst:lastSnapshot',
  'katalyst:snapshots',
  'katalyst_learning_progress',
  'katalyst_help_requests',
  'katalyst_event_interest',
]

export function getLastSnapshot() {
  return sessionSnapshot
}

export function saveSnapshot(snapshot) {
  sessionSnapshot = snapshot
  return snapshot
}

export function readCheckupDraft() {
  return sessionDraft
}

export function writeCheckupDraft(value) {
  sessionDraft = value
  return value
}

export function clearLocalData() {
  LEGACY_STORAGE_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(key)
    } catch {
      // Storage can be unavailable (private mode / blocked cookies); nothing to clean up.
    }
  })
  sessionSnapshot = null
  sessionDraft = {}
}
