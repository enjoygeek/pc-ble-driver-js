/* Copyright (c) 2016, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *   1. Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form, except as embedded into a Nordic
 *   Semiconductor ASA integrated circuit in a product or a software update for
 *   such product, must reproduce the above copyright notice, this list of
 *   conditions and the following disclaimer in the documentation and/or other
 *   materials provided with the distribution.
 *
 *   3. Neither the name of Nordic Semiconductor ASA nor the names of its
 *   contributors may be used to endorse or promote products derived from this
 *   software without specific prior written permission.
 *
 *   4. This software, with or without modification, must only be used with a
 *   Nordic Semiconductor ASA integrated circuit.
 *
 *   5. Any software provided in binary form under this license must not be
 *   reverse engineered, decompiled, modified and/or disassembled.
 *
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
 * OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

/**
 * Class that provides state management for an `Adapter`.
 */
class AdapterState {
    /**
     * Create an object to store `Adapter's` state.
     *
     * @constructor
     * @param {string} instanceId The unique Id of this adapter.
     * @param {string} port The port this adapter uses. For example it can be 'COM1', '/dev/ttyUSB0' or similar.
     * @param {Number} serialNumber The serial number of the hardware device being controlled by this adapter.
     */
    constructor(instanceId, port, serialNumber) {
        this._instanceId = `${instanceId}.${port}`;
        this._port = port;
        this._serialNumber = serialNumber;

        this.baudRate = null;
        this.parity = null;
        this.flowControl = null;

        this.available = false;
        this.scanning = false;
        this.advertising = false;
        this.connecting = false;

        this._address = null;
        this._addressType = null;
        this.name = null;
        this.firmwareVersion = null;
    }

    /**
     * Get the instanceId of this adapter.
     * @returns {string} Unique Id of this adapter.
     */
    get instanceId() {
        return this._instanceId;
    }

    /**
     * Get the port this adapter uses.
     * @returns {string} The port this adapter uses. For example it can be 'COM1', '/dev/ttyUSB0' or similar.
     */
    get port() {
        return this._port;
    }

    /**
     * Get the serial number of the hardware device this adapter controls.
     * @returns {Number} The serial number of the hardware device being controlled by this adapter.
     */
    get serialNumber() {
        return this._serialNumber;
    }

    get powered() {
        // TODO: ?
    }

    /**
     * Get the Bluetooth address.
     * @returns {null|string} The Bluetooth address of the Bluetooth device this adapter controls.
     */
    get address() {
        return this._address;
    }

    /**
     * Set the Bluetooth address.
     * @param {string} address The new Bluetooth address of the Bluetooth device this adapter controls.
     */
    set address(address) {
        if (typeof address === 'string') {
            this._address = address;
            this._addressType = 'BLE_GAP_ADDR_TYPE_RANDOM_STATIC';
        } else {
            this._address = address.address;
            this._addressType = address.type;
        }
    }

    /**
     * Get the BLE address type. 'BLE_GAP_ADDR_TYPE_RANDOM_STATIC' or `BLE_GAP_ADDR_TYPE_PUBLIC`.
     * @returns {null|string} BLE address type of the device adapter controls.
     */
    get addressType() {
        return this._addressType;
    }
}

module.exports = AdapterState;
