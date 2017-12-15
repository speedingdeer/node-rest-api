import db from '../db';

export default async () => {

  // create users
  await db.User.sync();
  await db.User.destroy({ where: {} });
  await db.User.create({
    email: 'admin@example.com',
    password: 'admin',
    role: 'admin'
  });
  await db.User.create({
    email: 'user@example.com',
    password: 'user',
  });

  // add keywards
  await db.Offer.sync()
  await db.Offer.destroy({ where: {} });
  var pastries = await db.Offer.create({ name: 'Pastries' });
  var sandwiches = await db.Offer.create({ name: 'Sandwiches and nibbles' });
  var sharing = await db.Offer.create({ name: 'Sharing Lunch Platters' });
  var farm = await db.Offer.create({ name: 'Farm to Table' });
  var lunch_boxes = await db.Offer.create({ name: 'Hearty Lunch Boxes' });
  var vip = await db.Offer.create({ name: 'VIP Board Room' });

  // create vendors
  await db.Vendor.sync()
  await db.Vendor.destroy({ where: {} });
  var gails = await db.Vendor.create({
    name:           'Gail’s Bakery',
    description:    'The famous artisan bakery, Gail’s is a great choice for delicious, freshly ' +
                    'baked sweet and savoury goods. It is a customer favourite and is great ' +
                    'for a number of occasions, both individual and sharing.',
    recommended:    'Mixed sandwich box with 6 different varieties including our favourites ' +
                    'parmesan chicken & chilli aioli, cauliflower & spinach, and smoked ' +
                    'salmon & avocado yoghurt. Treat yourself to Gail’s brownie bites for ' +
                    'dessert- you won’t be disappointed!',
    cover_picture: 'cover_pictures/gails.jpg',
    logo:          'logos/gails.jpg'
  });
  var farmstand = await db.Vendor.create({
    name:           'Farmstand',
    description:    'Ethically-sound Farmstand creates seasonal, wholesome options, free ' +
                    'from gluten, dairy and unnecessary added sugar. Inspired by the roadside ' +
                    'stalls of Midwest America, the food from Farmstand is all delicious and ' +
                    'sustainably sourced.',
    recommended:    'Harissa Chicken with Rainbow Slaw with Sesame Dressing and Broccoli ' +
                    'with Tahini and Sesame Seeds',
    cover_picture: 'cover_pictures/farmstand.jpg',
    logo:          'logos/farmstand.jpg'
  });
  var peardrop = await db.Vendor.create({
    name:           'Peardrop',
    description:    'Beautifully presented, balanced food, Peardrop’s dishes are sophisticated ' +
                    'with surprising flavours. Ingredients are sourced sustainably and ethically ' +
                    'using organic produce wherever possible.',
    recommended:    'Some of our favourite canapes include: sweet potato discs with ' +
                    'homemade pesto and house blushed tomato, pork & fennel meatballs ' +
                    'with tahini yoghurt and pomegranate, & seared sesame tuna wontons' +
                    'with wasabi cream.',
    cover_picture: 'cover_pictures/peardrop.jpg',
    logo:          'logos/peardrop.jpg'
  });

  // create vendor offers
  await db.VendorsOffer.sync()
  await db.VendorsOffer.destroy({ where: {} });
  await db.VendorsOffer.bulkCreate([{
    // gails
    VendorId: gails.id,
    OfferId: pastries.id
  }, {
    VendorId: gails.id,
    OfferId: sandwiches.id
  }, {
    VendorId: gails.id,
    OfferId: sharing.id
  }, {
    // farmstand
    VendorId: farmstand.id,
    OfferId: sharing.id
  }, {
    VendorId: farmstand.id,
    OfferId: farm.id
  }, {
    VendorId: farmstand.id,
    OfferId: lunch_boxes.id
  }, {
    // peardrop
    VendorId: peardrop.id,
    OfferId: pastries.id
  }, {
    VendorId: peardrop.id,
    OfferId: sharing.id
  }, {
    VendorId: peardrop.id,
    OfferId: vip.id
  }]);

}