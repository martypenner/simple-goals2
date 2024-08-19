import { TriplitClient } from '@triplit/client'
import { IndexedDbStorage } from '@triplit/db/storage/indexed-db'
import { MemoryBTreeStorage as MemoryStorage } from '@triplit/db/storage/memory-btree'
import { schema } from '#triplit/schema'

// The TriplitClient has 4 main options
// - storage: The storage engine you want to use. This can be
//   'memory' or 'indexeddb'.
// - schema: The schema you defined for your app, which
//   will be used to generate types for client methods
//   and handle local database operations
// - serverUrl: The URL of your Triplit server
// - token: The token you got from the Triplit dashboard
//
// Without the serverUrl or token, the client will operate in
// offline mode

const isBrowser = typeof document !== 'undefined'

export const triplit = new TriplitClient({
	schema,
	...(isBrowser
		? {
				storage: {
					outbox: new IndexedDbStorage('triplit-outbox'),
					cache: new MemoryStorage(),
				},
				serverUrl: import.meta.env.VITE_TRIPLIT_SERVER_URL,
				token: import.meta.env.VITE_TRIPLIT_TOKEN,
			}
		: {
				storage: 'memory',
				autoConnect: false,
			}),
})
