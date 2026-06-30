export const STORAGE_KEYS = {
  localAccount: 'katalyst_local_account',
  profile: 'katalyst_user_profile',
  checkupDraft: 'katalyst:checkupDraft',
  checkups: 'katalyst_checkup_entries',
  lastSnapshot: 'katalyst:lastSnapshot',
  snapshots: 'katalyst:snapshots',
  learning: 'katalyst_learning_progress',
  helpRequests: 'katalyst_help_requests',
  eventInterest: 'katalyst_event_interest',
}

let guestCheckupDraft = {}
let guestLastSnapshot = null
let guestSnapshotHistory = []

export function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

export function getLocalAccount() {
  return readStorage(STORAGE_KEYS.localAccount, null)
}

export function getProfile() {
  return readStorage(STORAGE_KEYS.profile, null)
}

export function getCheckups() {
  if (!hasSnapshotSaveConsent()) return []
  return readStorage(STORAGE_KEYS.checkups, [])
}

export function getLatestCheckup() {
  const entries = getCheckups()
  return entries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null
}

export function getLastSnapshot() {
  if (!hasSnapshotSaveConsent()) return guestLastSnapshot
  return readStorage(STORAGE_KEYS.lastSnapshot, null) || guestLastSnapshot
}

export function saveSnapshot(snapshot, { persist = hasSnapshotSaveConsent() } = {}) {
  if (!persist) {
    guestLastSnapshot = snapshot
    guestSnapshotHistory = [snapshot]
    return snapshot
  }

  writeStorage(STORAGE_KEYS.lastSnapshot, snapshot)
  const snapshots = readStorage(STORAGE_KEYS.snapshots, [])
  const next = [snapshot, ...snapshots.filter((item) => item.createdAt !== snapshot.createdAt)].slice(0, 24)
  writeStorage(STORAGE_KEYS.snapshots, next)
  return snapshot
}

export function getSnapshotHistory() {
  const snapshots = hasSnapshotSaveConsent() ? readStorage(STORAGE_KEYS.snapshots, []) : guestSnapshotHistory
  return snapshots
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
}

export function readCheckupDraft() {
  return hasSnapshotSaveConsent() ? readStorage(STORAGE_KEYS.checkupDraft, {}) : guestCheckupDraft
}

export function writeCheckupDraft(value) {
  if (hasSnapshotSaveConsent()) writeStorage(STORAGE_KEYS.checkupDraft, value)
  else guestCheckupDraft = value
  return value
}

export function saveCheckupEntry(entry) {
  if (!hasSnapshotSaveConsent()) return null
  const entries = readStorage(STORAGE_KEYS.checkups, [])
  return writeStorage(STORAGE_KEYS.checkups, [entry, ...entries])
}

export function persistSnapshotForAccount(snapshot = guestLastSnapshot) {
  if (!snapshot) return null
  return saveSnapshot(snapshot, { persist: true })
}

export function hasSnapshotSaveConsent() {
  return Boolean(getLocalAccount()?.snapshotSaveConsent)
}

export function saveHelpRequest({ topic, message = '', user = getLocalAccount(), profile = getProfile() }) {
  const requests = readStorage(STORAGE_KEYS.helpRequests, [])
  const name = profile?.fullName || user?.name || 'Usuario Katalyst'
  const email = user?.email || 'sin-correo@katalyst.local'
  const request = {
    id: `help-${Date.now()}`,
    userId: user?.id || 'local-guest',
    name,
    email,
    topic: topic || 'Orientacion general',
    message,
    createdAt: new Date().toISOString(),
    status: 'nuevo',
  }
  writeStorage(STORAGE_KEYS.helpRequests, [request, ...requests])
  return request
}

export function clearLocalData() {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key))
  guestCheckupDraft = {}
  guestLastSnapshot = null
  guestSnapshotHistory = []
}
