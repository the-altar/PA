"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.targetSetter = void 0;
const enums_1 = require("../../enums");
exports.targetSetter = function (targetMode, characters, playerId, self) {
    let choices = [];
    switch (targetMode) {
        case enums_1.targetType.OneEnemy: {
            characters.forEach((char, index) => {
                if (!char.belongsTo(playerId))
                    choices.push(index);
            });
            return choices;
        }
        case enums_1.targetType.AllEnemies: {
            characters.forEach((char, index) => {
                if (!char.belongsTo(playerId))
                    choices.push(index);
            });
            return choices;
        }
        case enums_1.targetType.Self: {
            choices.push(self);
            return choices;
        }
    }
};
//# sourceMappingURL=targetValidationFactory.js.map