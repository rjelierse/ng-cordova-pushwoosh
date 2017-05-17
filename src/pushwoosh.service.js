const listeners = [];

/**
 * @ngdoc service
 * @name $cordovaPushwoosh
 * @module $cordovaPushwoosh
 *
 * @requires $log
 * @requires $q
 * @requires $timeout
 */
export default class Pushwoosh {
  constructor(
    $window,
    $document,
    $log,
    $q,
    $timeout,
    $cordovaPushwooshAppId,
    $cordovaPushwooshProjectId,
  ) {
    'ngInject';

    this.$log = $log;
    this.$q = $q;
    this.$timeout = $timeout;

    this.plugin = $window.cordova.require('pushwoosh-cordova-plugin.PushNotification');
    this.plugin.onDeviceReady({
      appid: $cordovaPushwooshAppId,
      projectid: $cordovaPushwooshProjectId,
    });

    $document.on(
      'push-notification',
      event => listeners.forEach(listener => listener(event.notification)),
    );
  }

  /**
   * @ngdoc method
   * @name $cordovaPushwoosh#register
   * @module $cordovaPushwoosh
   *
   * @description
   * Register the device with Pushwoosh
   *
   * @returns {Promise<string|Error>}
   */
  register() {
    return this.$q((onSuccess, onError) => this.plugin.registerDevice(onSuccess, onError))
      .then(
        (status) => {
          this.$log.debug('$cordovaPushwoosh: device registration successful', status);

          return status.pushToken;
        },
        error => this.onError(error),
      );
  }

  /**
   * @ngdoc method
   * @name $cordovaPushwoosh#unregister
   * @module $cordovaPushwoosh
   *
   * @description
   * Cancel device registration with Pushwoosh
   *
   * @returns {Promise<void|Error>}
   */
  unregister() {
    return this.$q((onSuccess, onError) => this.plugin.unregisterDevice(onSuccess, onError))
      .catch(error => this.onError(error));
  }

  /**
   * @ngdoc method
   * @name $cordovaPushwoosh#setTags
   * @module $cordovaPushwoosh
   *
   * @param {Object=} tags
   * @returns {Promise<void|Error>}
   */
  setTags(tags = {}) {
    return this.$q((onSuccess, onError) => this.plugin.setTags(tags, onSuccess, onError))
      .catch(error => this.onError(error));
  }

  /**
   * @ngdoc method
   * @name $cordovaPushwoosh#onNotification
   * @module $cordovaPushwoosh
   *
   * @param {Function} listener
   * @returns {Pushwoosh}
   */
  onNotification(listener) {
    listeners.push(listener);

    return this;
  }

  onError(error) {
    this.$log.error('$cordovaPushwoosh: an error occurred', error);

    return this.$q.reject(error);
  }
}
