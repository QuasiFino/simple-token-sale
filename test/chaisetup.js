"use strict";
var chai = require("chai");
const expect = chai.expect;

const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

var chaiASPromised = require("chai-as-promised");
chai.use(chaiASPromised);
module.exports = chai;