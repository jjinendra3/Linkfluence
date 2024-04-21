pragma solidity ^0.8.0;

contract InfluencerContract {
    struct Work {
        address influencer;
        address company;
        uint paymentAmount;
        bool workCompleted;
        bool verified;
        bool paymentSet;
    }
    
    address public owner;
    mapping(address => address) public influencerCompanyMapping;
    mapping(address => Work) public workByInfluencer;
    uint public commissionPercentage;
    
    event PaymentSent(address indexed _to, uint _amount);
    event WorkCompleted(address indexed _influencer, address indexed _company);
    event WorkVerified(address indexed _influencer, address indexed _company);
    event PaymentAmountSet(address indexed _influencer, address indexed _company, uint _amount);
    
    constructor() {
        owner = msg.sender;
        commissionPercentage = 5; // commission
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }
    
    function setInfluencerCompanyMapping(address _influencer, address _company) external onlyOwner {
        influencerCompanyMapping[_influencer] = _company;
    }
    
    function completeWork() external {
        address influencer = msg.sender;
        address company = influencerCompanyMapping[influencer];
        require(company != address(0), "No company mapped for this influencer");
        
        Work storage work = workByInfluencer[influencer];
        require(work.influencer == address(0), "Work already exists for this influencer");
        
        work.influencer = influencer;
        work.company = company;
        work.paymentAmount = 0;
        work.workCompleted = true;
        
        emit WorkCompleted(influencer, company);
    }
    
    function verifyWork() external {
        address influencer = msg.sender;
        address company = influencerCompanyMapping[influencer];
        require(company != address(0), "No company mapped for this influencer");
        
        Work storage work = workByInfluencer[influencer];
        require(work.influencer != address(0), "No work exists for this influencer");
        require(work.company == company, "Influencer is not associated with this company");
        require(work.workCompleted, "Work must be completed before verification");
        require(!work.verified, "Work already verified");
        
        work.verified = true;
        emit WorkVerified(influencer, company);
    }
    
    function setPaymentAmount(uint _paymentAmount) external {
        address company = msg.sender;
        address influencer = influencerCompanyMapping[msg.sender];
        require(influencer != address(0), "No influencer mapped for this company");
        
        Work storage work = workByInfluencer[influencer];
        require(work.influencer != address(0), "No work exists for this influencer");
        require(work.company == company, "Company is not associated with this influencer");
        require(!work.paymentSet, "Payment amount already set");
        
        work.paymentAmount = _paymentAmount;
        work.paymentSet = true;
        
        emit PaymentAmountSet(influencer, company, _paymentAmount);
    }
    
    function withdraw() external {
        address influencer = msg.sender;
        Work storage work = workByInfluencer[influencer];
        require(work.influencer != address(0), "No work exists for this influencer");
        require(work.verified, "Work must be verified before withdrawal");
        require(!work.paymentSet, "Payment amount must be set before withdrawal");
        
        uint commission = (work.paymentAmount * commissionPercentage) / 100;
        uint paymentAfterCommission = work.paymentAmount - commission;
        
        payable(influencer).transfer(paymentAfterCommission);
        payable(owner).transfer(commission); //commission to contract owner
        emit PaymentSent(influencer, paymentAfterCommission);
        emit PaymentSent(owner, commission);
        
        work.paymentSet = true; // Prevent multiple withdrawals
    }
}
