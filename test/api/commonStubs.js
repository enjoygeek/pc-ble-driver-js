
'use strict';

const sinon = require('sinon');

const BLE_GAP_EVT_CONNECTED = 10;
const BLE_GAP_EVT_DISCONNECTED = 17;
const BLE_GATTC_EVT_PRIM_SRVC_DISC_RSP = 48;

module.exports.createBleDriver = function(callbackForReceivingBleDriverEventCallback) {
    let bleDriver =
    {
        get_adapters: sinon.stub(),
        gap_connect: sinon.stub(),
        gap_disconnect: sinon.stub(),
        gap_update_connection_parameters: sinon.stub(),
        get_version: sinon.stub(),
        gap_get_device_name: sinon.stub(),
        gap_get_address: sinon.stub(),
        gap_cancel_connect: sinon.stub(),
        gap_set_adv_data: sinon.stub(),
<<<<<<< 203d07ffa752198901abc0b6641e08fd7b85db51
        gap_start_advertisement: sinon.stub(),
        gap_stop_advertisement: sinon.stub(),
=======
        gap_start_advertising: sinon.stub(),
        gattc_primary_services_discover: sinon.stub(),
        gattc_characteristic_discover: sinon.stub(),
        gattc_descriptor_discover: sinon.stub(),
>>>>>>> Started testing of service discovery.
        open: (options, err) => {},
        BLE_GAP_EVT_CONNECTED,
        BLE_GAP_EVT_DISCONNECTED,
        BLE_GATTC_EVT_PRIM_SRVC_DISC_RSP,
    };

    // Enable users to trigger events
    sinon.stub(bleDriver, 'open', (port, options, callback) => {
        let bleDriverEventCallback = options.eventCallback;
        callback();
        if(callbackForReceivingBleDriverEventCallback) {
            callbackForReceivingBleDriverEventCallback(bleDriverEventCallback);
        }
    });

    bleDriver.get_adapters.yields(undefined, [{ serialNumber: 'test', comName: '6' }]);
    bleDriver.gap_get_address.yields('DE:AD:BE:EF:FF:FF', undefined);

    bleDriver.gap_connect.yields(undefined);
    bleDriver.gap_disconnect.yieldsAsync(undefined);
    bleDriver.gap_cancel_connect.yields(undefined);
    bleDriver.get_version.yields('0.0.9', undefined);
    bleDriver.gap_get_device_name.yieldsAsync('holy handgrenade', undefined);
    bleDriver.gap_get_address.yieldsAsync('Bridge of death', undefined);

    return bleDriver;
};

module.exports.createConnectEvent = function() {
    return {
        id: BLE_GAP_EVT_CONNECTED,
        conn_handle: 123,
        peer_addr: {address: 'FF:AA:DD'},
        role: 'BLE_GAP_ROLE_CENTRAL',
        conn_params: {
            min_conn_interval: 10,
            max_conn_interval: 100,
            slave_latency: 100,
            conn_sup_timeout: 455
        }
    };
};

module.exports.createConnectionParametersUpdateEvent = function() {
    return  {
        conn_handle: 123,
            conn_params: {
                min_conn_interval: 10,
                max_conn_interval: 100,
                slave_latency: 100,
                conn_sup_timeout: 455
            }
        };
};