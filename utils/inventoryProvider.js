import inventory from './inventory'
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

async function fetchInventory() {
  // Ensure each item has a stable ID based on its name
  // This prevents hydration mismatches from runtime UUID generation
  const inventoryWithIds = inventory.map((item) => {
    if (!item.id) {
      // If ID doesn't exist, use slugified name as stable ID
      return {
        ...item,
        id: slugify(item.name)
      }
    }
    return item
  })

  return Promise.resolve(inventoryWithIds)
}

export {
  fetchInventory, inventory as staticInventory
}