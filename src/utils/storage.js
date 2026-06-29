export const STORAGE_KEYS = {
  demoUser: 'katalyst_demo_user',
  profile: 'katalyst_user_profile',
  checkups: 'katalyst_checkup_entries',
  lastSnapshot: 'katalyst:lastSnapshot',
  snapshots: 'katalyst:snapshots',
  learning: 'katalyst_learning_progress',
  helpRequests: 'katalyst_help_requests',
  eventInterest: 'katalyst_event_interest',
}

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

export function getDemoUser() {
  return readStorage(STORAGE_KEYS.demoUser, null)
}

export function getProfile() {
  return readStorage(STORAGE_KEYS.profile, null)
}

export function getCheckups() {
  return readStorage(STORAGE_KEYS.checkups, [])
}

export function getLatestCheckup() {
  const entries = getCheckups()
  return entries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null
}

export function getLastSnapshot() {
  return readStorage(STORAGE_KEYS.lastSnapshot, null)
}

export function saveSnapshot(snapshot) {
  writeStorage(STORAGE_KEYS.lastSnapshot, snapshot)
  const snapshots = readStorage(STORAGE_KEYS.snapshots, [])
  const next = [snapshot, ...snapshots.filter((item) => item.createdAt !== snapshot.createdAt)].slice(0, 24)
  writeStorage(STORAGE_KEYS.snapshots, next)
  return snapshot
}

export function getSnapshotHistory() {
  return readStorage(STORAGE_KEYS.snapshots, [])
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
}

export function saveHelpRequest({ topic, message = '', user = getDemoUser(), profile = getProfile() }) {
  const requests = readStorage(STORAGE_KEYS.helpRequests, [])
  const name = profile?.fullName || user?.name || 'Usuario demo'
  const email = user?.email || 'demo@katalyst.mx'
  const request = {
    id: `help-${Date.now()}`,
    userId: user?.id || 'demo-user',
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

export function clearDemoData() {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key))
}
