import db from './../../db';
import { expect } from 'chai';

let user;

beforeEach(async () => {
  await db.sequelize.sync();
  user = await db.User.create({email: 'user@example.com', password: 'user'});
});


describe('User.model', () => {

  it('should always have a default role assigned when not specified', async () => {
    expect(user.role).to.be.equal('user')
  });

  it('should have the password hashed when created', async () => {
    expect(user.password).to.not.be.equal('user')
    expect(user.authenticate('user')).to.be.true
    expect(user.authenticate('wrong')).to.be.false
  });

  it('should have the password hashed when updated', async () => {
    user.password = 'newpassword';
    await user.save();
    expect(user.password).to.not.be.equal('newpassword')
    expect(user.authenticate('newpassword')).to.be.true
    expect(user.authenticate('wrong')).to.be.false
  });

  it('should not allow to create user without email', async () => {
    try {
      await await db.User.create({ password: 'user2' })
    } catch (err) { return; }
    throw new Error('Should have thrown an error')
  });
  it('should not allow to create user without password', async () => {
    try {
      await await db.User.create({ email: 'user2@example.com' })
    } catch (err) { return; }
    throw new Error('Should have thrown an error')
  });
  it('should not allow to create user with incorrect email', async () => {
    try {
      await await db.User.create({ email: 'user2', password: 'user2' })
    } catch (err) { return; }
    throw new Error('Should have thrown an error')
  });
  it('should not allow to create user with incorrect email', async () => {
    try {
      await await db.User.create( {email: 'user2@example.com', password: '' })
    } catch (err) { return; }
    throw new Error('Should have thrown an error')
  });
  it('should not allow to create user with same email twice', async () => {
    try {
      await await db.User.create({ email: 'user@example.com', password: 'user' })
    } catch (err) { return; }
    throw new Error('Should have thrown an error')
  });
});

afterEach(async () => {
  await db.User.destroy({ where: {} });
});