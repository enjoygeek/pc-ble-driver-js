'use strict';

var i = 1;

class Descriptor {
    constructor(characteristicInstanceId, uuid, value, properties) {
        if (!characteristicInstanceId) throw new Error('serviceInstanceId must be provided.');
        if (!uuid) throw new Error('uuid must be provided.');

        // if (!value) throw new Error('value must be provided.');

        this._instanceId = characteristicInstanceId + '.' + (i++).toString();
        this._characteristicInstanceId = characteristicInstanceId;
        this.uuid = uuid;

        if (this.uuid && !(this.uuid.length === 4 || this.uuid.length === 32)) {
            throw new Error('uuid must be 128-bit or 16-bit.');
        }

        this.handle = null;
        this.value = value;
        this.properties = properties;
    }

    get instanceId() {
        return this._instanceId;
    }

    get characteristicInstanceId() {
        return this._characteristicInstanceId;
    }
}

module.exports = Descriptor;
