# Copyright (C) 2014 marigan.net
#
# This file is part of elzoido-promises.
#
# elzoido-promises is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# elzoido-promises is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with elzoido-promises. If not, see <http://www.gnu.org/licenses/>.
#
# Authors: Michal Mocnak <michal@marigan.net>

angular.module('elzoido.promises').factory 'elzoidoPromises', ($rootScope, $q, $timeout, dialogs, elzoidoPromisesModule) ->
  # promises groups stack
  groups = {}
  # register promises into group
  registerPromise = (group, promise) ->
    # init group if not defined
    if _.isUndefined(groups[group])
      groups[group] = []
    # push new promise
    groups[group].push(promise)
    # check the end of promise
    promise.then ->
      _.remove(groups[group], promise)

  # check if the group is still in progress
  isGroupRunning = (group) ->
    if _.isUndefined(groups[group])
      false
    else
      groups[group].length > 0

  getPromise = (group) ->
    $q.all(groups[group])

  # show wait dialog until whole group is finished
  waitForGroup = (group, message) ->
    $timeout(->
      if isGroupRunning(group)
        # open waiting dialog
        wait = dialogs.wait('Please wait', message)
        # close when all promises done
        getPromise(group).then ->
          wait.close()
    , elzoidoPromisesModule.config.timeout)

  ###
  # public API
  ###
  register: (group, promises) ->
    if _.isArray(promises)
      _.forEach(promises, (promise) ->
        # register
        registerPromise(group, promise)
      )
    else
      registerPromise(group, promises)

  # check if the group is still in progress
  isRunning: (group) ->
    isGroupRunning(group)

  # show wait dialog until whole group is finished
  wait: (group, message) ->
    waitForGroup(group, message)

  # return promise for specific group
  promise: (group) ->
    getPromise(group)