/**
 * Single Inventory Item API Endpoint
 * Returns a single product by ID
 * GET /api/inventory/[id]
 */
import { fetchInventory } from '../../../utils/inventoryProvider'
import { slugify } from '../../../utils/helpers'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'Product ID is required'
    })
  }

  try {
    const inventory = await fetchInventory()

    // Find product by ID or slugified name
    const product = inventory.find(
      item => item.id === id || slugify(item.name) === id
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      })
    }

    res.status(200).json({
      success: true,
      data: product
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product'
    })
  }
}
