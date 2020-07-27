"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeChart = void 0;
const enums_1 = require("../enums");
const chart = {
    [enums_1.Types.Normal]: {
        [enums_1.Types.Fighting]: 2,
        [enums_1.Types.Ghost]: 0.5
    },
    [enums_1.Types.Fire]: {
        [enums_1.Types.Steel]: 0.5,
        [enums_1.Types.Fire]: 0.5,
        [enums_1.Types.Grass]: 0.5,
        [enums_1.Types.Bug]: 0.5,
        [enums_1.Types.Fairy]: 0.5,
        [enums_1.Types.Ice]: 0.5,
        [enums_1.Types.Water]: 2,
        [enums_1.Types.Rock]: 2,
        [enums_1.Types.Ground]: 2
    },
    [enums_1.Types.Water]: {
        [enums_1.Types.Fire]: 0.5,
        [enums_1.Types.Water]: 0.5,
        [enums_1.Types.Ice]: 0.5,
        [enums_1.Types.Steel]: 0.5,
        [enums_1.Types.Electric]: 2,
        [enums_1.Types.Grass]: 2
    },
    [enums_1.Types.Electric]: {
        [enums_1.Types.Electric]: 0.5,
        [enums_1.Types.Steel]: 0.5,
        [enums_1.Types.Flying]: 0.5,
        [enums_1.Types.Ground]: 0.5
    },
    [enums_1.Types.Grass]: {
        [enums_1.Types.Grass]: 0.5,
        [enums_1.Types.Water]: 0.5,
        [enums_1.Types.Ground]: 0.5,
        [enums_1.Types.Electric]: 0.5,
        [enums_1.Types.Fire]: 2,
        [enums_1.Types.Poison]: 2,
        [enums_1.Types.Ice]: 2,
        [enums_1.Types.Bug]: 2,
        [enums_1.Types.Flying]: 2
    },
    [enums_1.Types.Ice]: {
        [enums_1.Types.Ice]: 0.5,
        [enums_1.Types.Fire]: 2,
        [enums_1.Types.Fighting]: 2,
        [enums_1.Types.Rock]: 2,
        [enums_1.Types.Steel]: 2,
    },
    [enums_1.Types.Fighting]: {
        [enums_1.Types.Bug]: 0.5,
        [enums_1.Types.Rock]: 0.5,
        [enums_1.Types.Dark]: 0.5,
        [enums_1.Types.Psychic]: 2,
        [enums_1.Types.Fairy]: 2,
        [enums_1.Types.Flying]: 2
    },
    [enums_1.Types.Poison]: {
        [enums_1.Types.Poison]: 0.5,
        [enums_1.Types.Grass]: 0.5,
        [enums_1.Types.Fighting]: 0.5,
        [enums_1.Types.Bug]: 0.5,
        [enums_1.Types.Psychic]: 2,
        [enums_1.Types.Ground]: 2
    },
    [enums_1.Types.Ground]: {
        [enums_1.Types.Rock]: 0.5,
        [enums_1.Types.Poison]: 0.5,
        [enums_1.Types.Electric]: 0.5,
        [enums_1.Types.Water]: 2,
        [enums_1.Types.Grass]: 2,
        [enums_1.Types.Ice]: 2
    },
    [enums_1.Types.Flying]: {
        [enums_1.Types.Fighting]: 0.5,
        [enums_1.Types.Grass]: 0.5,
        [enums_1.Types.Bug]: 0.5,
        [enums_1.Types.Ground]: 0.5,
        [enums_1.Types.Electric]: 2,
        [enums_1.Types.Ice]: 2,
        [enums_1.Types.Rock]: 2,
    },
    [enums_1.Types.Psychic]: {
        [enums_1.Types.Psychic]: 0.5,
        [enums_1.Types.Fighting]: 0.5,
        [enums_1.Types.Ghost]: 2,
        [enums_1.Types.Bug]: 2,
        [enums_1.Types.Dark]: 2
    },
    [enums_1.Types.Bug]: {
        [enums_1.Types.Fighting]: 0.5,
        [enums_1.Types.Grass]: 0.5,
        [enums_1.Types.Ground]: 0.5,
        [enums_1.Types.Fire]: 2,
        [enums_1.Types.Flying]: 2,
        [enums_1.Types.Rock]: 2,
    },
    [enums_1.Types.Rock]: {
        [enums_1.Types.Normal]: 0.5,
        [enums_1.Types.Fire]: 0.5,
        [enums_1.Types.Poison]: 0.5,
        [enums_1.Types.Fire]: 0.5,
        [enums_1.Types.Fighting]: 2,
        [enums_1.Types.Water]: 2,
        [enums_1.Types.Ground]: 2,
        [enums_1.Types.Grass]: 2,
        [enums_1.Types.Steel]: 2,
    },
    [enums_1.Types.Ghost]: {
        [enums_1.Types.Normal]: 0.5,
        [enums_1.Types.Fighting]: 0.5,
        [enums_1.Types.Bug]: 0.5,
        [enums_1.Types.Dark]: 2,
        [enums_1.Types.Ghost]: 2,
    },
    [enums_1.Types.Dragon]: {
        [enums_1.Types.Electric]: 0.5,
        [enums_1.Types.Grass]: 0.5,
        [enums_1.Types.Fire]: 0.5,
        [enums_1.Types.Water]: 0.5,
        [enums_1.Types.Dragon]: 2,
        [enums_1.Types.Ice]: 2,
        [enums_1.Types.Fairy]: 2
    },
    [enums_1.Types.Dark]: {
        [enums_1.Types.Dark]: 0.5,
        [enums_1.Types.Psychic]: 0.5,
        [enums_1.Types.Ghost]: 0.5,
        [enums_1.Types.Fairy]: 2,
        [enums_1.Types.Bug]: 2,
        [enums_1.Types.Fighting]: 2
    },
    [enums_1.Types.Steel]: {
        [enums_1.Types.Steel]: 0.5,
        [enums_1.Types.Rock]: 0.5,
        [enums_1.Types.Normal]: 0.5,
        [enums_1.Types.Grass]: 0.5,
        [enums_1.Types.Ice]: 0.5,
        [enums_1.Types.Fairy]: 0.5,
        [enums_1.Types.Psychic]: 0.5,
        [enums_1.Types.Flying]: 0.5,
        [enums_1.Types.Bug]: 0.5,
        [enums_1.Types.Fighting]: 2,
        [enums_1.Types.Ground]: 2,
        [enums_1.Types.Fire]: 2
    },
    [enums_1.Types.Fairy]: {
        [enums_1.Types.Fighting]: 0.5,
        [enums_1.Types.Bug]: 0.5,
        [enums_1.Types.Dark]: 0.5,
        [enums_1.Types.Dragon]: 0.5,
        [enums_1.Types.Poison]: 2,
        [enums_1.Types.Steel]: 2
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