"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skills = void 0;
class Skills {
    constructor(data) {
        this.skillList = data;
    }
    validateSkills(energyPool) {
        let totalPool = energyPool.reduce((ca, cv) => ca + cv);
        for (const skill of this.skillList) {
            console.log(skill.name);
            skill.disabled = false;
            let totalCost = skill.cost.reduce((ca, cv) => ca + cv);
            if (totalCost > totalPool) {
                console.log("Disabled because exceeds pool");
                skill.disabled = true;
                continue;
            }
            for (let i = 0; i < 4; i++) {
                console.log(skill.cost[i], energyPool[i]);
                if (skill.cost[i] > energyPool[i]) {
                    skill.disabled = true;
                    break;
                }
            }
        }
    }
}
exports.Skills = Skills;
//# sourceMappingURL=skills.js.map