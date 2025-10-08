/**
 * Inventory API Endpoint
 * Returns all inventory items
 * GET /api/inventory
 */
import { fetchInventory } from '../../utils/inventoryProvider'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const inventory = await fetchInventory()

    res.status(200).json({
      success: true,
      data: inventory,
      count: inventory.length
    })
  } catch (error) {
    console.error('Error fetching inventory:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch inventory'
    })
  }
}
