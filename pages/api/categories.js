/**
 * Categories API Endpoint
 * Returns all categories with item counts and sample images
 * GET /api/categories
 */
import { fetchInventory } from '../../utils/inventoryProvider'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const inventory = await fetchInventory()

    // Build categories with item counts
    const inventoryCategorized = inventory.reduce((acc, next) => {
      const categories = next.categories
      categories.forEach(c => {
        const index = acc.findIndex(item => item.name === c)
        if (index !== -1) {
          const item = acc[index]
          item.itemCount = item.itemCount + 1
          acc[index] = item
        } else {
          const item = {
            name: c,
            image: next.image,
            itemCount: 1
          }
          acc.push(item)
        }
      })
      return acc
    }, [])

    res.status(200).json({
      success: true,
      data: inventoryCategorized,
      count: inventoryCategorized.length
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories'
    })
  }
}
