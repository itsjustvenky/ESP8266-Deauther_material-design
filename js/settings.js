var nameListTable = document.getElementById('nameList');
var ssid = document.getElementById('ssid');
var ssidHidden = document.getElementById('ssidHidden');
var password = document.getElementById('password');
var apChannel = document.getElementById('apChannel');
var apScanHidden = document.getElementById('apScanHidden');
var scanTime = document.getElementById('scanTime');
var timeout = document.getElementById('timeout');
var deauthReason = document.getElementById('deauthReason');
var packetRate = document.getElementById('packetRate');
var saved = document.getElementById('saved');
var clientNames = document.getElementById('clientNames');
var ssidEnc = document.getElementById('ssidEnc');
var useLed = document.getElementById('useLed');
var channelHop = document.getElementById('channelHop');
var res;

function getData() {
  getResponse("settings.json", function(responseText) {
    res = JSON.parse(responseText);

    ssid.value = res.ssid;
    ssidHidden.checked = res.ssidHidden;
    password.value = res.password;
    apChannel.value = res.apChannel;
    apScanHidden.checked = res.apScanHidden;
    scanTime.value = res.clientScanTime;
    timeout.value = res.attackTimeout;
    deauthReason.value = res.deauthReason;
    packetRate.value = res.attackPacketRate;
    ssidEnc.checked = res.attackEncrypted;
    useLed.checked = res.useLed;
    channelHop.checked = res.channelHop;


    clientNames.innerHTML = "Client Names " + res.nameList.length + "/50";

    var tr = '<thead><tr><th class="mdl-data-table__cell--non-numeric">MAC</th><th>Vendor</th><th>Hostname</th></tr></thead>';

    for (var i = 0; i < res.nameList.length; i++) {

      tr += '<tr>';
      tr += '<td>' + res.nameList[i].m + '</td>';
      tr += '<td>' + res.nameList[i].v + '</td>';
      tr += '<td>' + res.nameList[i].n + '&nbsp;&nbsp;&nbsp;<img class="listButton" src="res/edit.png" onclick="changeName(' + i + ')"></td>';
      tr += '<td><img class="listButton" src="res/delete.png" onclick="deleteName(' + i + ')"></td>';

      tr += '</tr>';
    }

    nameListTable.innerHTML = tr;
  });
}

function changeName(id) {
  var newName = prompt("Edit name for" + res.nameList[id].m);
  if (newName != null) {
    getResponse("editNameList.json?id=" + id + "&name=" + newName, function(responseText) {
      if (responseText == "true") getData();
      else alert("Error");
    });
  }
}

function deleteName(id) {
  getResponse("deleteName.json?num=" + id, function(responseText) {
    if (responseText == "true") getData();
    else alert("Error");
  });
}

function saveSettings() {
  saved.innerHTML = "Saving settings...";
  var url = "settingsSave.json";
  url += "?ssid=" + ssid.value;
  url += "&ssidHidden=" + ssidHidden.checked;
  url += "&password=" + password.value;
  url += "&apChannel=" + apChannel.value;
  url += "&apScanHidden=" + apScanHidden.checked;
  url += "&scanTime=" + scanTime.value;
  url += "&timeout=" + timeout.value;
  url += "&deauthReason=" + deauthReason.value;
  url += "&packetRate=" + packetRate.value;
  url += "&ssidEnc=" + ssidEnc.checked;
  url += "&useLed=" + useLed.checked;
  url += "&channelHop=" + channelHop.checked;

  getResponse(url, function(responseText) {
    if (responseText == "true") {
      getData();
      saved.innerHTML = "Settings saved successfully!";
    }
    else {
      saved.innerHTML = "An error occurred";
      alert("There was an error saving the settings");
    }
  });
}

function resetSettings() {
  getResponse("settingsReset.json", function(responseText) {
    if (responseText == "true") {
      getData();
      saved.innerHTML = "Settings reset successfully!";
    }
    else {
      saved.innerHTML = "An error occurred";
      alert("There was an error resetting the settings");
    }
  });
}

function clearNameList() {
  getResponse("clearNameList.json", function(responseText) {
    if (responseText == "true") getData();
    else alert("Error");
  });
}

getData();