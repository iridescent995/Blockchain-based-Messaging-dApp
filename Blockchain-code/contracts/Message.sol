pragma solidity ^0.4.24;

contract Message {

	struct MessageBody {
		address addr;
		string time;
		string message;
		string messageStatus;
		
	}
	//store the messages
	mapping (uint => MessageBody) public messagebody;

	//to index the mapping
	uint public messageCount ;


	//function to receive a messagebody
	
	function sendMessage (address _addr, string _time, string _message, string _messagestatus) public{
		messageCount++;
		messagebody[messageCount]=MessageBody(_addr,_time,_message, _messagestatus);
	}
	
	
	


//end of cc
}
