exports.checkDD = function checkDD(activeEffects, skill) {
    for (const key in activeEffects) {
        if (activeEffects[key].destructibleDefense !== undefined) {
            for (const i in activeEffects[key].destructibleDefense) {
                let dd = activeEffects[key].destructibleDefense[i]
                dd.value = dd.value - skill.value

                if (dd.value >= 0) {
                    return 0
                } else {
                    activeEffects[key].destructibleDefense.splice(i, 1)
                    return (-1) * (dd.value)
                }
            }
        }
    }
    return skill.value
}