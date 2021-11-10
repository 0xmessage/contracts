import { Contract, Event } from '@ethersproject/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers, network } from "hardhat";



  let sender1: SignerWithAddress;
  let sender2: SignerWithAddress;
  let receiver1: SignerWithAddress;
  let receiver2: SignerWithAddress;
  let oxmessage: Contract;

  beforeEach(async function () {
    [sender1, sender2, receiver1, receiver2] = await ethers.getSigners();
    let oxmessageFactory = await ethers.getContractFactory("oxmessage");
    oxmessage = await oxmessageFactory.deploy();

    await oxmessage.deployed();    
  });

  describe("oxmessage", () => {
  it("Multiple senders: Should emit an event and return message", async () => {


    await expect( oxmessage.connect(sender1).send(  receiver1.address, "msg1" ),"Event of the msg1" )
          .to.emit(oxmessage,"MessagePosted")
          .withArgs(sender1.address, receiver1.address, 0);

    await expect( oxmessage.connect(sender2).send(  receiver1.address, "msg2" ),"Event of the msg2" )
          .to.emit(oxmessage,"MessagePosted")
          .withArgs(sender2.address, receiver1.address, 1);

    let msg1 = await oxmessage.receivedMessage(receiver1.address,0);
    expect(msg1.timestamp, "Timestamp").to.not.equal( 0 );
    expect(msg1.content).to.equal( "msg1" );
    expect(msg1.sender).to.equal( sender1.address );
    expect(msg1.receiver).to.equal( receiver1.address );

    let msg2 = await oxmessage.receivedMessage(receiver1.address,1);
    expect(msg2.timestamp, "Timestamp").to.not.equal( 0 );
    expect(msg2.content).to.equal( "msg2" );
    expect(msg2.sender).to.equal( sender2.address );
    expect(msg2.receiver).to.equal( receiver1.address );

    let count = await oxmessage.receivedCount(receiver1.address);
    expect(count).to.equal( 2 );

    count = await oxmessage.receivedCount(receiver2.address);
    expect(count).to.equal( 0 );

    count = await oxmessage.sentCount(sender1.address);
    expect(count).to.equal( 1 );

    count = await oxmessage.sentCount(sender2.address);
    expect(count).to.equal( 1 );

  });

  it("Multiple receivers: Should emit an event and return message", async () => {
    
    await expect( oxmessage.connect(sender1).send(  receiver1.address, "msg1" ),"Event of the msg1" )
          .to.emit(oxmessage,"MessagePosted")
          .withArgs(sender1.address, receiver1.address, 0);

    await expect( oxmessage.connect(sender1).send(  receiver2.address, "msg2" ),"Event of the msg2" )
          .to.emit(oxmessage,"MessagePosted")
          .withArgs(sender1.address, receiver2.address, 0);
    
    let msg1 = await oxmessage.receivedMessage(receiver1.address,0);
    expect(msg1.timestamp, "Timestamp").to.not.equal( 0 );
    expect(msg1.content).to.equal( "msg1" );
    expect(msg1.sender).to.equal( sender1.address );
    expect(msg1.receiver).to.equal( receiver1.address );

    let msg2 = await oxmessage.receivedMessage(receiver2.address,0);
    expect(msg2.timestamp, "Timestamp").to.not.equal( 0 );
    expect(msg2.content).to.equal( "msg2" );
    expect(msg2.sender).to.equal( sender1.address );
    expect(msg2.receiver).to.equal( receiver2.address );

    let count = await oxmessage.receivedCount(receiver1.address);
    expect(count).to.equal( 1 );

    count = await oxmessage.receivedCount(receiver2.address);
    expect(count).to.equal( 1 );

    count = await oxmessage.sentCount(sender1.address);
    expect(count).to.equal( 2 );

    count = await oxmessage.sentCount(sender2.address);
    expect(count).to.equal( 0 );


  });  
});
