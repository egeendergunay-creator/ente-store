-- ENTE'nin mevcut products.js ürünlerini Supabase'e ilk kez aktarır.
-- Aynı ürün ID'leri zaten varsa tekrar eklemez.

INSERT INTO public.products (
  id, category, name, description, price, sale_price, images,
  sizes, color_name, color_hex, stock, is_active
)
VALUES
(
  'girl-sample-01',
  'girls',
  'RIPNDIP © X ENTE Logo Baskılı T-Shirt',
  '',
  890,
  NULL,
  ARRAY['images/girl-sample-01-front.jpg', 'images/girl-sample-01-back.jpg'],
  ARRAY['1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9','9-10','10-11','12-13','13-14'],
  'Sarı',
  '#E6C83E',
  0,
  TRUE
),
(
  'boy-sample-01',
  'boys',
  'PİTCHER BASKILI SPOR KAPŞONLU SWEAT TAKIM - Açık mavi',
  '',
  1399,
  NULL,
  ARRAY[
    'images/boy-sample-01-front.png',
    'images/boy-sample-01-back.png',
    'images/boy-sample-01-sweatshirt-front.jpg',
    'images/boy-sample-01-sweatshirt-back.jpg',
    'images/boy-sample-01-sweatpant-front.jpg',
    'images/boy-sample-01-sweatpant-back.jpg'
  ],
  ARRAY['1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9','9-10','10-11','12-13','13-14'],
  'Açık mavi',
  '#A9D5E8',
  0,
  TRUE
)
ON CONFLICT (id) DO NOTHING;
