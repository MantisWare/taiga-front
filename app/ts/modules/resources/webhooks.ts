/*
 * Copyright (C) 2014-2017 Taiga Agile LLC <taiga@taiga.io>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * File: webhooks.coffee
 */

import * as angular from "angular"

let resourceProvider = function($repo, $urls, $http) {
    let service:any = {};

    service.list = function(projectId) {
        let params = {project: projectId};
        return $repo.queryMany("webhooks", params);
    };

    service.test = function(webhookId) {
        let url = $urls.resolve("webhooks-test", webhookId);
        return $http.post(url);
    };

    return instance => instance.webhooks = service;
};


let module = angular.module("taigaResources");
module.factory("$tgWebhooksResourcesProvider", ["$tgRepo", "$tgUrls", "$tgHttp", resourceProvider]);