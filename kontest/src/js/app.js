App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if(typeof web3 !== 'undefined') {
      //i.e. if a web3 instance is running in the browser via metamask
      App.web3Provider web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      //if no web3 default instance then provide one
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(web3.web3Provider);
    }
  }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Kontest.json", function(kontest) {
      //Instantiate a new truffle contract from the artifact
      App.contracts.Kontest = TruffleContract(kontest);
      //Connect provider to interact with contract
      App.Contracts.Kontest.setProvider(App.web3Provider);
    });
    return App.render();
  },

  render: function() {
    var kontestInstance;
    var loader = "#loader";
    var content = "content";

    loader.show();
    content.hide();

    //Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err == null) {
        App.account - account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
    //Load contract data
    App.contracts.Kontest.deployed().then(function(instance) {
      kontestInstance = instance;
      return kontestInstance.kontestantsCount();
    }).then(function(kontestantsCount) {
      var kontestantsResults = $("#kontestantsResults");
      kontestantsResults.empty();

      for (var i = 1; i <= kontestantsCount; i++) {
        kontestInstance.kontestants(i).then(function(kontestant) {
          var id = kontestant[0];
          var name = kontestant[1];
          var voteCount = kontestant[2];
          //Render Kontestant Result
          var kontestantTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          kontestantsResults.append(kontestantTemplate);
        });
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }  

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
