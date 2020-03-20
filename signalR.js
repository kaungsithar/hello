$.connection.hub.url = "https://smmbmwapi.azurewebsites.net/signalr";
//$.connection.hub.url = "http://localhost:2000/signalr";
// let user = JSON.parse(atob(localStorage.token));
var hub = $.connection.chatHub;
const signalR = {
  start: function (reconnecting, reconnected) {
    return new Promise(function (resolve, reject) {
      // let user = JSON.parse(atob(localStorage.token));
      // $.connection.hub.qs = {
      //   // userId: localStorage.agentId,
      //   // channelID: localStorage.channelId,
      //   agentID: user.id,
      //   agentName: user.username
      // };

      // $.connection.hub.disconnected(function() {
      //     setTimeout(function() {
      //         $.connection.hub.start();
      //     }, 10000); // Restart connection after  seconds.
      // });

      $.connection.hub.start()
        .done(function () {
          //alert('connected')
          let connectionId = $.connection.hub.id;
          resolve(hub);
        })
        .fail(function () {
          reject();
        });
      $.connection.hub.disconnected(function () {
        alert('disconnected')
        location.reload(true);
      });
      $.connection.hub.reconnecting(reconnecting);
      $.connection.hub.reconnected(reconnected);
      // });

    });
  },
  registerClient: function () {
    hub.client.reloadPage = () => {
      location.reload();
    };
    hub.client.newCustomerMessage = msg => {
      vm.$store.commit("addMessage", msg);
    };
    hub.client.pushNewCustomer = customer => {
      vm.$store.commit("pushNewCustomer", customer);
    };
    hub.client.reloadPage = () => {
      location.reload();
    };
    hub.client.newCustomer = customer => {
     // console.log(customer);
      vm.$store.commit("addNewCustomer", customer);
    };
    hub.client.updateCustomer = customer => {
      vm.$store.commit("updateCustomer", customer);
    };
    hub.client.pulse = function(){
      pulse();
    };
  },
  subscribeToSources: function (sourcesFilter) {
    hub.server.subscribeToSources(sourcesFilter);
  },
  updateConnection: function (customerId) {
    hub.server.updateOpenedChat(customerId);
  },
  // newConnection: function (channelIDs) {
  //   hub.server.newConnection(channelIDs);
  // }
   newConnection: function (channelIDs) {
    hub.server.newConnection(channelIDs);
  }
};
// export default signalR;
