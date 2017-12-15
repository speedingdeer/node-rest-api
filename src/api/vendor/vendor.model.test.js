import db from './../../db';
import { expect } from 'chai';

beforeAll(async () => {
  await db.sequelize.sync();
});


describe('Vendor.model', () => {
  it('should save correctly defined vendor', async () => {
    var vendor = await db.Vendor.create({ name: 'test vendor' })
    expect(vendor.name).to.be.equal('test vendor')
  });
  it('should not allow to save vendor without its name', async () => {
    // There is anlternative to do it using chai as promised
    // import chai, { expect } from 'chai';
    // import chaiAsPromised from 'chai-as-promised'
    // chai.use(chaiAsPromised);
    // expect(db.Vendor.create()).to.eventually.throw();
    // Unfortunately it leaves an ugly readout which I can't fix easilt
    try {
      await await db.Vendor.create()
    } catch (err) { return; }
    throw new Error('Should have thrown an error')
    
  });
  it('should not allow to save vendor with blank name', async () => {
    try {
      await await db.Vendor.create({ name: '' })
    } catch (err) { return; }
    throw new Error('Should have thrown an error')
    
  });
});

afterAll(async () => {
  await db.Vendor.destroy({ where: {} });
});