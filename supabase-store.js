/* Shared storefront product loader. Falls back to products.js if Supabase is unavailable. */
(function () {
  const supabaseReady = () =>
    window.supabase && window.supabase.createClient &&
    window.ENTE_SUPABASE_URL && window.ENTE_SUPABASE_PUBLISHABLE_KEY;

  let clientPromise;
  function getClient() {
    if (!supabaseReady()) return Promise.resolve(null);
    if (!clientPromise) {
      clientPromise = Promise.resolve(window.supabase.createClient(
        window.ENTE_SUPABASE_URL,
        window.ENTE_SUPABASE_PUBLISHABLE_KEY
      ));
    }
    return clientPromise;
  }

  async function loadProducts(category) {
    try {
      const client = await getClient();
      if (!client) return null;
      let query = client.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false });
      if (category) query = query.eq('category', category);
      const { data, error } = await query;
      if (error) throw error;
      return (data || []).map(row => ({
        id: row.id,
        name: row.name,
        description: row.description || '',
        price: Number(row.price || 0),
        salePrice: row.sale_price == null ? null : Number(row.sale_price),
        images: Array.isArray(row.images) ? row.images : [],
        sizes: Array.isArray(row.sizes) ? row.sizes : [],
        color: row.color_name || 'Standart',
        colorHex: row.color_hex || '#D8D8D8',
        category: row.category,
        stock: Number(row.stock || 0)
      })).filter(product => product.images.length > 0);
    } catch (error) {
      console.warn('ENTE: Supabase ürünleri yüklenemedi; yerel ürünler kullanılacak.', error);
      return null;
    }
  }

  window.ENTE_STORE = { loadProducts };
})();
