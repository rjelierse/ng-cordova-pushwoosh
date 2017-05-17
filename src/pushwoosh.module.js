import angular from 'angular';
import PushwooshService from './pushwoosh.service';

const PushwooshModule = angular.module('$cordovaPushwoosh', []);

export default PushwooshModule.name;

PushwooshModule.service('$cordovaPushwoosh', PushwooshService);
