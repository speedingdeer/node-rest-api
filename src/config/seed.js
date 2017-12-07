import db from '../db';

(async () => {


  await db.Vendor.sync()
  await db.Vendor.destroy({ where: {} });
  await db.Vendor.bulkCreate([{
    name:           'Gail’s Bakery',
    description:    'The famous artisan bakery, Gail’s is a great choice for delicious, freshly \
                     baked sweet and savoury goods. It is a customer favourite and is great \
                     for a number of occasions, both individual and sharing.',
    recommended:    'Mixed sandwich box with 6 different varieties including our favourites \
                     parmesan chicken & chilli aioli, cauliflower & spinach, and smoked \
                     salmon & avocado yoghurt. Treat yourself to Gail’s brownie bites for \
                     dessert- you won’t be disappointed!',
    teaser_picture: 'gails.jpg'
  }, {
    name:            'Farmstand',
    description:     'Ethically-sound Farmstand creates seasonal, wholesome options, free \
                      from gluten, dairy and unnecessary added sugar. Inspired by the roadside \
                      stalls of Midwest America, the food from Farmstand is all delicious and \
                      sustainably sourced.',
    recommended:     'Harissa Chicken with Rainbow Slaw with Sesame Dressing and Broccoli \
                      with Tahini and Sesame Seeds',
    teaser_picture: 'farmstand.jpg'
  }, {
    name:           'Peardrop',
    description:    'Beautifully presented, balanced food, Peardrop’s dishes are sophisticated \
                     with surprising flavours. Ingredients are sourced sustainably and ethically, \
                     using organic produce wherever possible.',
    recommended:    'Some of our favourite canapes include: sweet potato discs with \
                     homemade pesto and house blushed tomato, pork & fennel meatballs \
                     with tahini yoghurt and pomegranate, & seared sesame tuna wontons \
                     with wasabi cream.',
    teaser_picture: 'peardrop.jpg'
  }]);

})();