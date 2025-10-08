/**
 * Category Inventory API Endpoint
 * Returns all inventory items for a specific category
 * GET /api/categories/[name]
 */
import inventoryForCategory from '../../../utils/inventoryForCategory'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name } = req.query

  if (!name) {
    return res.status(400).json({
      success: false,
      error: 'Category name is required'
    })
  }

  try {
    // Convert slug back to category name (e.g., "on-sale" -> "on sale")
    const categoryName = name.replace(/-/g, ' ')
    const inventory = await inventoryForCategory(categoryName)

    if (!inventory || inventory.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Category not found or has no items'
      })
    }

    res.status(200).json({
      success: true,
      data: inventory,
      count: inventory.length,
      category: categoryName
    })
  } catch (error) {
    console.error('Error fetching category inventory:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch category inventory'
    })
  }
}
