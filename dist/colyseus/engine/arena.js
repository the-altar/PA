"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arena = void 0;
const classes_1 = require("./classes");
class Arena {
    constructor() {
        this.players = [];
        this.characters = [];
        this.turnCount = -1;
        this.skillQueue = [];
        this.tempQueue = [];
        this.hasUsedSKill = {};
    }
    addPlayer(player, team) {
        this.players.push(new classes_1.Player(player));
        for (let c of team) {
            this.characters.push(new classes_1.Character(c, player.id));
            const index = this.characters.length - 1;
            if (index < 3) {
                this.characters[index].setEnemies([3, 4, 5]);
                switch (index) {
                    case 0:
                        {
                            this.characters[index].setAllies([1, 2]);
                        }
                        break;
                    case 1:
                        {
                            this.characters[index].setAllies([0, 2]);
                        }
                        break;
                    case 2:
                        {
                            this.characters[index].setAllies([0, 1]);
                        }
                        break;
                }
            }
            else {
                this.characters[index].setEnemies([0, 1, 2]);
                switch (index) {
                    case 3:
                        {
                            this.characters[index].setAllies([4, 5]);
                        }
                        break;
                    case 4:
                        {
                            this.characters[index].setAllies([3, 5]);
                        }
                        break;
                    case 5:
                        {
                            this.characters[index].setAllies([3, 4]);
                        }
                        break;
                }
            }
        }
    }
    processTurn(energySpent) {
        if (!energySpent)
            return;
        const player = this.players[this.turnCount % 2];
        this.transferTempToSkillQueue();
        player.resetPayupCart();
        player.consumeEnergy(energySpent);
    }
    executeSkills() {
        for (let i = this.skillQueue.length - 1; i >= 0; i--) {
            const skill = this.skillQueue[i];
            const isDone = this.skillQueue[i].executeEffects(this);
            if (isDone) {
                this.skillQueue.splice(i, 1);
            }
        }
    }
    transferTempToSkillQueue() {
        for (const cordinates of this.tempQueue) {
            const char = this.characters[cordinates.caster];
            const skill = char.getSkillByIndex(cordinates.skill);
            char.setSkillCooldownByIndex(cordinates.skill);
            skill.setTargets(this.getCharactersByIndex(cordinates.targets));
            this.skillQueue.push(skill);
        }
        this.tempQueue = [];
    }
    getCharactersByIndex(indexes) {
        const chars = [];
        for (const index of indexes) {
            chars.push(this.characters[index]);
        }
        return chars;
    }
    startGame() {
        this.turnCount++;
        const player1 = this.players[this.turnCount % 2];
        const player2 = this.players[((this.turnCount % 2) + 1) % 2];
        player1.setTurn(true);
        player2.setTurn(false);
        this.hasUsedSKill = {};
        this.distributeEnergyAndCooldowns(player2);
        this.validadeTeamSkillsCompletely(player1);
        this.emptyTempQueue();
        this.validateSkillQueue();
        return this.getClientData();
    }
    emptyTempQueue() {
        if (this.tempQueue.length > 0) {
            while (this.tempQueue.length > 0) {
                const s = this.tempQueue.pop();
                this.removeSkillFromTempQueue(s);
            }
        }
    }
    removeSkillFromTempQueue(cordinates) {
        const char = this.characters[cordinates.caster];
        const id = char.getOwner();
        const s = char.getSkillByIndex(cordinates.skill);
        const { player, index } = this.findPlayerById(id);
        player.returnEnergy(s.getCost());
        player.removeFromPayupCart(s.getCost());
        this.hasUsedSKill[cordinates.caster] = false;
        this.validateTeamCosts(index);
        const r = this.tempQueue.findIndex(s => {
            return (s.caster === cordinates.caster && s.skill === cordinates.skill);
        });
        this.tempQueue.splice(r, 1);
        return {
            tempQueue: this.tempQueue,
            characters: this.characters,
            energyPool: player.getEnergyPool(),
            payupCart: player.getPayupCart(),
            playerIndex: index
        };
    }
    addSkillToTempQueue(cordinates) {
        const char = this.characters[cordinates.caster];
        if (char === undefined) {
            console.log("invalid request [arena.ts])");
            return;
        }
        const id = char.getOwner();
        const s = char.getSkillByIndex(cordinates.skill);
        const { player, index } = this.findPlayerById(id);
        player.consumeEnergy(s.getCost());
        player.addToPayupCart(s.getCost());
        char.disableSkills();
        this.hasUsedSKill[cordinates.caster] = true;
        this.validateTeamCosts(index);
        this.tempQueue.push({
            caster: cordinates.caster,
            skill: cordinates.skill,
            targets: s.getValidadedTargets(cordinates.target)
        });
        return {
            tempQueue: this.tempQueue,
            characters: this.characters,
            energyPool: player.getEnergyPool(),
            payupCart: player.getPayupCart(),
            playerIndex: index
        };
    }
    distributeEnergyAndCooldowns(player) {
        const playerId = player.getId();
        this.characters.forEach(c => {
            if (c.belongsTo(playerId) && !c.isKnockedOut()) {
                c.lowerCooldowns();
                const energyIndex = c.generateEnergy();
                player.increaseEnergyPool(energyIndex);
            }
        });
    }
    validadeTeamSkillsCompletely(player) {
        const playerId = player.getId();
        const pool = player.getEnergyPool();
        this.characters.forEach((c, i) => {
            if (c.belongsTo(playerId) && !c.isKnockedOut()) {
                c.clearBuffs();
                c.validadeSkillsCompletely(pool, this.characters, playerId, i);
            }
        });
    }
    validateTeamCosts(index) {
        const playerId = this.players[index].getId();
        const pool = this.players[index].getEnergyPool();
        this.characters.forEach((c, i) => {
            if (c.belongsTo(playerId) && !this.hasUsedSKill[i] && !c.isKnockedOut()) {
                c.validateSkillsCost(pool);
            }
        });
    }
    getClientData() {
        return {
            players: this.players,
            characters: this.characters,
            skillQueue: this.skillQueue
        };
    }
    findPlayerById(id) {
        for (let i = 0; i < 2; i++) {
            if (this.players[i].getId() === id) {
                return {
                    player: this.players[i],
                    index: i
                };
            }
        }
    }
    findCharacterById(id) {
        for (const char of this.characters) {
            if (char.getId() === id)
                return char;
        }
    }
    validateSkillQueue() {
        for (let i = this.skillQueue.length - 1; i >= 0; i--) {
            const s = this.skillQueue[i];
            if (!s.areTargetsValidated(this)) {
                this.skillQueue.splice(i, 1);
            }
        }
    }
}
exports.Arena = Arena;
//# sourceMappingURL=arena.js.map