import { debugLog, debugError, logError } from './debug'
import { slugify } from './helpers'

/*
Inventory items should adhere to the following schema:
type Product {
  id: ID!
  categories: [String]!
  price: Float!
  name: String!
  image: String!
  description: String!
  currentInventory: Int!
  brand: String
  sku: ID
}
*/

// Import inventory data with error handling
let inventory = []
try {
  const inventoryData = require('./inventory')
  inventory = inventoryData.default || inventoryData
  debugLog('Inventory data loaded successfully', { count: inventory?.length || 0 })
} catch (error) {
  logError('Inventory Import', error, {
    message: 'Failed to import inventory.js - using empty array',
    file: './inventory.js'
  })
  inventory = []
}

async function fetchInventory() {
  try {
    debugLog('fetchInventory called')

    // Validate inventory data
    if (!Array.isArray(inventory)) {
      debugError('Inventory is not an array', { inventory })
      return []
    }

    if (inventory.length === 0) {
      debugError('Inventory array is empty')
      return []
    }

    // Ensure each item has a stable ID based on its name
    // This prevents hydration mismatches from runtime UUID generation
    const inventoryWithIds = inventory.map((item, index) => {
      try {
        if (!item) {
          debugError(`Inventory item at index ${index} is null/undefined`)
          return null
        }

        if (!item.name) {
          debugError(`Inventory item at index ${index} missing name field`, { item })
          return null
        }

        if (!item.id) {
          // If ID doesn't exist, use slugified name as stable ID
          return {
            ...item,
            id: slugify(item.name)
          }
        }
        return item
      } catch (err) {
        logError(`Processing inventory item ${index}`, err, { item })
        return null
      }
    }).filter(Boolean) // Remove any null items

    debugLog('Inventory processed successfully', { count: inventoryWithIds.length })
    return Promise.resolve(inventoryWithIds)
  } catch (error) {
    logError('fetchInventory', error, {
      inventoryType: typeof inventory,
      inventoryIsArray: Array.isArray(inventory),
      inventoryLength: inventory?.length
    })
    // Return empty array instead of throwing to prevent page crashes
    return Promise.resolve([])
  }
}

export {
  fetchInventory,
  inventory as staticInventory
}