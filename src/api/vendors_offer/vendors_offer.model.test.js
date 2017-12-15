import db from './../../db';
import { expect } from 'chai';

let vendor, offer;

beforeAll(async () => {
  await db.sequelize.sync();
  vendor = await db.Vendor.create({ name: 'Test Vendor' })
  offer = await db.Offer.create({ name: 'Test offer' })
});


describe('VendorsOffer.model', () => {
  it('should save correectly defined VedorsOffer', async () => {
    var vendorsOffer = await db.VendorsOffer.create({ 
      VendorId: vendor.id,
      OfferId: offer.id
    });
    var savedOffer = await vendorsOffer.getOffer();
    var savedVendor = await vendorsOffer.getVendor();
    expect(savedOffer).to.not.be.null;
    expect(savedVendor).to.not.be.null;

  });
  it('should not allow to save VedorsOffer without a vendor', async () => {
    try {
      await db.VendorsOffer.create({  OfferId: offer.id });
    } catch (err) { return; }
    throw new Error('Should have thrown an error')
  });
  it('should not allow to save VedorsOffer without an offer', async () => {
    try {
      await db.VendorsOffer.create({  VendorId: vendor.id });
    } catch (err) { return; }
    throw new Error('Should have thrown an error')
  });
  it('should not allow to save save VedorsOffer twice', async () => {
    try {
      await db.VendorsOffer.create({  VendorId: vendor.id, OfferId: offer.id });
      await db.VendorsOffer.create({  VendorId: vendor.id, OfferId: offer.id });
    } catch (err) { return; }
    throw new Error('Should have thrown an error')
  });
});

afterEach(async () => {
  await db.VendorsOffer.destroy({ where: {} });
})

afterAll(async () => {
  await vendor.destroy();
  await offer.destroy();
})
