"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var hero_service_1 = require("./hero.service");
var ApiComponent = (function () {
    function ApiComponent(router, contentService) {
        this.router = router;
        this.contentService = contentService;
    }
    ApiComponent.prototype.getHeroes = function () {
        var _this = this;
        this.contentService.getHeroes().then(function (heroes) { return _this.heroes = heroes; });
    };
    ApiComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    ApiComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    ApiComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedHero.id]);
    };
    return ApiComponent;
}());
ApiComponent = __decorate([
    core_1.Component({
        selector: 'my-heroes',
        templateUrl: './heroes.component.html',
        styleUrls: ['./heroes.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        hero_service_1.ContentService])
], ApiComponent);
exports.ApiComponent = ApiComponent;
//# sourceMappingURL=api.component.js.map