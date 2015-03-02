var log = function(message) {
  console.log(message);
  outputDiv.innerHTML = message;
};

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        listButton.addEventListener('click', this.list, false);
        connectButton.addEventListener('click', this.connect, false);
        disconnectButton.addEventListener('click', this.disconnect, false);

        bytesAvailableButton.addEventListener('click', this.available, false);
        readDataButton.addEventListener('click', this.read, false);
        readUntilButton.addEventListener('click', this.readUntil, false);
        clearBufferButton.addEventListener('click', this.clear, false);

        subscribeButton.addEventListener('click', this.subscribe, false);
        unsubscribeButton.addEventListener('click', this.unsubscribe, false);
        subscribeRawDataButton.addEventListener('click', this.subscribeRawData, false);
        unsubscribeRawDataButton.addEventListener('click', this.unsubscribeRawData, false);

        writeButton.addEventListener('click', this.write, false);
        writeBytesButton.addEventListener('click', this.writeBytes, false);

        isEnabledButton.addEventListener('click', this.isEnabled, false);
        isConnectedButton.addEventListener('click', this.isConnected, false);

        settingsButton.addEventListener('click', this.showBluetoothSettings, false);
        enableButton.addEventListener('click', this.enable, false);

    },
    onDeviceReady: function() {
      log("Hello World");
    },
    list: function() {

      function success(peripherals) {
        log(JSON.stringify(peripherals));
        // populate mac address for first device
        connectText.value = peripherals[0].id;
      }

      function failure(reason) {
        reason = "";
        log(reason || "Listing peripherals failed");
      }

      bluetoothSerial.list(success, failure);
    },
    connect: function() {

      function success() {
        log("Connected");
      }

      function failure(reason) {
        log("Connection failed " + reason);
      }

      bluetoothSerial.connect(connectText.value, success, failure);
    },
    disconnect: function() {

      function success() {
        log("Disconnected");
      }

      function failure(reason) {
        log("Disconnect failed " + reason);
      }

      bluetoothSerial.disconnect(success, failure);
    },
    available: function() {

      function success(bytesAvailable) {
        log(bytesAvailable);
      }

      function failure(reason) {
        log("Available failed " + reason);
      }

      bluetoothSerial.available(success, failure);
    },
    read: function() {

      function success(data) {
        log(data);
      }

      function failure(reason) {
        log("Read failed " + reason);
      }

      bluetoothSerial.read(success, failure);
    },
    readUntil: function() {

      function success(data) {
        log(data);
      }

      function failure(reason) {
        log("Read until failed " + reason);
      }

      var delimiter = readUntilText.value;
      if (delimiter === "\\n") {
        delimiter = "\n";
      }

      bluetoothSerial.readUntil(delimiter, success, failure);

    },
    clear: function() {

      function success() {
        log("Cleared buffer");
      }

      function failure(reason) {
        log("Clear failed " + reason);
      }

      bluetoothSerial.clear(success, failure);
    },
    subscribe: function() {

      function success(data) {
        log(data);
      }

      function failure(reason) {
        log("Subscribe failed " + reason);
      }

      var delimiter = subscribeText.value;
      if (delimiter === "\\n") {
        delimiter = "\n";
      }

      bluetoothSerial.subscribe(delimiter, success, failure);
    },
    unsubscribe: function() {

      function success() {
        log("Unsubscribed");
      }

      function failure(reason) {
        log("Unsubscribe failed " + reason);
      }

      bluetoothSerial.unsubscribe(success, failure);

    },
    subscribeRawData: function() {

      function success(buffer) {
        log(JSON.stringify(new Uint8Array(buffer)));
        //log(buffer);
      }

      function failure(reason) {
        log("Subscribe Raw Data failed " + reason);
      }

      bluetoothSerial.subscribeRawData(success, failure);

    },
    unsubscribeRawData: function() {

      function success() {
        log("Unsubscribed Raw Data");
      }

      function failure(reason) {
        log("Unsubscribe Raw Data failed " + reason);
      }

      bluetoothSerial.unsubscribeRawData(success, failure);

    },
    write: function() {

      function success() {
        log("OK");
      }

      function failure(reason) {
        log("Write failed " + reason);
      }

      var message = writeText.value;

      bluetoothSerial.write(message, success, failure);

    },
    writeBytes: function() {

      function success() {
        log("OK");
      }

      function failure(reason) {
        log("Write failed " + reason);
      }

      var message = writeBytesText.value;
      // assume string is space delimited octets e.g FF 00 AA
      var parts = message.split(" ");
      var array = new Uint8Array(parts.length);
      for (var i = 0; i < parts.length; i++) {
        array[i] = parseInt(parts[i], 16);
      }

      bluetoothSerial.write(array, success, failure);

    },
    isEnabled: function() {
      bluetoothSerial.isEnabled(
        function() {
          log("Bluetooth is enabled");
        },
        function() {
          log("Bluetooth is *not* enabled");
        }
      );
    },
    isConnected: function() {
      bluetoothSerial.isConnected(
        function() {
          log("Bluetooth is connected");
        },
        function() {
          log("Bluetooth is *not* connected");
        }
      );
    },
    showBluetoothSettings: function() {
      bluetoothSerial.showBluetoothSettings(
        function() {
          log("Bluetooth settings should have appeared");
        },
        function() {
          log("Problem showing Bluetooth settings");
        }
      );
    },
    enable: function() {
      bluetoothSerial.enable(
        function() {
          log("Bluetooth is Enabled");
        },
        function(reason) {
          log(reason);
        }
      );
    }
};

app.initialize();
