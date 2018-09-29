pragma solidity ^0.4.24;

contract Message {

	struct MessageBody {
		address addr;
		string time;
		string message;
		string messageStatus;
		
	}
	//store the messages
	mapping (uint => MessageBody) messagebody;

	//to index the mapping
	uint messageCount;


	//function to receive a messagebody
	
	function sendMessage (address _addr, string _time, string _message, string _messagestatus) {
		messageCount++;
		messagebody[messageCount]=MessageBody(_addr,_time,_message, _messagestatus);
	}
	
	
	


//end of cc
}
