export default class SkillEffect {
    constructor(x, y, skill) {
        this.x = x;
        this.y = y;
        this.skill = skill;

        this.frame = 0;
        this.timer = 0;
        this.finished = false;
    }

    update(dt) {
        this.timer += dt;
        if (this.timer >= 150) {
            this.timer = 0;
            this.frame++;

            if (this.frame >= this.skill.spriteSkillList.length) {
                this.finished = true;
            }
        }
    }

    getSprite() {
        return this.skill.spriteSkillList[this.frame];
    }
}
