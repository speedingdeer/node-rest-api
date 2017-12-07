import db from '../db';

(async () => {

  // add keywards
  await db.VendorsOffer.sync()
  await db.VendorsOffer.destroy({ where: {} });
  var pastries = await db.VendorsOffer.create({ name: 'Pastries' });
  var sandwiches = await db.VendorsOffer.create({ name: 'Sandwiches and nibbles' });
  var sharing = await db.VendorsOffer.create({ name: 'Sharing Lunch Platters' });
  var farm = await db.VendorsOffer.create({ name: 'Farm to Table' });
  var lunch_Boxes = await db.VendorsOffer.create({ name: 'Hearty Lunch Boxes' });
  var vip = await db.VendorsOffer.create({ name: 'VIP Board Room' });

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
    teaser_picture: 'gails.jpg'
  });
  var farmstand = await db.Vendor.create({
    name:           'Farmstand',
    description:    'Ethically-sound Farmstand creates seasonal, wholesome options, free ' +
                    'from gluten, dairy and unnecessary added sugar. Inspired by the roadside ' +
                    'stalls of Midwest America, the food from Farmstand is all delicious and ' +
                    'sustainably sourced.',
    recommended:    'Harissa Chicken with Rainbow Slaw with Sesame Dressing and Broccoli ' +
                    'with Tahini and Sesame Seeds',
    teaser_picture: 'farmstand.jpg'
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
    teaser_picture: 'peardrop.jpg'
  });

  // create vendors best offers
  await db.VendorsBestOffer.sync()
  await db.VendorsBestOffer.destroy({ where: {} });
  await db.VendorsBestOffer.bulkCreate([{
    vendor_id: gails.id,
    vendors_offer_id: pastries.id
  }, {
    vendor_id: gails.id,
    vendors_offer_id: sandwiches.id
  }, {
    vendor_id: gails.id,
    vendors_offer_id: sharing.id
  }]);

})();