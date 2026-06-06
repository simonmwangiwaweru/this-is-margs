-- Run in Supabase SQL Editor

-- ── PRODUCTS ─────────────────────────────────────────────────────────
create table if not exists products (
  id             serial primary key,
  name           text not null,
  description    text not null,
  price          integer not null,
  original_price integer,
  category       text not null,
  image_url      text not null,
  badge          text,
  rating         numeric(2,1) not null default 5.0,
  reviews        integer not null default 0,
  benefits       text[] default '{}',
  active         boolean not null default true,
  featured       boolean not null default false,
  created_at     timestamptz not null default now()
);

alter table products enable row level security;
create policy "public can read active products" on products
  for select using (active = true);

-- ── SITE CONTENT ──────────────────────────────────────────────────────
create table if not exists site_content (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

alter table site_content enable row level security;
create policy "public can read content" on site_content
  for select using (true);

-- ── SEED: default content ─────────────────────────────────────────────
insert into site_content (key, value) values
  ('about_hero_title',  'WE BELIEVE WELLNESS SHOULD BE NATURAL'),
  ('about_story',       'THIS IS MARGS was born in Nairobi with one simple belief — every Kenyan deserves access to premium, natural health supplements without compromise. We partner with Grass International to bring you lab-certified, 100% natural products that actually work.'),
  ('about_mission',     'Our mission is to make premium wellness accessible to every Kenyan — from Nairobi to all 47 counties. No synthetic fillers, no proprietary blends. Just honest supplements you can trust with your body every day.'),
  ('about_founded',     '2020'),
  ('contact_address',   'Westlands, Nairobi, Kenya — Near Sarit Centre'),
  ('contact_phone',     '+254 736 041 184'),
  ('contact_email',     'hello@thisismargs.co.ke'),
  ('contact_hours',     'Mon–Sat 8am–7pm EAT')
on conflict (key) do nothing;

-- ── SEED: products ────────────────────────────────────────────────────
insert into products (name, description, price, original_price, category, image_url, badge, rating, reviews, benefits, active, featured) values
('Alkaline Cup', 'Premium stainless steel alkaline water cup. Boosts energy, detoxifies & alkalizes your water, and provides essential minerals for daily wellness.', 3500, null, 'Alkaline', 'https://picsum.photos/seed/alkaline-water-cup/400/400', 'Best Seller', 5.0, 186, ARRAY['Boosts Energy','Detoxifies & Alkalizes','Rich in Minerals'], true, true),
('Cordyceps Coffee', 'Nature''s energy every day. Made with Cordyceps Extract, Premium Coffee & Essential Nutrients. 300g. Boosts energy, enhances focus and supports immunity.', 3000, 4000, 'Coffee & Tea', 'https://picsum.photos/seed/cordyceps-coffee-box/400/400', 'Save KES 1,000', 5.0, 214, ARRAY['Boosts Energy','Enhances Focus','Supports Immunity'], true, true),
('Maca Coffee', 'Boost your workout performance naturally. Power up gym sessions with Maca Extract & Premium Coffee. 300g.', 3000, null, 'Coffee & Tea', 'https://picsum.photos/seed/maca-coffee-green/400/400', 'Top Rated', 5.0, 178, ARRAY['Enhances Energy & Stamina','Improves Mental Focus','Supports Overall Wellness'], true, true),
('Ginseng Coffee', 'Creamy, smooth & nutty instant coffee enriched with Ginseng Extract. Enhances mental focus and cognitive performance. 300g.', 3000, 3500, 'Coffee & Tea', 'https://picsum.photos/seed/ginseng-coffee-silver/400/400', 'Save KES 500', 4.0, 143, ARRAY['Enhances Mental Focus','Creamy & Smooth Taste','Natural Ingredients'], true, false),
('Kuding Tea', 'Premium Kuding herbal tea from Grass International. Detoxifies the body, lowers blood pressure and supports natural weight management. 99g.', 2200, null, 'Coffee & Tea', 'https://picsum.photos/seed/kuding-tea-leaves/400/400', null, 5.0, 159, ARRAY['Detoxifies the Body','Lowers Blood Pressure','Supports Weight Loss','Boosts Immune Function','Reduces Inflammation'], true, false),
('Omega-3 Fish Oil (60 Softgels)', 'Pure Fish Oil Natural Glycerin softgels. Supercharge your fitness & recovery. 60g softgels by Grass International.', 3000, null, 'Vitamins', 'https://picsum.photos/seed/omega3-softgels-bottle/400/400', 'Best Seller', 5.0, 241, ARRAY['Heart Health','Brain Function','Joint Support','Fitness Recovery'], true, true),
('Vitamin C Tablets 750mg (100 Tabs)', 'Corn Starch Free, stewed citrus extract 750mg. 100 tablets. Immune support, heart health, bone strength and memory boost.', 3500, null, 'Vitamins', 'https://picsum.photos/seed/vitamin-c-tablets-bottle/400/400', 'Premium', 5.0, 192, ARRAY['Immune Support','Heart Health','Bone Strength','Memory Boost'], true, false),
('Chinese Wolfberry (120g)', 'Purely from nature. Boosts immunity, vision & vitality. Supports healthy brain development and enhances eye health.', 2200, null, 'Vitamins', 'https://picsum.photos/seed/wolfberry-goji-jar/400/400', null, 5.0, 127, ARRAY['Healthy Brain Development','Enhances Eye Health','Boosts Immune System','Promotes Energy & Vitality'], true, false),
('Glucosamine & Chondroitin (60 Tabs)', 'Support bone & joint health. Repairs cartilage, strengthens joints and boosts bone density. 60g by Grass International.', 2800, null, 'Bone & Joint', 'https://picsum.photos/seed/glucosamine-joint-bottle/400/400', 'Top Rated', 5.0, 163, ARRAY['Repairs Cartilage','Strengthens Joints','Boosts Bone Density','Exercise Recovery'], true, true),
('Milk Mineral Salt Tablets (60 Tabs)', 'Strong bones. Strong life. Protects & rebuilds bone cartilage, best natural source of calcium. Prevents bone cracks & joint pain. 60g.', 2500, null, 'Bone & Joint', 'https://picsum.photos/seed/milk-mineral-tablets/400/400', null, 5.0, 138, ARRAY['Protects & Rebuilds Bone Cartilage','Best Natural Calcium Source','Prevents Bone Cracks & Joint Pain'], true, false),
('Probiotic Milk Tablets (60 Tabs)', 'Probiotic freeze-dried powder. 60g. Improves digestion, boosts immunity, supports gut health and helps nutrient absorption.', 2800, null, 'Gut Health', 'https://picsum.photos/seed/probiotic-milk-purple/400/400', 'New', 5.0, 94, ARRAY['Improves Digestion','Boosts Immunity','Supports Gut Health','Helps Nutrient Absorption'], true, true),
('Aloe Vera Toothpaste', 'Naturally fresh & healthy smile. Whitens teeth, soothes sensitivity and uses 100% natural ingredients. Dentist recommended. 20% OFF.', 1200, 1500, 'Skin & Beauty', 'https://picsum.photos/seed/aloe-vera-toothpaste/400/400', '20% OFF', 4.0, 211, ARRAY['Whitens Teeth','Soothes Sensitivity','100% Natural Ingredients','Dentist Recommended'], true, false),
('Aloe Vera Beauty Soap', 'Organic Aloe Vera Soap with Rosemary. Polysaccharide Rich. Bioactivity Skincare. Soothing, hydrating, moisturising & cleansing. 120g.', 1000, null, 'Skin & Beauty', 'https://picsum.photos/seed/aloe-vera-soap-box/400/400', null, 4.0, 176, ARRAY['Soothing','Hydrating','Moisturising','Cleansing'], true, false),
('Horse Oil Soap', 'Deeply hydrates and softens dry, rough skin. Rich in essential fatty acids that restore the skin barrier. Soothes irritation and supports healing for sensitive skin.', 1500, null, 'Skin & Beauty', 'https://picsum.photos/seed/horse-oil-soap-amber/400/400', null, 5.0, 89, ARRAY['Deeply Hydrates & Softens','Restores Skin Barrier','Soothes Irritation','For Sensitive Skin'], true, false),
('100% Virgin Coconut Oil', '100% Natural, Organic, Cold-Pressed, Virgin, Unrefined, Raw. Deeply nourishes hair, reduces breakage and restores strength & shine.', 2000, null, 'Skin & Beauty', 'https://picsum.photos/seed/coconut-oil-bottle/400/400', 'Pure & Natural', 5.0, 134, ARRAY['Deeply Nourishes Hair','Reduces Breakage','Restores Strength & Shine','100% Natural'], true, false)
on conflict do nothing;
