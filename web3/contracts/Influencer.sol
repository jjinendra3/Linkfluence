pragma solidity ^0.8.0;

contract InfluencerContract {
    address public influencer;
    address public company;
    address public constant owner = 0x29A4Cf9e26ae2e16e7bcf049255Df1FD09496B8a; // our address for commission :)
    uint public paymentAmount;
    bool public workCompleted;
    bool public verified;
    uint public commissionPercentage;
    
    event PaymentSent(address indexed _to, uint _amount);
    event WorkCompleted();
    event WorkVerified();
    
    constructor(address _influencer, address _company) {
        influencer = _influencer;
        company = _company;
        paymentAmount = msg.value; // money from company
        workCompleted = false;
        verified = false;
        commissionPercentage = 5; // 5% commission
    }
    
    modifier onlyInfluencer() {
        require(msg.sender == influencer, "Only influencer can call this function");
        _;
    }
    
    modifier onlyCompany() {
        require(msg.sender == company, "Only company can call this function");
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }
    
    function completeWork() external onlyInfluencer {
        workCompleted = true;
        emit WorkCompleted();
    }
    
    function verifyWork() external onlyCompany {
        require(workCompleted, "Work must be completed before verification");
        verified = true;
        emit WorkVerified();
    }
    
    function withdraw() external onlyInfluencer {
        require(workCompleted, "Work must be completed before withdrawal");
        require(verified, "Work must be verified by the company");
        
        uint commission = (paymentAmount * commissionPercentage) / 100;
        uint paymentAfterCommission = paymentAmount - commission;
        
        payable(influencer).transfer(paymentAfterCommission); // money to influencer
        payable(owner).transfer(commission); // Send commission to us
        emit PaymentSent(influencer, paymentAfterCommission);
        emit PaymentSent(owner, commission);
    }
}
