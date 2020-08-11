"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeChart = void 0;
const enums_1 = require("../enums");
const chart = {
    [enums_1.Types.Normal]: {
        [enums_1.Types.Fighting]: 1.5,
        [enums_1.Types.Ghost]: 0.25
    },
    [enums_1.Types.Fire]: {
        [enums_1.Types.Steel]: 0.25,
        [enums_1.Types.Fire]: 0.25,
        [enums_1.Types.Grass]: 0.25,
        [enums_1.Types.Bug]: 0.25,
        [enums_1.Types.Fairy]: 0.25,
        [enums_1.Types.Ice]: 0.25,
        [enums_1.Types.Water]: 1.5,
        [enums_1.Types.Rock]: 1.5,
        [enums_1.Types.Ground]: 1.5
    },
    [enums_1.Types.Water]: {
        [enums_1.Types.Fire]: 0.25,
        [enums_1.Types.Water]: 0.25,
        [enums_1.Types.Ice]: 0.25,
        [enums_1.Types.Steel]: 0.25,
        [enums_1.Types.Electric]: 1.5,
        [enums_1.Types.Grass]: 1.5
    },
    [enums_1.Types.Electric]: {
        [enums_1.Types.Electric]: 0.25,
        [enums_1.Types.Steel]: 0.25,
        [enums_1.Types.Flying]: 0.25,
        [enums_1.Types.Ground]: 0.25
    },
    [enums_1.Types.Grass]: {
        [enums_1.Types.Grass]: 0.25,
        [enums_1.Types.Water]: 0.25,
        [enums_1.Types.Ground]: 0.25,
        [enums_1.Types.Electric]: 0.25,
        [enums_1.Types.Fire]: 1.5,
        [enums_1.Types.Poison]: 1.5,
        [enums_1.Types.Ice]: 1.5,
        [enums_1.Types.Bug]: 1.5,
        [enums_1.Types.Flying]: 1.5
    },
    [enums_1.Types.Ice]: {
        [enums_1.Types.Ice]: 0.25,
        [enums_1.Types.Fire]: 1.5,
        [enums_1.Types.Fighting]: 1.5,
        [enums_1.Types.Rock]: 1.5,
        [enums_1.Types.Steel]: 1.5,
    },
    [enums_1.Types.Fighting]: {
        [enums_1.Types.Bug]: 0.25,
        [enums_1.Types.Rock]: 0.25,
        [enums_1.Types.Dark]: 0.25,
        [enums_1.Types.Psychic]: 1.5,
        [enums_1.Types.Fairy]: 1.5,
        [enums_1.Types.Flying]: 1.5
    },
    [enums_1.Types.Poison]: {
        [enums_1.Types.Poison]: 0.25,
        [enums_1.Types.Grass]: 0.25,
        [enums_1.Types.Fighting]: 0.25,
        [enums_1.Types.Bug]: 0.25,
        [enums_1.Types.Psychic]: 1.5,
        [enums_1.Types.Ground]: 1.5
    },
    [enums_1.Types.Ground]: {
        [enums_1.Types.Rock]: 0.25,
        [enums_1.Types.Poison]: 0.25,
        [enums_1.Types.Electric]: 0.25,
        [enums_1.Types.Water]: 1.5,
        [enums_1.Types.Grass]: 1.5,
        [enums_1.Types.Ice]: 1.5
    },
    [enums_1.Types.Flying]: {
        [enums_1.Types.Fighting]: 0.25,
        [enums_1.Types.Grass]: 0.25,
        [enums_1.Types.Bug]: 0.25,
        [enums_1.Types.Ground]: 0.25,
        [enums_1.Types.Electric]: 1.5,
        [enums_1.Types.Ice]: 1.5,
        [enums_1.Types.Rock]: 1.5,
    },
    [enums_1.Types.Psychic]: {
        [enums_1.Types.Psychic]: 0.25,
        [enums_1.Types.Fighting]: 0.25,
        [enums_1.Types.Ghost]: 1.5,
        [enums_1.Types.Bug]: 1.5,
        [enums_1.Types.Dark]: 1.5
    },
    [enums_1.Types.Bug]: {
        [enums_1.Types.Fighting]: 0.25,
        [enums_1.Types.Grass]: 0.25,
        [enums_1.Types.Ground]: 0.25,
        [enums_1.Types.Fire]: 1.5,
        [enums_1.Types.Flying]: 1.5,
        [enums_1.Types.Rock]: 1.5,
    },
    [enums_1.Types.Rock]: {
        [enums_1.Types.Normal]: 0.25,
        [enums_1.Types.Fire]: 0.25,
        [enums_1.Types.Poison]: 0.25,
        [enums_1.Types.Fire]: 0.25,
        [enums_1.Types.Fighting]: 1.5,
        [enums_1.Types.Water]: 1.5,
        [enums_1.Types.Ground]: 1.5,
        [enums_1.Types.Grass]: 1.5,
        [enums_1.Types.Steel]: 1.5,
    },
    [enums_1.Types.Ghost]: {
        [enums_1.Types.Normal]: 0.25,
        [enums_1.Types.Fighting]: 0.25,
        [enums_1.Types.Bug]: 0.25,
        [enums_1.Types.Dark]: 1.5,
        [enums_1.Types.Ghost]: 1.5,
    },
    [enums_1.Types.Dragon]: {
        [enums_1.Types.Electric]: 0.25,
        [enums_1.Types.Grass]: 0.25,
        [enums_1.Types.Fire]: 0.25,
        [enums_1.Types.Water]: 0.25,
        [enums_1.Types.Dragon]: 1.5,
        [enums_1.Types.Ice]: 1.5,
        [enums_1.Types.Fairy]: 1.5
    },
    [enums_1.Types.Dark]: {
        [enums_1.Types.Dark]: 0.25,
        [enums_1.Types.Psychic]: 0.25,
        [enums_1.Types.Ghost]: 0.25,
        [enums_1.Types.Fairy]: 1.5,
        [enums_1.Types.Bug]: 1.5,
        [enums_1.Types.Fighting]: 1.5
    },
    [enums_1.Types.Steel]: {
        [enums_1.Types.Steel]: 0.25,
        [enums_1.Types.Rock]: 0.25,
        [enums_1.Types.Normal]: 0.25,
        [enums_1.Types.Grass]: 0.25,
        [enums_1.Types.Ice]: 0.25,
        [enums_1.Types.Fairy]: 0.25,
        [enums_1.Types.Psychic]: 0.25,
        [enums_1.Types.Flying]: 0.25,
        [enums_1.Types.Bug]: 0.25,
        [enums_1.Types.Fighting]: 1.5,
        [enums_1.Types.Ground]: 1.5,
        [enums_1.Types.Fire]: 1.5
    },
    [enums_1.Types.Fairy]: {
        [enums_1.Types.Fighting]: 0.25,
        [enums_1.Types.Bug]: 0.25,
        [enums_1.Types.Dark]: 0.25,
        [enums_1.Types.Dragon]: 0.25,
        [enums_1.Types.Poison]: 1.5,
        [enums_1.Types.Steel]: 1.5
    }
};
exports.typeChart = function (defense, attack) {
    if (!(defense in chart))
        return 1;
    if (!(attack in chart[defense]))
        return 1;
    return (chart[defense][attack] || 1);
};
//# sourceMappingURL=typechart.js.map