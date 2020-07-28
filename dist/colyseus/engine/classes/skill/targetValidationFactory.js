"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.targetSetter = void 0;
const enums_1 = require("../../enums");
exports.targetSetter = function (skill, targetMode, characters, playerId, self) {
    let choices = {};
    choices.choice = [];
    choices.auto = [];
    switch (targetMode) {
        case enums_1.targetType.OneEnemy: {
            characters.forEach((char, index) => {
                if (!char.belongsTo(playerId) && !char.isKnockedOut()) {
                    const isInvulnerable = char.isInvulnerable(skill.getTypes());
                    if (!isInvulnerable)
                        choices.choice.push(index);
                }
            });
            return choices;
        }
        case enums_1.targetType.OneEnemyAndSelf: {
            characters.forEach((char, index) => {
                if (!char.belongsTo(playerId) && !char.isKnockedOut()) {
                    const isInvulnerable = char.isInvulnerable(skill.getTypes());
                    if (!isInvulnerable)
                        choices.choice.push(index);
                }
            });
            choices.auto.push(self);
            return choices;
        }
        case enums_1.targetType.AllEnemies: {
            characters.forEach((char, index) => {
                if (!char.belongsTo(playerId) && !char.isKnockedOut()) {
                    const isInvulnerable = char.isInvulnerable(skill.getTypes());
                    if (!isInvulnerable)
                        choices.choice.push(index);
                }
            });
            return choices;
        }
        case enums_1.targetType.Self: {
            const isInvulnerable = characters[self].isInvulnerable(skill.getTypes());
            if (!isInvulnerable && !characters[self].isKnockedOut())
                choices.choice.push(self);
            return choices;
        }
    }
};
//# sourceMappingURL=targetValidationFactory.js.map