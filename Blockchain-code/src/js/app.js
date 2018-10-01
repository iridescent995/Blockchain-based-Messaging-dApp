App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Message.json", function(message) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Message = TruffleContract(message);
      // Connect provider to interact with contract
      App.contracts.Message.setProvider(App.web3Provider);

      //App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  // listenForEvents: function() {
  //   App.contracts.Message.deployed().then(function(instance) {
  //     // Restart Chrome if you are unable to receive this event
  //     // This is a known issue with Metamask
  //     // https://github.com/MetaMask/metamask-extension/issues/2393
  //     instance.votedEvent({}, {
  //       fromBlock: 'latest',
  //       toBlock: 'latest'
  //     }).watch(function(error, event) {
  //       console.log("event triggered", event)
  //       // Reload when a new vote is recorded
  //       App.render();
  //     });
  //   });
  // },

  render: function() {
    var messageInstance;
    var loader = $("#loader");
    var content = $("#content");
    var myaccount;

    //hide content if account not detected
    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        myaccount = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    loader.hide();
    content.show();

    // Load contract data
    App.contracts.Message.deployed().then(function(instance) {
      messageInstance = instance;
      return messageInstance.messageCount();
    }).then(function(messageCount) {
      var messageResults = $("#msghistory");
      messageResults.empty();

      // var candidatesSelect = $('#candidatesSelect');
      // candidatesSelect.empty();

      for (var i = 1; i <= messageCount; i++) {
        messageInstance.messagebody(i).then(function(msg) {
          var addr = msg[0];
          var time = msg[1];
          var message = msg[2];
          var status = msg[3];
          var textRight= "panel panel-default  text-right";

          if (myaccount == addr){
             textRight = "panel panel-default"
          }

          // Render candidate Result
          var msgTemplate = "<div class=\"" + textRight + "\" id=\"div2\" style=\"margin-bottom: 2px;\"> <div class=\"panel-body\" style=\"padding: 5px; font-size: 1.2em;\" id=\"message\">" + 
              "<p id=\"userid\" style=\"font-size: 0.7em;\"><b> "+ addr + " : </b>" +
               
            "<span class=\"label label-success\" id=\"status\">"+
              "<span class=\"glyphicon glyphicon-ok\"></span> " + status + "</span> &nbsp; &nbsp;" + 
            "<span class=\"label label-primary\" id=\"time\">"+ 
              "<span class=\"glyphicon glyphicon-time\"></span> &nbsp;"+ time +"</span> &nbsp;</p>"
          + message + "&nbsp;  &nbsp;"+ "</div>"+
        "</div></div>"
          
          //end of template
          messageResults.append(msgTemplate);
        });
      }
    }).catch(function(error) {
      console.warn(error);
    });
  },

  
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
