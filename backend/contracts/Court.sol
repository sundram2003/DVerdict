// SPDX-License-Identifier: MIT
 pragma solidity ^0.6.0;
 pragma experimental ABIEncoderV2;

contract Court {
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyAuthorized(uint _caseId) {
        require(
            msg.sender == cases[_caseId].prosecutor || 
            msg.sender == cases[_caseId].defence, 
            "Only prosecutor or defense can upload files"
        );
        _;
    }
    
    struct Lawyer {
        string name;
        uint phone;
        string email;
        address addr;
        string pubkey;
        mapping(uint => string) encryptedKeys;
    }
    struct Judge {
        string name;
        uint phone;
        string email;
        address addr;
        string pubkey;
        mapping(uint => string) encryptedKeys;
    }
    
    struct Victim {
        string name;
        uint phone;
        string email;
        address addr;
        string pubkey;
        mapping(uint => string) encryptedKeys;
    }
    
    struct Culprit {
        string name;
        uint phone;
        string email;
        address addr;
        string pubkey;
        mapping(uint => string) encryptedKeys;
    }
    
    struct Case {
        address judge;
        address prosecutor;
        address defence;
        string victim_name;
        string culprit_name;
        string details;
        string[] evidenceFileHash; // Store IPFS hashes of evidence files
        string[] transcripts; // Store IPFS hashes of transcripts
    }
    
    // to store users and cases
    Lawyer[] public lawyers;
    Judge[] public judges;
    Victim[] public victims;
    Culprit[] public culprits;
    Case[] public cases;

    event victimRegistered(uint _victimId);
    event culpritRegistered(uint _culpritId);
    event lawyerRegistered(uint _lawyerId);
    event judgeRegistered(uint _judgeId);
    event Createdcase(uint _caseId);

     function registerVictim(string memory _name, uint _phone, string memory _email, address _addr, string memory _pubkey) public  {
        Victim memory v = Victim(_name, _phone, _email, _addr, _pubkey);
        victims.push(v);
        emit victimRegistered(victims.length-1);
    
    }
    function registerCulprit(string memory _name, uint _phone, string memory _email, address _addr, string memory _pubkey) public {
        Culprit memory c = Culprit(_name, _phone, _email, _addr, _pubkey);
        culprits.push(c);
        emit culpritRegistered(culprits.length-1);
    }
    function registerLawyer(string memory _name, uint _phone, string memory _email, address _addr, string memory _pubkey) public {
        Lawyer memory l = Lawyer(_name, _phone, _email, _addr, _pubkey);
        lawyers.push(l);
        emit lawyerRegistered(lawyers.length-1);
    }
    function registerJudge(string memory _name, uint _phone, string memory _email, address _addr, string memory _pubkey) public {
        Judge memory j = Judge(_name, _phone, _email, _addr, _pubkey);
        judges.push(j);
        emit judgeRegistered(judges.length-1);
    }
    
    
    event CaseCreated(uint indexed caseId);
    
    constructor() public{
        owner = msg.sender;
    }
    
    function newCase(address _judge, address _prosecutor, address _defence, string memory _victimName, string memory _culpritName, string memory _details) public onlyOwner {
        Case memory newCaseInstance = Case({
            judge: _judge,
            prosecutor: _prosecutor,
            defence: _defence,
            victim_name: _victimName,
            culprit_name: _culpritName,
            details: _details,
             evidenceFileHash: new string[](0),
             transcripts: new string[](0)
        });
        
        cases.push(newCaseInstance);
        emit CaseCreated(cases.length - 1);
    }
    function addEncryptedKey(bool _isLawyer,bool _isVictim, bool _isCulprit, uint _ljId, uint _caseId, string memory _key) public onlyOwner {
        if(_isLawyer) {
            lawyers[_ljId].encryptedKeys[_caseId] = _key;
        } 
        else if(_isVictim)
        {
            victims[_ljId].encryptedKeys[_caseId] = _key;
        }
        else if(_isCulprit)
        {
           culprits[_ljId].encryptedKeys[_caseId] = _key; 
        }
        else {
            judges[_ljId].encryptedKeys[_caseId] = _key;
        }
    }
    function getEncryptedKey(bool _isLawyer, bool _isVictim, bool _isCulprit,uint _ljId, uint _caseId) public view returns(string memory) {
        if(_isLawyer) {
            return lawyers[_ljId].encryptedKeys[_caseId];
        }
        else if(_isVictim)
        {
           return victims[_ljId].encryptedKeys[_caseId];
        }
        else if(_isCulprit)
        {
           return culprits[_ljId].encryptedKeys[_caseId]; 
        }
         else {
            return judges[_ljId].encryptedKeys[_caseId];
        }
    }

    // Function to upload evidence file hash to a case
    function uploadEvidence(uint _caseId, string memory _fileHash) public onlyAuthorized(_caseId) {
        cases[_caseId].evidenceFileHash.push(_fileHash);
    }
    
    // Function to upload transcript hash to a case
    function uploadTranscript(uint _caseId, string memory _transcriptHash) public onlyAuthorized(_caseId) {
        cases[_caseId].transcripts.push(_transcriptHash);
    }
    
    function getEvidenceFileHashes(uint _caseId) public view returns (string[] memory) {
        return cases[_caseId].evidenceFileHash;
    }

    function getTranscriptHashes(uint _caseId) public view returns (string[] memory) {
        return cases[_caseId].transcripts;
    }
}
